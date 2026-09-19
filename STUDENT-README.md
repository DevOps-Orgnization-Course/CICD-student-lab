# Lab — Build the CI and CD pipelines

The `tasks-api` app and all its tests are already written. **You will write the two pipelines** that make GitHub test and release it automatically. Work through Part A, then Part B.

Everything you type is in `.github/workflows/`. Edit the files in VS Code, commit, push, and watch the **Actions** tab.

---

## Part A — CI (Continuous Integration): `ci.yml`

**Goal:** every push and pull request automatically installs the app, runs the tests, and checks coverage.

### Steps to implement
1. **Triggers** — run on push to `main` and on every `pull_request`.
2. **A job** named `test` that runs on `ubuntu-latest`.
3. Steps in order:
   - Check out the code — `actions/checkout@v4`
   - Set up Node.js 20 — `actions/setup-node@v4` with `node-version: 20`
   - Install dependencies — `npm install`
   - Run unit tests — `npm run test:unit`
   - Run API tests — `npm run test:api`
   - Run coverage — `npm run test:coverage` (this fails if coverage drops below the thresholds in `package.json`)
   - Upload the `coverage/` folder — `actions/upload-artifact@v4`

### Done when
- Push a branch and open a PR.
- The **Actions** tab shows **CI / test** running and passing (green).
- The run has a downloadable **coverage-report** artifact.

### Hints
- `on:` takes `push:` (with `branches: [ main ]`) and `pull_request:`.
- A step that runs a command uses `run:`; a step that uses a prebuilt action uses `uses:`.
- Break a test in `src/validate.js`, push, and confirm CI turns **red** — then fix it.

---

## Part B — CD (Continuous Delivery): `cd.yml`

**Goal:** when *you* decide, a manual run packages the app and publishes a versioned GitHub Release.

### Steps to implement
1. **Trigger** — `workflow_dispatch` with an input `version` (default `1.0.0`).
2. **Permissions** — `contents: write` (needed to create a tag/Release).
3. A job `release` on `ubuntu-latest` that:
   - Checks out, sets up Node 20, installs deps, runs `npm test`.
   - Builds a zip of `src package.json README.md` into `dist/`.
   - Creates a tag `vX.Y.Z` and a GitHub Release with the zip attached.

### Hints
- Read the input as `${{ github.event.inputs.version }}`.
- The runner already has the `gh` CLI. With `GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` set on the step, you can run:
  ```
  gh release create "vVERSION" path/to/zip --title "..." --notes "..."
  ```
- `gh release create` will create the tag for you.

### Done when
- Actions tab -> **CD** -> **Run workflow** -> enter a version -> Run.
- A new **Release** (e.g. `v1.0.0`) appears with the zip attached, and a matching **tag** exists.

---

## Checklist
- [ ] CI runs on push and PR
- [ ] CI runs unit tests, API tests, and coverage
- [ ] CI uploads the coverage artifact
- [ ] I saw CI go red on a broken test, then green after fixing
- [ ] CD runs manually with a version input
- [ ] CD publishes a Release with a zip and a tag
