# Firebase Setup Instructions

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## Step 2: Enable Google Authentication

1. In your Firebase project, go to **Authentication** > **Sign-in method**
2. Click on **Google** provider
3. Enable it and save your project's support email
4. Click **Save**

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app (give it a nickname)
5. Copy the Firebase configuration object

## Step 4: Add Environment Variables

Create a `.env` file in the `Frontend/my_app/` directory with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

## Step 5: Update Firebase Config File

The config file is located at `Frontend/my_app/src/config/firebase.js`. 
It will automatically use the environment variables you set in `.env`.

## Step 6: Install Dependencies

Run this command in the `Frontend/my_app/` directory:

```bash
npm install
```

This will install Firebase and other dependencies.

## Step 7: Test the Setup

1. Start your development server: `npm run dev`
2. Try logging in with Google
3. Check the browser console for any errors

## Important Notes

- **Never commit your `.env` file** to version control
- Add `.env` to your `.gitignore` file
- For production deployment (Vercel/Render), add these environment variables in your hosting platform's settings
- Make sure your Firebase project's authorized domains include your production URL

## Troubleshooting

- **"Firebase: Error (auth/unauthorized-domain)"**: Add your domain to Firebase Console > Authentication > Settings > Authorized domains
- **"Firebase: Error (auth/popup-closed-by-user)"**: User closed the popup - this is normal
- **"Firebase: Error (auth/popup-blocked)"**: Browser blocked the popup - check browser settings

