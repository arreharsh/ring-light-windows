# Ring Light for Windows

A simple Electron-based Windows app that replicates the macOS ring light feature to improve your lighting on video calls. Built with HTML, CSS, and JavaScript.

## Overview

Ring Light for Windows places an adjustable on-screen light (ring/softbox overlay) that brightens your face during video calls across popular apps (Zoom, Google Meet, Microsoft Teams, Discord, etc.). It’s lightweight, privacy-friendly, and runs locally on your machine.

## Features

- Adjustable brightness, size, and color temperature (warm/cool)
- Move and position the ring light anywhere on the screen
- Always-on-top mode to stay visible over call windows
- Quick toggle to show/hide the light
- Multi-monitor support (planned)
- Keyboard shortcuts (planned)

## Roadmap

- Chrome extension to work directly in browser meetings (Google Meet, Zoom Web, Teams Web)
- Profiles per app (Zoom/Teams/Meet)
- Auto-hide when screen sharing
- Startup on boot option
- Multi-monitor positioning

## Tech Stack

- Electron (Windows desktop)
- HTML, CSS, JavaScript (UI & controls)

## Installation (Development)

Prerequisites:
- Node.js 18+ and npm/pnpm
- Git

Steps:
```bash
# Clone the repository
git clone https://github.com/arreharsh/ring-light-windows.git

# Navigate to project directory
cd ring-light-windows

# Install dependencies
npm install
# or
pnpm install

# Start the app in development
npm start

# Optional: build/pack the app (depends on the configured builder)
# If electron-builder or forge is configured, try:
npm run build
# or
npm run make
```

If you need help running a packaged build, please open an issue.

## Usage

1. Launch the app.
2. Use the UI controls to adjust brightness, size, and color temperature.
3. Drag the ring light to a suitable position near your webcam feed.
4. Toggle "Always on top" to keep the light over your call window.
5. Press the quick toggle to show/hide when you don’t need it.

Works with:
- Zoom
- Google Meet
- Microsoft Teams
- Discord
- Most other video-calling apps

## Privacy

- No data is sent to any server; the app runs entirely locally.
- The overlay is purely visual and does not access your camera feed.

## Contributing

Contributions are welcome! You can:
- Report bugs
- Suggest features
- Submit PRs for improvements

Please open an issue first to discuss major changes.

## License

MIT License (will be added soon). If you’d like me to add it now, let me know and I’ll include the LICENSE file.

---

Part of LocalTools – privacy-focused productivity utilities.