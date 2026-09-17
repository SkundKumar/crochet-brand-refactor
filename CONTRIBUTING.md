# Contributing

This project uses a two-stage branch workflow:

```text
feature branch -> contributors -> main -> production website
```

- `main` is the production branch.
- `contributors` is the shared integration branch.
- `feature/*` branches contain individual changes.
- Vercel creates preview deployments for contributor and feature branches.
- Merging into `main` triggers the production deployment.

## First-Time Contributors

For a public repository, a contributor can work without write access:

1. Fork the repository on GitHub.
2. Clone the fork.
3. Create a feature branch.
4. Push the branch to the fork.
5. Open a pull request from the fork into this repository's `contributors` branch.

Private repositories require an invitation before contributors can access the code.

## Collaborator Workflow

After a contributor has been added as a GitHub collaborator, they should work from a feature branch in the original repository.

Clone the repository:

```bash
git clone https://github.com/SkundKumar/crochet-brand-refactor.git
cd crochet-brand-refactor
```

Start from the latest `contributors` branch:

```bash
git fetch origin
git switch contributors
git pull origin contributors
```

Create a feature branch. Do not make changes directly on `contributors`:

```bash
git switch -c feature/short-description
```

After making and testing changes, commit and push the feature branch:

```bash
git add .
git commit -m "Describe the change"
git push -u origin feature/short-description
```

## Pull Request Review

Open a pull request on GitHub with these branches:

```text
base: contributors
compare: feature/short-description
```

The reviewer should:

1. Read the pull request description.
2. Review the **Files changed** tab.
3. Check that the Vercel preview deployment works.
4. Test the changed behavior in the preview website.
5. Confirm automated checks have passed.
6. Leave comments on specific lines when clarification or changes are needed.
7. Select **Approve** or **Request changes** under **Review changes**.

Do not merge until the required changes are complete and checks are passing.

When approved, merge the pull request into `contributors`. **Squash and merge** is recommended for a clean history. Delete the feature branch after merging if it is no longer needed.

## Testing the Vercel Preview

Vercel automatically creates a preview deployment for commits pushed to feature branches and `contributors`.

In Vercel:

1. Open the project's **Deployments** page.
2. Clear the `Environment Production` filter if it is enabled.
3. Find the deployment for the feature branch or `contributors`.
4. Wait until it shows **Ready**.
5. Click **Visit** and test the preview URL.

Preview deployments do not change the live website. Do not expose production secrets to untrusted fork pull requests.

## Merging Into Production

After all approved work has been merged into `contributors` and tested in its Vercel preview, open a final pull request:

```text
base: main
compare: contributors
```

Review the complete set of changes, verify the preview, and merge the pull request into `main`. Vercel will then deploy `main` as the production website.

Keep production changes going through pull requests. Do not push directly to `main`.

## Recommended GitHub Protection

Protect the `main` branch in the repository settings and require:

- Pull requests before merging.
- At least one approval from another person.
- Passing Vercel and other required checks.
- Conversation resolution before merging.

The same protections can be applied to `contributors` if all work should be reviewed before entering the integration branch.
