const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const MODULES_DIR = path.join(ROOT, "app/(modules)");
const PRISMA_ADD_PREFIX = "AddTo";
const TAB_SIZE = 4;


/*------- control prisma modules -------*/

const PRISMA_DIRS = [
    {
        kind: "modules",
        sourceDir: path.join(ROOT, "app/(modules)"),
        targetDir: path.join(ROOT, "prisma", "modules"),
    },
    {
        kind: "kernel",
        sourceDir: path.join(ROOT, "app/(kernel)"),
        targetDir: path.join(ROOT, "prisma", "kernel"),
    },
];

function findPrismaFiles(directory) {
    if (!fs.existsSync(directory)) {
        return [];
    }

    const files = [];

    for (const entry of fs.readdirSync(directory, {
        withFileTypes: true,
    })) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...findPrismaFiles(fullPath));
        } else if (
            entry.isFile() &&
            entry.name.endsWith(".prisma")
        ) {
            files.push(fullPath);
        }
    }

    return files;
}

function copyPrismaDirectory({ kind, sourceDir, targetDir }) {
    if (!fs.existsSync(sourceDir)) {
        console.error(`[Prisma:${kind}] Source directory not found:`, sourceDir);
        process.exitCode = 1;
        return;
    }

    const prismaFiles = findPrismaFiles(sourceDir);

    fs.mkdirSync(targetDir, { recursive: true });

    for (const entry of fs.readdirSync(targetDir, {
        withFileTypes: true,
    })) {
        fs.rmSync(path.join(targetDir, entry.name), {
            recursive: true,
            force: true,
            maxRetries: 5,
            retryDelay: 200,
        });
    }

    for (const sourcePath of prismaFiles) {
        const fileName = path.basename(sourcePath);
        const targetPath = path.join(targetDir, fileName);

        fs.copyFileSync(sourcePath, targetPath);

        console.log(`[Prisma:${kind}] Copied: ${fileName}`);
    }

    console.log(
        `\n[Prisma:${kind}] Finished: ${prismaFiles.length} file(s) copied.`
    );
}

function copyPrisma() {
    // Copy all kernel and module schemas.
    for (const prismaDir of PRISMA_DIRS) {
        copyPrismaDirectory(prismaDir);
    }

    // Merge AddTo<Model> extensions.
    mergePrismaExtensions();
}

/*------- Prisma model extensions -------*/

// Find all model blocks inside a Prisma schema file.
function findPrismaModels(lines, filePath) {
    const models = [];

    for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(
            /^\s*model\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{\s*(?:\/\/.*)?$/
        );

        if (!match) continue;

        const name = match[1];
        let end = -1;

        for (let j = i + 1; j < lines.length; j++) {
            if (/^\s*}\s*(?:\/\/.*)?$/.test(lines[j])) {
                end = j;
                break;
            }
        }

        if (end === -1) {
            throw new Error(
                `[Prisma] Model "${name}" has no closing brace in ${filePath}`
            );
        }

        models.push({
            name,
            start: i,
            end,
            body: lines.slice(i + 1, end),
        });

        i = end;
    }

    return models;
}


// Extract a Prisma field name from a line.
function getPrismaFieldName(line) {
    const trimmed = line.trim();

    if (
        !trimmed ||
        trimmed.startsWith("//") ||
        trimmed.startsWith("@@") ||
        trimmed.startsWith("@")
    ) {
        return null;
    }

    return trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s+/)?.[1] ?? null;
}


// Merge every model named AddTo<Model> into its original model.

