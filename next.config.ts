import type { NextConfig } from "next";

// Repository name for GitHub Pages: https://vidyaa098.github.io/Disaster_management/
const repoName = "Disaster_management";

// Determine basePath:
// In GitHub Actions or when NEXT_PUBLIC_BASE_PATH is provided, use repoName prefix.
// In local development (npm run dev), keep it empty so it serves at localhost:3000.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined
  ? process.env.NEXT_PUBLIC_BASE_PATH
  : (isGithubActions ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
