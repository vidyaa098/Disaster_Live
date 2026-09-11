# CrisisResponse — Disaster Management & Emergency Response Portal

A fast, responsive, modern emergency coordination and disaster response web platform built with **Next.js**, **React 19**, and **Tailwind CSS v4**. Fully optimized for static hosting on **GitHub Pages**.

---

## 🌟 Key Features

1. **Emergency Broadcast & Threat Alerts**: Real-time severity banners and warning tickers for floods, cyclones, and landslides.
2. **24/7 Emergency Helpline Matrix**: 1-click dialers for National Emergency (112), NDMA Disaster Control (1078), Ambulance (108), Fire (101), and State Disaster Authorities.
3. **Interactive Incident Reporting**: Distress request submission for stranded individuals (captures disaster type, exact location, stranded count, critical needs like boat/air rescue, medical aid, power, and contact info).
4. **Relief Camps & Shelters Locator**: Searchable database of safe relief centers, live occupancy tracking, amenity indicators (clean water, medical unit, beds, meals, generator), and officer contact numbers.
5. **"I am Safe" Citizen Registry**: Safe status check-in enabling affected individuals to notify relatives and rescue teams of their location and status.
6. **72-Hour Survival Kit & Safety Guides**: Interactive Go-Bag preparedness checklist with completion progress tracking, and calamity-specific Dos & Don'ts for floods and cyclones.

---

## 🚀 Local Development

First, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Building Static Export

To generate the static production build for GitHub Pages:

```bash
npm run build
```

This generates the fully static site inside the `./out` directory along with `public/.nojekyll`.

---

## 🌐 Deploying to GitHub Pages

This repository includes an automated GitHub Actions CI/CD workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys your site whenever you push to the `main` branch.

### Enabling GitHub Pages in Your Repository:

1. Push your code to your GitHub repository (`vidyaa098/Disaster_management`).
2. Go to your repository on GitHub: **Settings** -> **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. That's it! GitHub Actions will automatically run the deployment workflow and publish the site.

Your live website will be accessible at:
```
https://vidyaa098.github.io/Disaster_management/
```