function mergePrismaExtensions() {
    const schemaFiles = PRISMA_DIRS.flatMap(({ targetDir }) =>
        findPrismaFiles(targetDir)
    );

    const documents = schemaFiles.map((filePath) => {
        const content = fs.readFileSync(filePath, "utf8");

        return {
            filePath,
            newline: content.includes("\r\n") ? "\r\n" : "\n",
            lines: content.split(/\r?\n/),
            dirty: false,
            removals: [],
        };
    });

    const extensions = new Map();

    // Collect AddTo models.
    for (const document of documents) {
        const models = findPrismaModels(
            document.lines,
            document.filePath
        );

        for (const model of models) {
            if (!model.name.startsWith(PRISMA_ADD_PREFIX)) continue;

            const targetName = model.name.slice(PRISMA_ADD_PREFIX.length);

            if (!targetName) {
                throw new Error(
                    `[Prisma] Invalid extension model: ${model.name}`
                );
            }

            if (!extensions.has(targetName)) {
                extensions.set(targetName, []);
            }

            extensions.get(targetName).push({
                sourceFile: document.filePath,
                body: model.body,
            });

            document.removals.push({
                start: model.start,
                end: model.end,
            });
        }
    }

    // Validate all targets BEFORE modifying any document.
    for (const [targetName, modelExtensions] of extensions) {
        const matches = [];

        for (const document of documents) {
            const models = findPrismaModels(
                document.lines,
                document.filePath
            );

            for (const model of models) {
                if (
                    model.name === targetName &&
                    !model.name.startsWith(PRISMA_ADD_PREFIX)
                ) {
                    matches.push({
                        document,
                        model,
                    });
                }
            }
        }

        const sourceFiles = [
            ...new Set(
                modelExtensions.map((extension) =>
                    path.relative(ROOT, extension.sourceFile)
                ),
            ),
        ];

        if (matches.length === 0) {
            throw new Error(
                [
                    "",
                    "[Prisma Extension Error]",
                    `Extension model: ${PRISMA_ADD_PREFIX}${targetName}`,
                    `Target model: ${targetName}`,
                    "Reason: Target model does not exist.",
                    `Source file(s): ${sourceFiles.join(", ")}`,
                    `Fix: Create model "${targetName}" or correct the extension name.`,
                    "",
                ].join("\n")
            );
        }

        if (matches.length > 1) {
            throw new Error(
                `[Prisma Extension Error] Multiple models named "${targetName}" were found.`
            );
        }
    }

    // Remove AddTo models only after all targets have been validated.
    for (const document of documents) {
        if (!document.removals.length) continue;

        document.removals.sort((a, b) => b.start - a.start);

        for (const removal of document.removals) {
            document.lines.splice(
                removal.start,
                removal.end - removal.start + 1
            );
        }

        document.dirty = true;
    }

    // Merge extensions into original models.
    for (const [targetName, modelExtensions] of extensions) {
        const matches = [];

        for (const document of documents) {
            const models = findPrismaModels(
                document.lines,
                document.filePath
            );

            for (const model of models) {
                if (model.name === targetName) {
                    matches.push({ document, model });
                }
            }
        }

        const { document, model } = matches[0];
        const existingFields = new Set();

        for (const line of model.body) {
            const fieldName = getPrismaFieldName(line);

            if (fieldName) existingFields.add(fieldName);
        }

        const linesToInsert = [];

        for (const extension of modelExtensions) {
            const extensionLines = extension.body.join("\n").trim()
                .split(/\r?\n/);

            if (
                extensionLines.length === 1 &&
                extensionLines[0] === ""
            ) {
                continue;
            }

            for (const line of extensionLines) {
                const fieldName = getPrismaFieldName(line);

                if (!fieldName) continue;

                if (existingFields.has(fieldName)) {
                    throw new Error(
                        `[Prisma] Duplicate field "${fieldName}" in model "${targetName}" from ${extension.sourceFile}`
                    );
                }

                existingFields.add(fieldName);
            }

            if (linesToInsert.length) linesToInsert.push("");
            linesToInsert.push(...extensionLines);
        }

        if (!linesToInsert.length) continue;

        document.lines.splice(
            model.end,
            0,
            "",
            ...linesToInsert
        );

        document.dirty = true;

        console.log(
            `[Prisma] Merged ${modelExtensions.length} extension(s) into "${targetName}".`
        );
    }

    // Write generated schemas only after merging succeeds.
    for (const document of documents) {
        if (!document.dirty) continue;

        fs.writeFileSync(
            document.filePath,
            document.lines.join(document.newline),
            "utf8"
        );
    }

    console.log(
        `\n[Prisma] Extensions merged: ${extensions.size} model(s).`
    );
}


