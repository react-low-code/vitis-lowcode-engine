# AGENTS.md

## Cursor Cloud specific instructions

This repo (`vitis-lowcode-engine`) is a Lerna + Yarn-workspaces monorepo that builds a
low-code visual editor engine. It is the companion source for a book and ships only the
engine resource bundles (there is **no application host page / demo and no backend**).

### Toolchain (already provisioned in the VM)
- **Node 14** is required (`engines.node` = `>=14.18.0 <16`). Node `14.21.3` is installed via
  nvm and prepended to `PATH` in `~/.bashrc` (the VM also has a Node 22 at `/exec-daemon/node`
  that must NOT be used for this repo). `node -v` should report `v14.x`.
- Package manager is **Yarn 1** (classic), installed under the Node 14 nvm. There are no
  committed lockfiles (`yarn.lock`/`package-lock.json` are git-ignored and deleted by setup).

### Install / build / run
- Install deps: `yarn install --ignore-engines` (the `--ignore-engines` is required because a
  transitive dep, `node-releases`, declares `node>=18`). This is the startup update script.
- Build all packages (npm + UMD, in dependency order): `npm run build` (see `scripts/build.sh`).
- Run the dev server (the "ignitor"): `npm run start` → webpack-dev-server on **port 5555**.
  It serves the compiled engine resources at `/js/engine-core.js`, `/css/engine-core.css`,
  `/engine-core.html`, `/simulator-renderer.html`. Static files placed in
  `packages/ignitor/public/` are also served at `/`.
- There are **no lint or test scripts** in this repo.

### Non-obvious gotchas
- **webpack-dev-server is pinned to `3.11.3`** via root `package.json` `resolutions`. Without
  this pin, a fresh install resolves wds v4, but the (transitive) `@builder/user-config` default
  dev-server config uses v3-only options (`before`, `disableHostCheck`, `transportMode`, `quiet`,
  …), so `npm run start` crashes with a `ValidationError: options has an unknown property 'before'`.
  Keep this resolution. (If this change is not merged, re-add it before running the dev server.)
- The dev server restarts automatically when `packages/ignitor/build.json` changes (a chokidar
  watcher in `build-scripts`), so don't be surprised by a recompile after editing it.
- **The engine is a UMD library with no host page.** To actually view/run the editor you must
  create a host HTML that loads React/ReactDOM 17 UMD, the engine bundle, calls
  `VitisLowCodeEngine.material.load([...])` and `VitisLowCodeEngine.init(container, { pageSchema })`.
  Real components are published on npm and fetched from the component market (unpkg), e.g.
  `vitis-lowcode-row`, `vitis-lowcode-column`, `vitis-lowcode-input`.
- **Externals bug in the UMD bundles:** `build.umd.json` (and the published bundles) declare
  `externals: { react: "window.React" }`, which webpack compiles to a `self["window.React"]`
  global lookup instead of `window.React`. So a host page must set
  `window["window.React"] = React; window["window.ReactDOM"] = ReactDOM;` before loading the
  engine UMD. The **dev** bundle (`/js/engine-core.js`) additionally exposes the
  webpack-dev-server client as the `VitisLowCodeEngine` global (because the inline-client entry
  is the last entry under `output.library`); use the **built UMD** (`packages/engine/dist/js/engine-core.js`)
  in a host page instead.
- **Canvas live preview is currently broken** end-to-end: the design canvas iframe loads the
  *published* `vitis-lowcode-simulator-renderer` UMD from unpkg (hardcoded in
  `packages/engine/src/utils.ts` `getBaseAssets`), which has the same `window.React` externals
  bug, so React is `undefined` inside the iframe and rendering throws (`createContext of undefined`).
  Fixing it requires editing engine source, so the schema/component-market/setter panes work but
  the visual canvas does not without code changes.
