# Contributing to Destinix AI Travel

First off, thank you for taking the time to contribute! 🎉 

This project is part of the **Social Summer of Code (SSoC) Season 5.0 (2026)** open-source program. We welcome contributions from developers of all skill levels to help build the future of AI-powered travel planning.

To maintain a healthy, productive, and respectful community, all contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 🚀 Social Summer of Code (SSoC) Workflow

To make contributions fair and organized during the program, please adhere to the following workflow:

### 1. Finding an Issue
* Browse the [Issues tab](https://github.com/MistryVishwa/Destinix-AI-Travel/issues) to find tasks.
* Look for tags such as `good first issue`, `help wanted`, `bug`, or `enhancement`.
* If you find an issue you would like to work on, or want to suggest a new feature/fix, comment on it: **"I would like to work on this issue. Please assign it to me."**

### 2. Issue Assignment
* **Do not start working on an issue until a Project Admin formally assigns it to you on GitHub.** This avoids duplicate work and ensures proper tracking.
* Once assigned, you have **3 days (72 hours)** to submit a Draft Pull Request (PR) or show active progress. If there is no activity, the issue will be unassigned and passed to another contributor.

### 3. Claiming Limits
* Contributors can be assigned to **only one issue at a time**. Once your open PR is reviewed/merged, you may claim another issue.

---

## 🛠️ Step-by-Step Contribution Flow

### Step 1: Fork the Repository
Click the **Fork** button at the top-right of the [Destinix-AI-Travel repository](https://github.com/MistryVishwa/Destinix-AI-Travel) to create a copy in your own GitHub account.

### Step 2: Clone Locally
Clone your fork to your local machine:
```bash
git clone https://github.com/YOUR-USERNAME/Destinix-AI-Travel.git
cd Destinix-AI-Travel
```

Set up the upstream remote to stay synced with the original repository:
```bash
git remote add upstream https://github.com/MistryVishwa/Destinix-AI-Travel.git
```

### Step 3: Create a Branch
Always create a descriptive branch for your changes. Avoid working on the `main` branch directly.
```bash
# Keep your main branch up to date
git checkout main
git pull upstream main

# Create a new feature or bugfix branch
# Format: category/short-description (e.g., feat/google-auth, fix/trip-details-css)
git checkout -b feat/your-feature-name
```

### Step 4: Work on the Issue
* Follow the local setup guide in the [README.md](README.md) to start the project.
* Make your changes, keeping the commits focused and clean.

### Step 5: Commit Your Changes
We follow semantic commit message guidelines. Write clear, concise commit messages:
* `feat: add Google Maps route visualization`
* `fix: correct booking date validation`
* `docs: update setup steps in README`
* `style: adjust layout spacing on mobile views`

```bash
git add .
git commit -m "feat: add descriptive message"
```

### Step 6: Push and Submit a Pull Request (PR)
Push your branch to your forked repository:
```bash
git push origin feat/your-feature-name
```

Open a PR:
1. Go to the original [Destinix-AI-Travel repository](https://github.com/MistryVishwa/Destinix-AI-Travel).
2. Click **Compare & pull request**.
3. Fill out the **Pull Request Template** details (linked issue, description, screenshots if UI is changed, checklist).
4. Link the PR to the issue by adding `Closes #IssueNumber` in the description.

---

## 🎨 Coding Standards & Guidelines

* **TypeScript & React**: Utilize functional components, React Hooks, and strictly type variables/props. Avoid using `any` types.
* **Styling**: We use **Tailwind CSS**. Prefer Tailwind class utilities. Ensure layouts are responsive and look premium across mobile, tablet, and desktop devices.
* **Linting & Code Quality**: Run the linter before pushing changes:
  ```bash
  npm run lint
  ```
  Resolve all errors and warnings before submission.
* **Keep Code Clean**: Remove all debugging `console.log` statements, unused imports, or commented-out blocks before creating a PR.

---

## 🔍 PR Review Process

1. **Review Stage**: A Project Admin will review your code. We may request additions, fixes, or styling changes.
2. **Revisions**: If changes are requested, simply commit and push the updates to your branch; the PR will automatically update.
3. **Merging**: Once approved and all checks pass, the Project Admin will merge your PR!

Thank you for contributing and happy coding! 🚀
