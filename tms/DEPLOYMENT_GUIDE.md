# DigiNex Deployment & Desktop App Guide

## 1. One Codebase, Many Platforms

You **DO NOT** need separate projects or terminals. This single code base produces:

- **Web App** (Online website)
- **Windows App** (.exe file)
- **Mac App** (.dmg file)
- **Android/iOS** (Future possibility)

Everything is controlled by the `quasar build` command with different "modes".

## 2. Setting Up Electron (Do This First!)

Before building for Desktop, you must initialize Electron mode locally once.
Run this in your terminal:

```bash
npx quasar mode add electron
```

- When asked for "Bundler", choose **Electron Builder**.
- This creates a `src-electron` folder. Do not delete it.

## 3. How to Generate Builds

### Option A: Local Build (On your computer)

- **Web**: `npx quasar build` (Output in `/dist/spa`)
- **Windows**: `npx quasar build -m electron` (Output in `/dist/electron`)
- **Mac**: _Note: You typically cannot build Mac apps on a Windows computer._ Use GitHub Actions (Option B).

### Option B: Automated GitHub Builds (Recommended)

I have added a workflow file at `.github/workflows/release.yml`.
This allows you to build for **Windows and Mac** automatically using GitHub's servers.

**How to use:**

1.  Commit and push your code to GitHub.
2.  Create a "Tag" for your version (e.g., `v1.0.1`) and push it:
    ```bash
    git tag v1.0.1
    git push origin v1.0.1
    ```
3.  Go to your **GitHub Repository > Actions**. You will see a build start.
4.  Once finished, go to **Releases**. You will find the downloadable files (.exe, .dmg, and Web files) there automatically!

## 4. Updates & Versions

Yes, this project uses semantic versioning.

- Change the `version` in `package.json` (e.g., `"version": "0.0.2"`).
- When you push code, all platforms (Web, Win, Mac) will be updated to this new version.
