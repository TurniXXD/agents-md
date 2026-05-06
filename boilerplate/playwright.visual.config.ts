import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const LOCAL_WORKERS = Number(process.env.PLAYWRIGHT_WORKERS ?? 6);

// Keep the boilerplate locale list intentionally minimal.
// Adjust this array to match the target project's actual i18n setup.
const locales = ["en"] as const;

const viewportProjects = [
  {
    name: "wide-desktop",
    use: {
      viewport: { width: 1600, height: 1000 },
    },
  },
  {
    name: "desktop",
    use: {
      viewport: { width: 1280, height: 800 },
    },
  },
  {
    name: "laptop",
    use: {
      viewport: { width: 1024, height: 768 },
    },
  },
  {
    name: "tablet",
    use: {
      ...devices["iPad Mini"],
      viewport: { width: 768, height: 1024 },
    },
  },
  {
    name: "mobile",
    use: {
      ...devices["Pixel 5"],
    },
  },
  {
    name: "small-mobile",
    use: {
      ...devices["iPhone 12 Mini"],
    },
  },
] satisfies PlaywrightTestConfig["projects"];

const browserProjects = [
  {
    name: "chromium",
    use: {
      browserName: "chromium",
      launchOptions: {
        args: ["--disable-features=CalculateNativeWinOcclusion"],
      },
    },
  },
  {
    name: "webkit",
    use: {
      browserName: "webkit",
    },
  },
] satisfies PlaywrightTestConfig["projects"];

export default defineConfig({
  testDir: "./tests/visual",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : LOCAL_WORKERS,
  reporter: process.env.CI
    ? [["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    colorScheme: "light",
  },
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      scale: "css",
      maxDiffPixelRatio: 0.002,
    },
  },
  snapshotPathTemplate:
    "{testDir}/snapshots/{testFilePath}/{arg}-{projectName}{ext}",
  projects: locales.flatMap((locale) =>
    browserProjects.flatMap((browserProject) =>
      viewportProjects.map((viewportProject) => ({
        name: `${locale}-${browserProject.name}-${viewportProject.name}`,
        use: {
          locale,
          ...browserProject.use,
          ...viewportProject.use,
        },
      })),
    ),
  ),
});
