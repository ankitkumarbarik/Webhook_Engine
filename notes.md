
<!-- install all packages in current workspace -->
## pnpm istall

<!-- install all packages in all workspaces -->
## pnpm install -r

<!-- install package in all workspaces -->
## pnpm add -D `package-name` -w
## pnpm add -D `package-name`
## pnpm add `package-name` -w
## pnpm add `package-name`

<!-- install package in specific workspace -->
## pnpm add `package-name` `package-name` --filter ./apps/lms
## pnpm add -D `package-name` --filter ./apps/lms

<!-- install package in multiple workspaces -->
## pnpm add `package-name` --filter "./apps/lms" --filter "./apps/automator"
## pnpm add -D `package-name` --filter "./apps/lms" --filter "./apps/automator"

<!-- remove package in multiple workspaces -->
## pnpm remove `package-name` --filter "./apps/lms" --filter "./apps/automator"

<!-- update all packages in all workspaces -->
## pnpm update

<!-- update package in all workspaces -->
## pnpm update `package-name`

<!-- update package in specific workspace -->
## pnpm update `package-name` --filter ./apps/lms

<!-- update package in multiple workspaces -->
## pnpm update `package-name` --filter "./apps/lms" --filter "./apps/automator"

<!-- remove package in all workspaces -->
## pnpm remove `package-name`
## pnpm remove -D `package-name`

<!-- remove package in multiple workspaces -->
## pnpm remove `package-name` --filter "./apps/lms" --filter "./apps/automator"
## pnpm remove -D `package-name` --filter "./apps/lms" --filter "./apps/automator"

<!-- run dev server in multiple workspaces -->
## pnpm --filter lms dev
## pnpm --filter automator dev

<!-- run dev server in multiple workspaces in parallel -->
## pnpm -r --parallel run dev --stream 