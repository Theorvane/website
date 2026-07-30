import { resolve } from "node:path";
import type { NextConfig } from "next";

import { legacyHostRedirects } from "./lib/legacy-host-redirects";

const nextConfig: NextConfig = { turbopack: { root: resolve(__dirname, "../..") }, redirects: legacyHostRedirects };

export default nextConfig;
