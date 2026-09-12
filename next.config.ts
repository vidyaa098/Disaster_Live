import type { NextConfig } from "next";

// Automatically detect repo name in GitHub Actions (e.g. vidyaa098/Disaster_Live -> Disaster_Live)
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split("/")[1] : "Disaster_Live";

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
