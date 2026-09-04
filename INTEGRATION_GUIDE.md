# Firebase Google Auth - Integration Guide

## Quick Start

### 1. Login Page Usage
The login page already includes Google sign-in. Users just need to click "Continue with Google".

```jsx
// LoginForm.jsx already handles this
<button onClick={handleGoogleSignIn}>
  <FcGoogle /> Continue with Google
</button>
```

### 2. Check if User is Logged In (Any Page)

```jsx
import { getCurrentUser } from "../utils/auth";

function Dashboard() {
  const user = getCurrentUser();
  
  if (!user) {
    return <Redirect to="/login" />;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <img src={user.photoURL} alt={user.name} />
    </div>
  );
}
```

### 3. Protected Routes (Route Guard)

```jsx
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

function ProtectedRoute({ children }) {
  const user = getCurrentUser();
  
  return user ? children : <Navigate to="/login" />;
}

// Usage in Router
<Route 
  path="/app" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### 4. Logout User

```jsx
import { signOutUser } from "../firebase/auth";

function LogoutButton() {
  const handleLogout = async () => {
    const result = await signOutUser();
    if (result.success) {
      navigate("/login");
    }
  };
  
  return <button onClick={handleLogout}>Logout</button>;
}
```

### 5. Get User Profile from Firestore

```jsx
import { getUserProfile } from "../firebase/auth";
import { getCurrentUser } from "../utils/auth";

async function UserProfile() {
  const sessionUser = getCurrentUser();
  
  if (sessionUser) {
    const profileResult = await getUserProfile(sessionUser.id);
    if (profileResult.success) {
      console.log("Full profile from Firestore:", profileResult.data);
    }
  }
}
```

### 6. Subscribe to Auth State Changes

```jsx
import { subscribeToAuthState } from "../firebase/auth";
import { useEffect, useState } from "react";

function useAuthListener() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = subscribeToAuthState((authUser) => {
      setUser(authUser);
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, []);
  
  return user;
}

// Usage
function App() {
  const user = useAuthListener();
  
  return <div>{user ? `Logged in as ${user.email}` : "Not logged in"}</div>;
}
```

## Complete Example: User Dashboard

```jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, isAuthenticated } from "../utils/auth";
import { getUserProfile, signOutUser } from "../firebase/auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Get current user from localStorage
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Get full profile from Firestore
    const fetchProfile = async () => {
      const result = await getUserProfile(currentUser.id);
      if (result.success) {
        setProfile(result.data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    const result = await signOutUser();
    if (result.success) {
      navigate("/login");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}!</h1>
      
      {user?.photoURL && (
        <img 
          src={user.photoURL} 
          alt={user.name} 
          className="profile-pic"
        />
      )}
      
      <div className="user-info">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Provider:</strong> {user?.provider}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>

      {profile && (
        <div className="firestore-data">
          <h3>Firestore Profile</h3>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
      )}

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}
```

## Available Functions

### From `firebase/auth.js`

```javascript
// Sign In
await signInWithGoogleRedirect()  // Returns: { success, user, isNewUser }

// Check Redirect Result
await handleGoogleRedirectResult()  // Returns: { success, user } or null

// Get User Data
await getUserProfile(uid)           // Returns: { success, data } or { success, error }
await userExists(uid)               // Returns: boolean
getCurrentUser()                    // Returns: Firebase user object or null

// Auth State
subscribeToAuthState(callback)      // Subscribe to auth changes, returns unsubscribe
logoutFirebase()                    // Sign out from Firebase
signOutUser()                       // Sign out and clear session

// Process User (internal)
await processFirebaseUser(user)     // Process Firebase user, sync with Firestore
```

### From `utils/auth.js`

```javascript
// Session Management
setGoogleUserSession(user)          // Save user to localStorage
getCurrentUser()                    // Get logged-in user from localStorage
isAuthenticated()                   // Check if user is logged in

// Email/Password Auth (already implemented)
registerUser(user)                  // Register new user
loginUser(email, password)          // Login user
loginAdmin(email, password)         // Login admin
```

## Data Flow

```
┌─────────────────────────────────────────────────┐
│ User clicks "Continue with Google"              │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ Google OAuth Popup/Redirect                     │
│ - User selects account                          │
│ - Authenticates with Google                     │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ Firebase Receives OAuth Token                   │
│ - Creates Firebase User                         │
│ - Returns Firebase credentials                  │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ processFirebaseUser()                           │
│ - Extract user data                             │
│ - Sync to Firestore                             │
│ - Save to localStorage                          │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ Firestore /users/{uid}                          │
│ - User document created/updated                 │
│ - Includes profile data                         │
│ - Timestamps recorded                           │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ localStorage["loggedUser"]                       │
│ - Session persisted locally                     │
│ - Fast access for offline checks                │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│ Redirect to /app Dashboard                      │
│ - User fully authenticated                      │
│ - Profile ready to display                      │
└─────────────────────────────────────────────────┘
```

## Common Patterns

### 1. Authentication Check on App Load

```jsx
useEffect(() => {
  const user = getCurrentUser();
  
  if (!user) {
    // Not logged in, redirect to login
    navigate("/login");
  } else {
    // User is logged in, you can make authenticated requests
    loadUserData();
  }
}, [navigate]);
```

### 2. Showing User Avatar in Header

```jsx
function Header() {
  const user = getCurrentUser();
  
  if (!user) return null;
  
  return (
    <header>
      <img 
        src={user.photoURL} 
        alt={user.name}
        className="avatar"
      />
      <span>{user.name}</span>
    </header>
  );
}
```

### 3. Conditional Rendering Based on Auth

```jsx
function App() {
  const isLoggedIn = isAuthenticated();
  
  return (
    <>
      {isLoggedIn ? (
        <>
          <Dashboard />
          <LogoutButton />
        </>
      ) : (
        <>
          <LoginForm />
          <SignupForm />
        </>
      )}
    </>
  );
}
```

## Troubleshooting Integration

### User data not showing after login
```javascript
// Check localStorage
const user = getCurrentUser();
console.log("Session user:", user);

// Check if Firestore has data
const profileResult = await getUserProfile(user.id);
console.log("Firestore data:", profileResult);
```

### Logout not working
```javascript
// Make sure to call both Firebase logout and clear session
await logoutFirebase();        // Firebase sign-out
localStorage.removeItem("loggedUser");  // Clear session
navigate("/login");             // Redirect to login
```

### User stuck on login page
```javascript
// Check if getCurrentUser() is working
const user = getCurrentUser();
if (user) {
  console.log("User exists:", user);
} else {
  console.log("No user found");
}
```

## Performance Tips

1. **Use `getCurrentUser()` for quick checks** - No async calls
2. **Cache profile data** - Don't refetch every render
3. **Unsubscribe from listeners** - Prevent memory leaks
4. **Use React Context** - For global auth state (optional)
5. **Lazy load protected routes** - Only load when authenticated

## Next Steps

1. Test the login flow thoroughly
2. Implement logout in your header/navigation
3. Add protected routes to your main app
4. Create user profile/settings page
5. Add more OAuth providers (GitHub, Facebook, etc.)
6. Implement password reset flow
7. Add two-factor authentication

---

For more examples and detailed documentation, see [FIREBASE_AUTH_SETUP.md](./FIREBASE_AUTH_SETUP.md)
