# 🎄 Christmas Gift Website for Zuha

A beautiful, interactive Christmas and New Year themed website with a password-protected locked section.

## Features

- 🎅 Multiple themed sections with smooth horizontal scrolling
- 🔒 Password-protected locked section with encrypted content
- 📱 Fully responsive design for all devices
- 🎵 Background music player
- 🎨 Beautiful Christmas-themed UI with animations
- 🔐 Client-side encryption for hidden content

## Tech Stack

- React 18
- React Router DOM
- CSS3 with animations
- Client-side encryption (XOR + Base64)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Manual Deployment Steps

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - The workflow will automatically deploy on every push to `main` branch

3. **Access your site:**
   - Your site will be available at: `https://susil-bot.github.io/gift`
   - The first deployment may take a few minutes

### GitHub Actions Workflow

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:
- Builds the React app on every push to `main`
- Deploys automatically to GitHub Pages
- Uses the latest GitHub Actions for Pages deployment

## Project Structure

```
gift/
├── public/
│   ├── assets/          # Images and static assets
│   └── index.html
├── src/
│   ├── components/      # React components
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions (encryption)
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions deployment workflow
└── package.json
```

## Sections

1. **Welcome** - Introduction section
2. **About Santa** - Fun facts about Santa
3. **Holiday Traditions** - Christmas traditions showcase
4. **Christmas Activities** - Timeline of activities
5. **New Year Party** - New Year wishes and countdown
6. **Locked Section** - Password-protected gift section

## Security Note

The locked section uses client-side encryption for obfuscation. This is **not** true security - determined users can still reverse engineer it. It's designed to hide content from casual inspection in source code.

## License

Private project - All rights reserved

## Author

Created with ❤️ for Zuha
