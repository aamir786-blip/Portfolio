# Mohd Aamir — Portfolio

A dependency-free, responsive portfolio built with HTML, CSS, and JavaScript. It can be hosted as a static site on GitHub Pages, Cloudflare Pages, or any static web host.

## Run locally

Open `index.html` in a browser, or serve this folder with any local static-file server. No build step or package installation is required.

## Personalize the content

Edit the `portfolioData` object near the top of `script.js`:

- Replace each `placeholder: true` skill row in `skillCategories` with skills you can confirm. Each real skill uses `{ name, level }`, with `level` from 0 to 100. Add or remove rows as needed.
- Replace the example `projects` with real work. Each entry supports `title`, `category`, `description`, `technologies`, `screenshot`, `github`, and `live`. Use an empty string for links or images that are not available.
- Add real `certificates` with `title`, `type`, `issuer`, `date`, `image`, and `verificationUrl`.
- Update your `email`, `github`, `linkedin`, or `instagram` details under `profile` when needed.
- To enable the resume download, add your PDF to the site and set `resumePath` to its relative path.
- The contact form remains disabled until `formEndpoint` points to a configured service that accepts the JSON form payload.

The project and certificate examples are intentionally marked as placeholders. Do not publish placeholder entries as completed work.

## Deploy

Upload the files to the root of a static hosting repository or configure your hosting provider to publish this folder. For GitHub Pages, select the repository branch and root folder in **Settings → Pages**. Keep any added images and resume files in the published site directory and use relative paths in `script.js`.
