# Miz Component Development Guide for AI Agents

This portable guide defines a workflow for building and changing Miz components. Place it in the `miz/` directory of a project, or merge its contents into the project's root `AGENTS.md`. If the target project has a different structure, inspect its actual conventions and adapt this guide; never assume that example paths exist.

Use these instructions for Miz component work, including styles, Sass, React or Mizoon implementations, and exports. Follow the target project's documentation and conventions, as well as the user's explicit requirements, when they differ from this guide.

## Roles

### Producer

- Understands the request, inspects existing patterns, implements the work in stages, and fixes reported issues.
- Before making changes, checks similar files, directory structure, configuration, export paths, and available validation commands.
- When given reviewer feedback, makes the necessary corrections and reruns the relevant validation.

### Reviewer

- Reviews the final changes against the user's request, project conventions, and validation results.
- Does not edit the implementation. Reports issues to the Producer with the file path, line number, reason, and expected correction.
- Approves only when no significant unresolved issues remain and relevant validation has passed. If validation could not be run, states the limitation explicitly and does not give final approval.
- When the tools support a separate agent, assign the review to an independent agent. Otherwise, perform a distinct, critical review stage and do not claim that an independent reviewer was involved.

## Required Workflow

Follow these stages in order. Do not combine or skip the plain CSS, Sass, or Miz integration stages.

1. **Understand the request and inspect the project**
   - Identify the requested behavior, scope, expected states, and important edge cases.
   - Inspect the actual project structure: similar implementations, Sass files, configuration and tokens, barrel/export files, tests, and demos.
   - Identify the relevant layer, such as core Sass, a React theme, or Mizoon components. Do not assume every project has the same themes or paths.

2. **Draft plain CSS**
   - First express the solution as standard CSS, independently of Sass: selectors, states, sizes, responsive behavior, and other required behavior.
   - Do not use Sass variables, mixins, nesting, or directives at this stage.
   - Treat this CSS as an intermediate draft. Do not create a permanent `.css` file unless the user explicitly requests one or the project requires it.

3. **Convert the CSS to Sass**
   - Convert the CSS draft to Sass/SCSS while preserving selector meaning, specificity, and behavior.
   - Use Sass features only when they improve readability or maintainability. Avoid deep nesting, unnecessary abstractions, and behavioral rewrites.
   - Confirm compatibility with the Sass version and tooling used by the target project.

4. **Integrate with Miz**
   - Place the Sass from the previous stage in the correct location according to the existing Miz structure and conventions.
   - Learn import paths, tokens, mixins, utilities, and `@extend` usage from nearby components and project configuration. Do not guess names, paths, or APIs.
   - If the component must be registered in a barrel file, update only the barrel for the relevant theme or layer, following existing patterns.
   - If the change includes a React or Mizoon API or implementation, follow the conventions of that layer. In this repository, `themes/react/components/readme.md` documents component folder naming, exports, and dynamic behavior; first verify that the target project uses the same conventions.
   - Avoid unrelated changes to components, themes, and generated files.

5. **Validate**
   - Find the closest Sass, test, or lint command in the project's scripts and documentation, then run it. Do not guess commands that have not been verified to exist.
   - When visual output changes, check the relevant states and responsive behavior using the available tools.
   - Fix issues caused by the change before review. Modify generated output only when required by the project's actual workflow.

6. **Review and iterate**
   - After implementation and validation, have the Reviewer examine the final diff independently of the Producer's explanation.
   - If the Reviewer finds an issue, report it to the Producer. The Producer fixes it, repeats validation, and requests another review.
   - Repeat this cycle until the Reviewer approves. If a real blocker, unresolved ambiguity, or unavailable test remains, report it clearly to the user; never fabricate success or approval.
   - Report the work as complete only after reviewer approval, with a summary of changes and validation results.

## Reviewer Checklist

- Does the implementation fully meet the requested behavior without unintended changes?
- Was the plain CSS converted to Sass without changing selector meaning or behavior?
- Is the Sass in the correct layer and theme, with imports, tokens, exports, and naming consistent with the project?
- Are selectors appropriately scoped to avoid leaking styles into unrelated elements?
- Are relevant interactive states, sizes, responsive behavior, and text direction covered?
- Are relevant accessibility behaviors, such as focus, disabled, and ARIA states, preserved?
- Are changes within the requested scope, and was relevant validation run?

For each issue, report its exact location, evidence, impact, and expected correction. If there are no unresolved issues and the relevant validation passed, explicitly state **Approved**.
