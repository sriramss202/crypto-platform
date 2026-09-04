# Firebase Authentication Setup Guide

## Overview
This document describes the complete Firebase Google OAuth authentication flow for the crypto-platform application.

## Architecture

### Frontend Components
- **`frontend/src/firebase/firebase.js`** - Firebase initialization
- **`frontend/src/firebase/auth.js`** - Google OAuth authentication logic
- **`frontend/src/components/Auth/LoginForm.jsx`** - Login UI with Google sign-in button
- **`frontend/src/utils/auth.js`** - Local session management

### Backend Components
- **`backend/server.js`** - Express server
- **`backend/controllers/authController.js`** - Authentication logic
- **`backend/routes/authRoutes.js`** - Auth endpoints (to be implemented)

### Database
- **Firestore Collection**: `users/` - User profiles stored by Firebase UID

## Complete Authentication Flow

### Step 1: User Clicks "Continue with Google"
```
User clicks "Continue with Google" button on LoginForm
↓
```

### Step 2: Google Sign-In with Redirect + Popup Fallback
```
Firebase initiates redirect to Google OAuth consent screen
↓
GoogleAuthProvider.setCustomParameters({
  prompt: "select_account"  // Force account selection
})
↓
User selects Google account (or redirects with popup fallback)
↓
```

### Step 3: Google Authenticates User
```
User authenticates with Google credentials
↓
Google redirects back to application
↓
```

### Step 4: Process Firebase User
```
processFirebaseUser() called with Firebase user object
↓
Extract user data:
  - uid: Firebase unique identifier
  - email: Google email
  - displayName: Google display name
  - photoURL: Google profile picture
  - provider: "google"
  - role: "user" (default)
↓
```

### Step 5: Store User Data in Firestore
```
Create/Update Firestore document at /users/{uid}
↓
Stored data:
  {
    uid: "firebase-uid",
    displayName: "User Name",
    email: "user@gmail.com",
    photoURL: "https://...",
    provider: "google",
    isEmailVerified: true,
    createdAt: timestamp (new users only),
    lastLogin: timestamp,
    loginCount: number (new users only)
  }
↓
```

### Step 6: Store Session in localStorage
```
Save user session to localStorage["loggedUser"]
↓
Session object:
  {
    uid: "firebase-uid",
    displayName: "User Name",
    email: "user@gmail.com",
    photoURL: "https://...",
    provider: "google",
    role: "user",
    isEmailVerified: true,
    phoneNumber: null
  }
↓
```

### Step 7: Redirect to App
```
Show success message: "✓ Welcome back, User Name!"
Display user profile (avatar + email)
↓
Redirect to /app after 1.5 seconds
↓
App loads with authenticated user
```

## File Structure

```
frontend/
├── src/
│   ├── firebase/
│   │   ├── firebase.js          # Firebase initialization
│   │   └── auth.js              # OAuth logic + Firestore sync
│   ├── utils/
│   │   └── auth.js              # localStorage session management
│   ├── components/
│   │   └── Auth/
│   │       └── LoginForm.jsx     # Login UI with Google button
│   └── pages/
│       └── Login.jsx             # Login page
├── firestore.rules              # Security rules for Firestore
├── .env                         # Firebase credentials
└── .env.example                 # Environment template
```

## Firebase Configuration

### .env File
```
REACT_APP_FIREBASE_API_KEY=AIzaSyDzuHeJyrnYVc4P9t56SRcrW4liiPsPm-E
REACT_APP_FIREBASE_AUTH_DOMAIN=crypto-platform-b1868.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=crypto-platform-b1868
REACT_APP_FIREBASE_STORAGE_BUCKET=crypto-platform-b1868.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=573161326302
REACT_APP_FIREBASE_APP_ID=1:573161326302:web:83dc9f740104995b3c244f
```

### Firestore Security Rules
```firestore
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow create: if request.auth.uid == userId;
      allow update, delete: if request.auth.uid == userId;
    }
  }
}
```

## Key Features Implemented

✅ **Google OAuth Sign-In**
  - Redirect flow with popup fallback
  - Account selection forced
  - Proper error handling

✅ **Firestore Integration**
  - Automatic user document creation
  - User profile storage with metadata
  - Last login tracking
  - First-time user detection

✅ **Session Management**
  - localStorage-based sessions
  - User state persistence
  - Automatic logout handling

✅ **Error Handling**
  - Friendly error messages
  - Network error detection
  - OAuth cancellation handling
  - Domain authorization checks

✅ **User Experience**
  - Loading states during sign-in
  - Success message with user name
  - Profile picture display
  - Auto-redirect after authentication

## Usage

### For Users
1. Navigate to login page
2. Click "Continue with Google"
3. Select Google account from the popup/redirect
4. Automatically stored in Firestore
5. Redirected to app dashboard

### For Developers
```javascript
// Import authentication functions
import { 
  signInWithGoogleRedirect,
  handleGoogleRedirectResult,
  getUserProfile,
  getCurrentUser,
  signOutUser 
} from "../../firebase/auth";

// Check current user
const user = getCurrentUser();

// Get user profile from Firestore
const profile = await getUserProfile(user.uid);

// Sign out user
await signOutUser();
```

## Security Considerations

1. **Firestore Rules**: Users can only read/write their own documents
2. **API Keys**: Stored in environment variables (not hardcoded)
3. **Token Management**: Firebase handles JWT internally
4. **Session Storage**: User data in localStorage (no sensitive tokens)
5. **Email Verification**: Tracked but not enforced at this stage

## Troubleshooting

### "This domain is not authorized"
- Go to Firebase Console → Authentication → Settings
- Add your domain to authorized domains

### Google Sign-In not working
- Check Firebase Console → Authentication → OAuth consent screen
- Verify Google OAuth app credentials
- Ensure HTTPS is enabled (required for production)

### User data not appearing in Firestore
- Check Firestore security rules
- Verify Firebase project ID matches .env
- Check browser console for errors

### Session not persisting
- Clear browser cache/localStorage
- Check localStorage implementation in auth.js
- Verify user data is being stored

## Next Steps

1. ✅ Google OAuth authentication
2. ⏳ Backend JWT token generation (optional)
3. ⏳ Email/password authentication (fallback)
4. ⏳ Two-factor authentication
5. ⏳ Social login with other providers (GitHub, etc.)

## Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [React Router v7 Documentation](https://reactrouter.com/)