const { execFileSync } = require("node:child_process");

/*------- Prisma output format code -------*/

function formatPrismaSchemas() {
    console.log("\n[Prisma] Formatting schemas...");

    // Run Prisma format from the project root.
    execFileSync(
        "npx",
        ["prisma", "format"],
        {
            cwd: ROOT,
            stdio: "inherit",
            shell: process.platform === "win32",
        }
    );

    for (const { kind, targetDir } of PRISMA_DIRS) {
        const files = findPrismaFiles(targetDir);

        for (const filePath of files) {
            const content = fs.readFileSync(filePath, "utf8");

            const formatted = formatPrismaIndentation(content, TAB_SIZE);

            fs.writeFileSync(filePath, formatted, "utf8");

            console.log(
                `[Prisma:${kind}] Indentation set to ${TAB_SIZE} spaces:`,
                path.relative(ROOT, filePath)
            );
        }
    }

    console.log("\n[Prisma] Formatting completed.");
}

function formatPrismaIndentation(content, tabSize = 4) {
    const indent = " ".repeat(tabSize);
    let modelDepth = 0;

    return content
        .split(/\r?\n/)
        .map((line) => {
            const trimmed = line.trim();

            if (!trimmed) return "";

            // Closing brace: leave the model block.
            if (trimmed === "}") {
                modelDepth = Math.max(0, modelDepth - 1);
                return indent.repeat(modelDepth) + trimmed;
            }

            // Model and enum declarations are at root level.
            if (/^(model|enum|type|view)\s+\w+\s*\{/.test(trimmed)) {
                modelDepth = 1;
                return trimmed;
            }

            // Fields inside model or enum.
            if (modelDepth > 0) {
                return indent.repeat(modelDepth) + trimmed;
            }

            return trimmed;
        })
        .join("\n");
}

/*------- control assets modules -------*/

const ASSETS_TARGET_DIR = path.join(ROOT, "public", "modules");

function findAssetDirectories(directory) {
    if (!fs.existsSync(directory)) {
        return [];
    }

    const assets = [];

    for (const entry of fs.readdirSync(directory, {
        withFileTypes: true,
    })) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            if (entry.name === "assets") {
                assets.push(fullPath);
            } else {
                assets.push(...findAssetDirectories(fullPath));
            }
        }
    }

    return assets;
}

function copyDirectory(source, destination) {
    fs.cpSync(source, destination, {
        recursive: true,
        force: true,
    });
}

function copyAssets() {
    if (!fs.existsSync(MODULES_DIR)) {
        console.error("Modules directory not found:", MODULES_DIR);
        process.exitCode = 1;
        return;
    }

    const assetDirectories = findAssetDirectories(MODULES_DIR);

    fs.mkdirSync(ASSETS_TARGET_DIR, { recursive: true });

    for (const entry of fs.readdirSync(ASSETS_TARGET_DIR, {
        withFileTypes: true,
    })) {
        fs.rmSync(path.join(ASSETS_TARGET_DIR, entry.name), {
            recursive: true,
            force: true,
            maxRetries: 5,
            retryDelay: 200,
        });
    }

    for (const sourcePath of assetDirectories) {
        const relativePath = path.relative(MODULES_DIR, sourcePath);
        const moduleName = relativePath.split(path.sep)[0];
        const targetPath = path.join(ASSETS_TARGET_DIR, moduleName);

        copyDirectory(sourcePath, targetPath);

        console.log(`Copied: ${relativePath}`);
    }

    console.log(
        `\nFinished: ${assetDirectories.length} asset directory(s) copied.`
    );
}

function main() {
    try {
        copyAssets();
        copyPrisma();
        formatPrismaSchemas();
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}

main();