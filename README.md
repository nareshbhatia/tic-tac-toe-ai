# Tic-Tac-Toe using AI Assistants

This repository implements Tic-Tac-Toe using various AI assistants. The goal of
this experiment was twofold:

1. To generate the game with the minimum number of prompts, given that
   Tic-Tac-Toe is a well-known game.
2. To create a version of the game that is very challenging to beat, requiring a
   smart algorithm to compute the computer's next move.

Additional prompts were acceptable to achieve the second goal, but the AI would
receive lower marks if human intervention was necessary. The ideal outcome was
an AI-generated game that was both efficiently created and highly competitive.

Please follow the links below for details of each implementation:

1. [Tic-Tac-Toe using Code Llama](apps/tic-tac-toe-code-llama/)
2. [Tic-Tac-Toe using Claude](apps/tic-tac-toe-claude/)
3. [Tic-Tac-Toe using ChatGPT](apps/tic-tac-toe-chatgpt/)
4. [Tic-Tac-Toe using v0](apps/tic-tac-toe-v0/)
5. [Tic-Tac-Toe using Devin](apps/tic-tac-toe-devin/)
6. [Tic-Tac-Toe using Cursor](apps/tic-tac-toe-cursor/)

## Ranking

| Rank | Tool       | Prompts | Comments                                                           |
| :--: | ---------- | :-----: | ------------------------------------------------------------------ |
|  1   | Claude     |    2    | Iterate in Claude's artifact                                       |
|  2   | Devin      |    2    | Iterate in Devin's environment (slower than Claude)                |
|  3   | v0         |    8    | Iterate in v0's environment, took 4 prompts to get the logic right |
|  4   | ChatGPT    |    4    | Slow iterations, took 3 prompts to get the logic right             |
|  5   | Code Llama |    x    | Very buggy code, workflow is not smooth                            |
|      | Cursor     |    x    |                                                                    |

## Prerequisites for development

1. [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm) - allows using
   different versions of node via the command line

## Getting Started

```shell
nvm use        # use the required version of node
npm ci         # install dependencies
npm run build  # build all packages
npm run dev    # run apps
```

Open browser windows at the following URLs to see the respective apps:

1. http://localhost:3000/: Tic-Tac-Toe using Code Llama
2. http://localhost:3001/: Tic-Tac-Toe using Claude
3. http://localhost:3002/: Tic-Tac-Toe using ChatGPT
4. http://localhost:3003/: Tic-Tac-Toe using v0
5. http://localhost:3004/: Tic-Tac-Toe using Devin
6. http://localhost:3005/: Tic-Tac-Toe using Cursor

> Note: Do not run `npm install` or `npm ci` in any of the subdirectories. It
> will break the build. There should be only one `package-lock.json` file in the
> entire repo (at the root).

## All Commands

```
npm ci                   # install dependencies
npm run build            # builds all workspaces
npm run ci-validate      # builds, lints, formats, and tests all code (runs in CI pipeline, don't run locally)
npm run clean            # deletes all build artifacts
npm run commit           # displays commit helper prompt to ensure your commits use conventional commits
npm run dev              # run app
npm run fix              # lints, formats and attempts to fix any issues (requires `npm run build` has been ran)
npm run format           # formats all workspaces, useful for debugging format issues (generally `npm run fix` is preferred)
npm run lint             # runs the linter on all workspaces, useful for debugging lint issues (generally `npm run fix` is preferred)
npm run storybook        # runs storybook
npm run test             # runs full build, lint, format, and all tests - run before pushing to remote
```

## Common Workflows

### Creating New Components

Use [Code Shaper](https://www.code-shaper.dev/) to create new components. This
will give you a good starting point that is consistent with React best
practices.

Here's an example of creating a component called `EventList` using Code Shaper:

```sh
$ npx shaper
? Which plugin would you like to run? React (@code-shaper/react - generates React applications)
? Which generator would you like to run? component (generates a component)
? Component name? (e.g. TextField) EventList
? Which workspace should this go to? apps/tic-tac-toe-ai
? Parent directory within workspace? src/components/EventList

Creating EventList...
  EventList.stories.tsx
  EventList.test.tsx
  EventList.tsx
  index.ts

Done.
```

### Production build

To build all packages and apps for production, run the following command:

```shell
npm ci
npm run build
```

### Clean build

Removes all build artifacts and performs a clean build. Run these steps before
pushing to remote.

```shell
npm run clean
nvm use
npm ci
npm run build
npm run fix
npm test
```

For an "aggressive" clean build, add a step to remove the `package-lock.json`
file as shown below. This will build the lock file from scratch.

```shell
npm run clean
nvm use
rm package-lock.json
npm install
npm run build
npm run fix
npm test
```

### Running unit tests

The following command runs a full build, lint, format, and all tests. However,
it uses the Turborepo cache to skip steps that have no changes since the last
run. Hence it is very efficient. **Always run this command before pushing to
remote.**

```shell
npm test
```

### Running end-to-end tests using dev build

```shell
npm run dev # starts a local server hosting the react app

# run e2e tests non-interactively (run in a different shell)
npm run e2e

# run e2e tests in the Playwright user interface (run in a different shell)
npm run e2e:ui
```

### Linting, formatting and fixing coding issues

```shell
npm run fix
```
