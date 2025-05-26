# MakeUp Match - Frontend

This is the frontend for the **MakeUp Match** app, built with React, Firebase Hosting and Auth, Tailwind CSS and Vite.

Tech Stack:
- ⚛️ **React** – Modern UI library using hooks
- 🔥 **Firebase** – Authentication & Hosting
- 💨 **Tailwind CSS** – Utility-first styling framework
- ⚡ **Vite** – Lightning-fast dev/build tooling
- 🔐 **AuthContext** – Custom context for protected routes

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Environment Setup

Firebase credentials are managed via environment variables.
Make sure to create a `.env` file like this:
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```
Do *not* commit your `.env` file to version control.

### Local Development

Start the local development server with hot module reloading (HMR):

```bash
firebase login
npm run dev
firebase deploy --only hosting:makeupmatch
```

Your application will be available at `http://localhost:5173`. Make sure you are logged into Firebase CLI before running the dev server.

## Deployment with Firebase Hosting

Firebase Hosting is used to deploy the app.
To deploy your current local build, run:

```bash
npm run build
firebase deploy
```

The deployed version will be available at `https://ceremonial-bond-459215-i1.web.app`.

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.
