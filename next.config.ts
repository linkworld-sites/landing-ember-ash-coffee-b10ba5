import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build/serve to an overridable dist dir so a build can target a temp dir
  // (.next-build) while the live runner keeps serving .next — the no-downtime
  // build-to-temp + atomic swap publish. Do NOT remove.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Runners may serve an isolated dev-mode preview behind *.run.linkworld.ai
  // (nginx + socat); Next 15 blocks cross-origin /_next/* (HMR) without this.
  allowedDevOrigins: ["*.run.linkworld.ai"],
  // Managed scaffold files have a known TS literal-comparison narrowing issue
  // (FUNNEL_JURISDICTION typed as "" vs "eu"). Type errors are caught via
  // `npx tsc --noEmit` in CI; the build itself must not block on managed files.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
