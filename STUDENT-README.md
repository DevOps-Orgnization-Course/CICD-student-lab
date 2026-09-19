# Lab — Build the CI and CD pipelines

The `tasks-api` app and its tests are already written and pass locally. You'll build the two pipelines in `.github/workflows/`. **CI is 4 parts, CD is 4 parts — about 5–10 minutes each.** After each part: commit, push, open the **Actions** tab, and check the result before moving on.

First confirm the app works:
```bash
npm install
npm run test:unit
npm run test:api
npm run test:coverage
```

---
---

# CI — `.github/workflows/ci.yml`

## CI Part 1 — Trigger and set up the runner  (~7 min)
**Goal:** the workflow runs and prepares a machine.
**Do:** in `ci.yml` add:
- a `name`, and `on:` with **push to `main`** and **pull_request**
- one job `test` on `ubuntu-latest`
- steps: **checkout** (`actions/checkout@v4`) and **set up Node 20** (`actions/setup-node@v4`)
**Check:** push → Actions shows the run going green (it does nothing useful yet, but it runs).

## CI Part 2 — Install and run the tests  (~8 min)
**Goal:** the tests run in CI.
**Do:** add steps:
- `run: npm install`
- `run: npm run test:unit`
- `run: npm run test:api`
**Check:** the logs show dependencies installing and both test suites passing.

## CI Part 3 — Add the coverage gate  (~7 min)
**Goal:** fail the build if coverage is too low.
**Do:** add a step `run: npm run test:coverage` (thresholds are already in `package.json`).
**Check:** the coverage table prints and the step is green (we're above the thresholds).

## CI Part 4 — Save the report and prove it works  (~8 min)
**Goal:** keep the report, and feel why CI matters.
**Do:** add a step using `actions/upload-artifact@v4` with `name: coverage-report` and `path: coverage/`. Then **break a test** in `src/validate.js`, push (watch it go **red**), undo, push (**green**).
**Check:** the run page has a **coverage-report** artifact, and you saw red → green.

> ✅ CI done: every push/PR installs, runs unit + API tests, enforces coverage, saves the report.

---
---

# CD — `.github/workflows/cd.yml`  (do this after CI is green)

## CD Part 1 — Manual trigger with a version  (~7 min)
**Goal:** you can run it on demand and pass a version.
**Do:** set `on: workflow_dispatch:` with an input `version` (`required: true`, `default: "1.0.0"`). Add `permissions: contents: write`. Add a job `release` on `ubuntu-latest` with one step that echoes `${{ github.event.inputs.version }}`.
**Check:** Actions → CD → **Run workflow** → type a version → the log echoes it.

## CD Part 2 — Test before releasing  (~7 min)
**Goal:** never ship a broken build.
**Do:** add steps: checkout, set up Node 20, `npm install`, `npm test`.
**Check:** the run installs and runs the full test suite.

## CD Part 3 — Build the package  (~7 min)
**Goal:** produce the shippable zip.
**Do:** add a step:
```
mkdir -p dist
zip -r "dist/tasks-api-${{ github.event.inputs.version }}.zip" src package.json README.md
```
**Check:** the log shows the zip being created.

## CD Part 4 — Create the tag and Release  (~8 min)
**Goal:** publish a versioned release with the zip attached.
**Do:** add a step with `env: GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` that runs:
```
gh release create "v${{ github.event.inputs.version }}" \
  "dist/tasks-api-${{ github.event.inputs.version }}.zip" \
  --target "${{ github.sha }}" \
  --title "tasks-api v${{ github.event.inputs.version }}" \
  --notes "Released by CD."
```
**Check:** the repo's **Releases** shows `v1.0.0` with the zip; **Tags** shows the tag. Run again with `1.0.1` to show versioning.

---

## Checklist
- [ ] CI Part 1 — triggers + checkout + Node
- [ ] CI Part 2 — install + unit + API tests
- [ ] CI Part 3 — coverage gate
- [ ] CI Part 4 — artifact + saw red → green
- [ ] CD Part 1 — manual trigger + version input
- [ ] CD Part 2 — tests before release
- [ ] CD Part 3 — build the zip
- [ ] CD Part 4 — tag + Release published
