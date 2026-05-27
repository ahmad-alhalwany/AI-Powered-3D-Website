# AI-Powered 3D Website — Interactive T-Shirt Customizer

A full-stack **3D product configurator** that lets users design a T-shirt in the browser. Customize colors, upload logos, apply AI-generated artwork via **DALL·E**, and preview everything on a live **Three.js** model — powered by **React Three Fiber**, **Valtio**, and **Framer Motion**.

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-0.160-black?logo=threedotjs)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)](https://vitejs.dev)
[![OpenAI](https://img.shields.io/badge/OpenAI-DALL·E-green)](https://openai.com)
[![Live Demo](https://img.shields.io/badge/Live-Vercel-black?logo=vercel)](https://ai-powered-3-d-website.vercel.app)

---

## Overview

This project turns static merchandising into an **immersive 3D customization experience**. Visitors pick shirt colors, place logos or full-texture designs, generate unique artwork with AI prompts, and export the final canvas — all without leaving the browser.

**Why this project matters:** It combines modern frontend 3D rendering (React Three Fiber + GLB models), reactive global state (Valtio), motion-driven UI (Framer Motion), and a Node.js API that bridges to OpenAI's image generation — a realistic stack for e-commerce configurators and brand experiences.

**Live Demo:** [ai-powered-3-d-website.vercel.app](https://ai-powered-3-d-website.vercel.app)

---

## Architecture

```text
┌─────────────────────────┐         POST /api/v1/dalle
│   React + Vite Client   │ ◄────────────────────────────►  Express Server :8080
│   localhost:5173        │         { prompt } → base64 image
└─────────────────────────┘
         │
         ├── React Three Fiber → 3D shirt (shirt_baked.glb)
         ├── Valtio → color, decals, texture modes
         ├── Framer Motion → intro + panel animations
         └── Tailwind CSS → customizer UI
```

### Customization layers

| Layer | Control | State property |
|-------|---------|----------------|
| Color | SketchPicker | `state.color` |
| Logo decal | File upload or AI (logo mode) | `state.logoDecal` + `isLogoTexture` |
| Full texture | File upload or AI (full mode) | `state.fullDecal` + `isFullTexture` |

---

## Features

### 3D viewer
- **React Three Fiber** canvas with baked GLB model (`shirt_baked.glb`)
- **Real-time color** — smooth Lambert material transition via `maath` easing
- **Decal placement** — logo on chest or full-shirt texture overlay
- **Camera rig** — interactive orbit controls around the model
- **Studio lighting** — `@react-three/drei` Environment + backdrop

### Customization tools
- **Color picker** — `react-color` SketchPicker synced to 3D material
- **File upload** — import custom images as logo or full texture
- **AI artwork** — text prompt → DALL·E → applied directly on the shirt
- **Filter tabs** — toggle logo-shirt vs stylish full-texture modes
- **Download** — export the 3D canvas as a PNG image

### UI / UX
- **Intro landing page** — animated hero with Framer Motion
- **Customizer panel** — tabbed editor (color / file / AI)
- **Valtio state** — lightweight reactive store, no Redux boilerplate
- **Responsive Tailwind layout** — works across viewport sizes

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite 5 |
| 3D | Three.js, React Three Fiber, @react-three/drei |
| State | Valtio |
| Animation | Framer Motion, maath |
| Styling | Tailwind CSS 3.4 |
| Color UI | react-color |
| Backend | Node.js, Express 4 |
| AI | OpenAI API (DALL·E image generation) |
| Deployment | Vercel (frontend) |

---

## Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| **Node.js** | 18+ (LTS recommended) | `node -v` |
| **npm** | 9+ | `npm -v` |
| **OpenAI API key** | Required for AI features | [platform.openai.com](https://platform.openai.com/api-keys) |

---

## How to Run

The app has **two parts**: Express API server (AI) and Vite React client (3D UI). Both must run for full functionality.

### Step 1 — Clone the repository

```bash
git clone https://github.com/ahmad-alhalwany/AI-Powered-3D-Website.git
cd AI-Powered-3D-Website
```

### Step 2 — Configure the server environment

Create `server/.env`:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Step 3 — Start the Express backend

Open a **first terminal**:

```bash
cd server
npm install
npm start
```

You should see:

```text
Server has started on port 8080
```

Test the API:

```bash
curl http://localhost:8080/
# → { "message": "Hello from DALL.E" }
```

### Step 4 — Start the Vite frontend

Open a **second terminal**:

```bash
cd client
npm install
npm run dev
```

You should see:

```text
VITE v5.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Step 5 — Use the app

1. Open [http://localhost:5173](http://localhost:5173)
2. Click **Let's do it** on the intro screen
3. Use the left panel tabs:
   - **Color** — change shirt color
   - **File** — upload a custom image
   - **AI** — enter a prompt and generate logo or full design
4. Toggle **Logo** / **Stylish** filter tabs to switch decal modes
5. Click **Go Back** to return to the intro, or download the canvas

---

## API Endpoints

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| GET | `/` | — | `{ message: "Hello from DALL.E" }` |
| POST | `/api/v1/dalle` | `{ "prompt": "your text" }` | `{ "photo": "<base64>" }` |

### Example request

```bash
curl -X POST http://localhost:8080/api/v1/dalle \
  -H "Content-Type: application/json" \
  -d '{"prompt": "a futuristic robot logo, minimalist"}'
```

---

## Environment Variables

| Variable | Location | Required | Description |
|----------|----------|----------|-------------|
| `OPENAI_API_KEY` | `server/.env` | Yes (for AI) | OpenAI API key for DALL·E image generation |

### Backend URL config (client)

In `client/src/config/config.js`:

```javascript
development: { backendUrl: "http://localhost:8080/api/v1/dalle" }
production:  { backendUrl: "https://devswag.onrender.com/api/v1/dalle" }
```

Update `production.backendUrl` if you deploy your own API.

---

## Production Build

### Frontend

```bash
cd client
npm run build
npm run preview   # preview at http://localhost:4173
```

### Backend

```bash
cd server
node index.js     # or deploy to Render / Railway
```

> For production, deploy the **server** separately and point the client `config.js` production URL to your API host.

---

## Project Structure

```text
AI-Powered-3D-Website/
├── client/
│   ├── public/
│   │   ├── shirt_baked.glb      # 3D T-shirt model
│   │   └── hoodie_baked.glb     # Alternate 3D model
│   ├── src/
│   │   ├── canvas/
│   │   │   ├── index.jsx        # Three.js Canvas setup
│   │   │   ├── Shirt.jsx        # GLB model + decals + color
│   │   │   ├── CameraRig.jsx    # Orbit camera controls
│   │   │   └── BackDrop.jsx     # Scene lighting
│   │   ├── components/
│   │   │   ├── AIPicker.jsx     # DALL·E prompt UI
│   │   │   ├── ColorPicker.jsx  # Shirt color picker
│   │   │   ├── FilePicker.jsx   # Image upload
│   │   │   ├── Tab.jsx          # Editor / filter tabs
│   │   │   └── CustomButton.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Intro landing page
│   │   │   └── Customizer.jsx   # Main editor + API calls
│   │   ├── store/index.js       # Valtio global state
│   │   └── config/
│   │       ├── config.js        # API URLs
│   │       ├── constants.js     # Tabs & decal types
│   │       ├── helpers.js       # File reader, canvas download
│   │       └── motion.js        # Framer Motion variants
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── index.js                 # Express app entry
│   ├── routes/dalle.routes.js   # OpenAI DALL·E route
│   ├── package.json
│   └── .env                     # OPENAI_API_KEY (not committed)
└── .gitignore
```

---

## State Management (Valtio)

```javascript
{
  intro: true,              // show landing vs customizer
  color: '#EFBD48',         // shirt base color
  isLogoTexture: true,      // show logo decal
  isFullTexture: false,     // show full-shirt texture
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
}
```

Changes propagate instantly to the Three.js `Shirt` component via `useSnapshot`.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| AI generation fails | Ensure `server/.env` has a valid `OPENAI_API_KEY` and the server is running on port 8080 |
| CORS / fetch error | Start backend before frontend; check URL in `client/src/config/config.js` |
| 3D model not loading | Large GLB files (~25MB hoodie) — wait for load; use `shirt_baked.glb` (smaller) |
| AI image not appearing on shirt | API returns `photo` but client reads `data.image` — align field names in `Customizer.jsx` |
| Port 8080 in use | Change port in `server/index.js` and update client `config.js` |
| Port 5173 in use | Run `npm run dev -- --port 5174` in `client/` |
| `npm start` fails in server | Uses `nodemon` — run `node index.js` if nodemon is missing |

---

## Screenshots

| Intro | 3D Customizer | AI Generation |
|-------|---------------|---------------|
| _Add screenshot_ | _Add screenshot_ | _Add screenshot_ |

---

## Roadmap

- [ ] Fix API response field (`photo` vs `image`) in client
- [ ] Environment variable for backend URL (`VITE_API_URL`)
- [ ] Hoodie model switcher in UI
- [ ] Persist designs to Cloudinary / database
- [ ] Deploy backend to Render with updated production URL

---

## Author

**Ahmad Alhalwany**

- GitHub: [@ahmad-alhalwany](https://github.com/ahmad-alhalwany)
- Repository: [AI-Powered-3D-Website](https://github.com/ahmad-alhalwany/AI-Powered-3D-Website)
- Live Demo: [ai-powered-3-d-website.vercel.app](https://ai-powered-3-d-website.vercel.app)

---

## License

MIT — free to use for learning and reference.
