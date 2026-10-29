const fs = require("node:fs");
const path = require("node:path");

const ROOT = process.cwd();
const MODULES_DIR = path.join(ROOT, "app/(modules)");


/*------- control prisma modules -------*/
const PRISMA_TARGET_DIR = path.join(ROOT, "prisma", "modules");

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
		} else if (entry.isFile() && entry.name.endsWith(".prisma")) {
			files.push(fullPath);
		}
	}

	return files;
}

function copyPrismaModules() {
	if (!fs.existsSync(MODULES_DIR)) {
		console.error("Modules directory not found:", MODULES_DIR);
		process.exitCode = 1;
		return;
	}

	const prismaFiles = findPrismaFiles(MODULES_DIR);

	fs.mkdirSync(PRISMA_TARGET_DIR, { recursive: true });

	for (const entry of fs.readdirSync(PRISMA_TARGET_DIR, {
		withFileTypes: true,
	})) {
		const entryPath = path.join(PRISMA_TARGET_DIR, entry.name);

		fs.rmSync(entryPath, {
			recursive: true,
			force: true,
			maxRetries: 5,
			retryDelay: 200,
		});
	}

	for (const sourcePath of prismaFiles) {
		const fileName = path.basename(sourcePath);
		const targetPath = path.join(PRISMA_TARGET_DIR, fileName);

		fs.copyFileSync(sourcePath, targetPath);

		console.log(`Copied: ${fileName}`);
	}

	console.log(
		`\nFinished: ${prismaFiles.length} Prisma file(s) copied.`
	);
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

copyAssets();
copyPrismaModules();