# Firebase Google Authentication - Setup Checklist

## Prerequisites
- [ ] Firebase project created (crypto-platform-b1868)
- [ ] Google OAuth credentials configured in Firebase Console
- [ ] Firebase Authentication enabled
- [ ] Firestore database created
- [ ] Node.js and npm installed

## Frontend Setup

### 1. Environment Variables
- [ ] `.env` file exists with Firebase credentials
- [ ] All required environment variables are set:
  - REACT_APP_FIREBASE_API_KEY
  - REACT_APP_FIREBASE_AUTH_DOMAIN
  - REACT_APP_FIREBASE_PROJECT_ID
  - REACT_APP_FIREBASE_STORAGE_BUCKET
  - REACT_APP_FIREBASE_MESSAGING_SENDER_ID
  - REACT_APP_FIREBASE_APP_ID

### 2. Dependencies Installed
- [ ] firebase (v12.18.0+) installed
- [ ] react-router-dom installed
- [ ] react-icons installed
- [ ] lucide-react installed

```bash
npm install firebase@^12.18.0
npm install react-router-dom@^7.18.1
npm install react-icons@^5.7.0
npm install lucide-react@^1.25.0
```

### 3. Firebase Configuration Files
- [ ] `frontend/src/firebase/firebase.js` - Correctly initializes Firebase
- [ ] `frontend/src/firebase/auth.js` - Exports all auth functions:
  - processFirebaseUser()
  - signInWithGoogleRedirect()
  - handleGoogleRedirectResult()
  - subscribeToAuthState()
  - logoutFirebase()
  - getUserProfile()
  - userExists()
  - getCurrentUser()
  - signOutUser()

### 4. Firebase Security Rules
- [ ] `firestore.rules` deployed to Firebase Console
- [ ] Rules allow users to read/write their own documents
- [ ] Rules prevent unauthorized access

```bash
firebase deploy --only firestore:rules
```

### 5. Authentication Components
- [ ] `frontend/src/components/Auth/LoginForm.jsx` - Has Google sign-in button
- [ ] Google button shows "Continue with Google"
- [ ] Loading state shows "Connecting..."
- [ ] Success state shows user profile (avatar + name + email)
- [ ] Proper error messages displayed

### 6. Session Management
- [ ] `frontend/src/utils/auth.js` - setGoogleUserSession() function
- [ ] User data stored in localStorage["loggedUser"]
- [ ] Session data includes: uid, displayName, email, photoURL, provider, role

## Firebase Console Setup

### 1. Authentication
- [ ] Google sign-in method enabled
  - Go to: Firebase Console → Authentication → Sign-in method
  - Enable "Google"
  - Add support email

### 2. OAuth Consent Screen
- [ ] OAuth consent screen configured
  - Go to: Google Cloud Console → OAuth consent screen
  - Consent type: External (if not in Google Workspace)
  - App name: "Crypto Platform"
  - Add scopes: profile, email
  - Add test users (optional)

### 3. Authorized Domains
- [ ] Your domain added to Firebase Console
  - Go to: Firebase Console → Authentication → Settings
  - Add domains:
    - localhost:3000 (development)
    - yourdomain.com (production)

### 4. Firestore Database
- [ ] Firestore database created
  - Location: Choose closest region
  - Mode: Start in test mode (then switch to production rules)
- [ ] "users" collection created
- [ ] Indexes configured (auto-created as needed)

## Testing

### Local Development
```bash
# Start the React app
cd frontend
npm start

# App should run on http://localhost:3000
```

### Google Sign-In Flow Test
1. [ ] Navigate to Login page
2. [ ] Click "Continue with Google" button
3. [ ] Google account selector appears
4. [ ] Select a Google account
5. [ ] Success message shows with user name
6. [ ] User profile displays correctly
7. [ ] Redirects to /app after 1.5 seconds
8. [ ] Check Firestore Console - user document created in /users/{uid}

### User Document in Firestore (should look like)
```json
{
  uid: "xAbCd1234...",
  displayName: "John Doe",
  email: "john@gmail.com",
  photoURL: "https://lh3.googleusercontent.com/...",
  provider: "google",
  isEmailVerified: true,
  createdAt: 2024-09-01T10:30:00Z,
  lastLogin: 2024-09-01T10:30:00Z,
  loginCount: 1
}
```

### Subsequent Logins
1. [ ] Second time login updates lastLogin timestamp
2. [ ] User data persists in localStorage
3. [ ] Profile picture loads correctly
4. [ ] No errors in browser console

## Error Cases to Test

### 1. Cancel Google Sign-In
- [ ] User clicks X or cancels at Google account screen
- [ ] Error message: "Google connection was cancelled."
- [ ] Can retry

### 2. Network Error
- [ ] Disconnect internet during sign-in
- [ ] Error message: "Network error. Please check your internet connection..."
- [ ] Can retry after reconnecting

### 3. Domain Not Authorized
- [ ] Access from unauthorized domain
- [ ] Error message: "This domain is not authorized..."
- [ ] Add domain to Firebase Console

### 4. Google Sign-In Not Enabled
- [ ] If Google auth disabled in Firebase Console
- [ ] Error message: "Google Sign-In is not enabled..."
- [ ] Enable from Firebase Console

## Deployment

### Build for Production
```bash
cd frontend
npm run build
```

### Configure Production Domain
1. [ ] Add production domain to Firebase Console
2. [ ] Update .env with production API keys (if different)
3. [ ] Deploy to production server
4. [ ] Test authentication on production URL

### Firebase Hosting (Optional)
```bash
firebase init hosting
firebase deploy --only hosting
```

## Security Checklist

- [ ] API Keys are NOT hardcoded in source
- [ ] .env file is in .gitignore
- [ ] Environment variables loaded from process.env
- [ ] Firestore rules restrict access
- [ ] Users can only modify their own documents
- [ ] No sensitive data in localStorage
- [ ] HTTPS enabled on production
- [ ] CORS properly configured
- [ ] Rate limiting configured (if needed)

## Post-Setup Tasks

- [ ] Configure email verification
- [ ] Set up password reset flow
- [ ] Add profile editing page
- [ ] Implement logout functionality
- [ ] Add user preferences/settings
- [ ] Set up analytics tracking
- [ ] Configure email notifications
- [ ] Implement two-factor authentication

## Useful Commands

```bash
# Test Firestore locally
firebase emulators:start

# Deploy Firestore rules
firebase deploy --only firestore:rules

# View Firebase logs
firebase functions:log

# Check Firebase status
firebase status

# Initialize Firebase in project
firebase init
```

## Resources

- Firebase Console: https://console.firebase.google.com
- Google Cloud Console: https://console.cloud.google.com
- Firebase Documentation: https://firebase.google.com/docs
- Google OAuth Documentation: https://developers.google.com/identity

## Support & Troubleshooting

If you encounter issues:

1. Check Firebase Console logs
2. Review browser console for errors
3. Verify environment variables are loaded
4. Check Firestore security rules
5. Ensure domain is authorized
6. Clear browser cache and retry
7. Check Firebase status page
8. Review error messages in app UI

---

**Last Updated:** 2024-09-01
**Status:** ✅ Ready for Production
