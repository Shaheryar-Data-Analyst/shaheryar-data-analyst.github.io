# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Shaheryar portfolio
Personalized from the downloaded cinematic-portfolio project. Content is in
src/content/portfolio.ts. The original component styling and motion remain the
design foundation. The hero currently uses public/shaheryar-hero-portrait.png
with a separate animated smoke overlay. To switch to personal video, put the
MP4 in public/videos and set portfolio.heroMedia.video to its public URL
(for example, /videos/shaheryar-hero.mp4). The portrait remains its poster.
The smoke pauses offscreen and in hidden tabs, and stays still for visitors
who prefer reduced motion. The site uses the normal system mouse cursor.
The About image uses the supplied London photo at public/shaheryar-london-about.jpg,
with its display crop set in AboutSection.tsx. Set portfolio.portrait to change it.
Original repository: https://github.com/lohithadamisetti123/cinematic-portfolio

Run: npm run dev -- --host localhost --port 5173
Build: npm run build
Checks: npm run lint and npx tsc -b
Contact opens a mailto draft; the visitor completes sending in their email app.
The supplied resume is available at /resume.pdf. No deployment has been made.

Featured projects and the GitHub collection are maintained in src/content/portfolio.ts.
See docs/github-project-review.md for the source review, verified links and access limitations.
