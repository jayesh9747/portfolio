import type { NextConfig } from "next";

/**
 * Static export config for GitHub Pages.
 *
 * - `output: "export"` emits a fully static site into ./out
 * - `images.unoptimized` is required because GitHub Pages has no image server
 *   (this project uses plain <img>, so nothing is affected visually)
 *
 * USER / ORG PAGES (e.g. jayesh9747.github.io):
 *   served from the domain root — leave basePath/assetPrefix empty (default).
 *
 * PROJECT PAGES (e.g. jayesh9747.github.io/my-portfolio):
 *   uncomment the two lines below and set them to "/<repo-name>".
 */
const repoBasePath = "/jayesh9747"; // e.g. "/my-portfolio" for a project page

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(repoBasePath
    ? { basePath: repoBasePath, assetPrefix: repoBasePath }
    : {}),
};

export default nextConfig;
