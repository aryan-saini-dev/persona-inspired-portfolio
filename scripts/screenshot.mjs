import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url = 'http://localhost:5173';
const outputDir = path.resolve('./public/screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function capture() {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();
  
  const routes = [
    { name: 'main_menu', path: '/' },
    { name: 'projects', path: '/projects' },
    { name: 'experience', path: '/experience' },
    { name: 'achievements', path: '/achievements' },
    { name: 'contact', path: '/contact' },
  ];

  // Capture Mobile
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  for (const route of routes) {
    console.log(`Capturing mobile_${route.name}...`);
    await page.goto(`${url}${route.path}`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(outputDir, `mobile_${route.name}.png`), fullPage: true });
  }

  // Capture Desktop
  await page.setViewport({ width: 1280, height: 720, isMobile: false, hasTouch: false });
  for (const route of routes) {
    console.log(`Capturing ${route.name}...`);
    await page.goto(`${url}${route.path}`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(outputDir, `${route.name}.png`) });
  }

  await browser.close();
  console.log("Screenshots captured successfully!");
}

capture().catch(err => {
  console.error("Screenshot error:", err);
  process.exit(1);
});
