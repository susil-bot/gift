# Festive Gift Site

A small Christmas & New Year themed React experience with five sections and a password-protected finale.

## Run locally

```bash
npm install
npm start
```

This uses `react-scripts`. The main entry is `src/index.js`, with feature cards in `src/components/` and shared styles in `src/styles/global.css`.

## Locked section

`LockedSection` performs a client-side SHA-256 comparison against a stored hash. The demo password is `northpole2024!` (hash only is stored in code). For a production secret, move verification server-side.

