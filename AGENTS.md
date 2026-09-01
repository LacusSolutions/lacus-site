# Agent guidelines

1. Assume you are a senior frontend developer.
2. For Git commit messages, follow Conventional Commits specifications.
3. Always write code, comments, documentation, and commits in English.
4. For every textual content added to the project UI, add both the PT-BR and EN versions of the text.
5. Stylesheets should be written in SCSS.
6. For every new TSX component, create a directory for it with the following rules:
   1. The directory name should be PascalCase, the same name as the component.
   2. The TSX file should follow the same name as the directory, reflecting the component name.
   3. If the component has scoped styles, add a file named `{ComponentName}.module.scss` to store the styles.
   4. The unit test file should carry the component name followed by the extension `.spec.tsx`.
   5. If the component has hooks that only it uses, create a file named `{ComponentName}.hooks.ts`.
   6. If the component has a context that only it uses, create a file named `{ComponentName}.context.ts`.
   7. If the component has utility functions that only it uses, create a file named `{ComponentName}.utils.ts`.
   8. There should be an `index.ts` file in the directory to re-export the resources available outside this scope.
7. If a smaller component is required and it is only used in a single context, its source code should be allocated as a subdirectory of the parent component.
8. Always create unit tests to cover most of the component states and any other resources of the app (utils, contexts, etc.).

Example component directory:

```
Button/
  Button.tsx
  Button.module.scss
  Button.spec.tsx
  Button.hooks.ts
  Button.context.ts
  Button.utils.ts
  index.ts
```
