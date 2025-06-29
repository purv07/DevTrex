# DevTrex - Professional Development Platform

A modern React Native app built with Expo Router featuring Clerk authentication and beautiful animations.

## Features

- 🚀 **Clerk Authentication** - Secure authentication with Google OAuth
- 🎨 **Beautiful Animations** - Smooth Lottie animations and React Native Reanimated
- 📱 **Cross-Platform** - Works on iOS, Android, and Web
- 🎯 **Modern UI** - Clean, professional design with Poppins fonts
- 🔐 **Secure Storage** - Token management with Clerk

## Setup Instructions

### 1. Clerk Configuration

To enable authentication, you need to:

1. **Create a Clerk Application:**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com/)
   - Create a new application
   - Note your Publishable Key

2. **Configure OAuth Provider:**
   - In your Clerk dashboard, go to "User & Authentication" > "Social Connections"
   - Enable Google OAuth
   - Configure your Google OAuth credentials

3. **CRITICAL: Configure Web Origins for Development:**
   - In your Clerk dashboard, go to "Domains"
   - Add your development server URL to allowed origins:
     - `http://localhost:8081` (default Expo web dev server)
     - `http://localhost:19006` (alternative Expo web port)
     - Add any other ports your development server uses
   - Go to "User & Authentication" > "Social Connections" > "Google"
   - In the Google OAuth settings, ensure redirect URLs include:
     - `http://localhost:8081`
     - `http://localhost:19006`
     - Your actual development server URL

4. **Update Environment Variables:**
   - Open `.env` file in the root directory
   - Replace `your_clerk_publishable_key_here` with your actual Clerk Publishable Key

### 2. Environment Setup

Update the `.env` file in the root directory:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
```

### 3. Installation

```bash
npm install
```

### 4. Development

```bash
npm run dev
```

## Project Structure

```
├── app/                    # App routes (Expo Router)
│   ├── (tabs)/            # Tab navigation
│   ├── login.tsx          # Login screen with Clerk OAuth
│   └── onboarding.tsx     # Onboarding flow
├── components/            # Reusable components
├── assets/                # Images and animations
└── hooks/                 # Custom hooks
```

## Clerk OAuth Flow

1. User taps "Start Now" button
2. Clerk opens Google OAuth in browser
3. User authorizes the app
4. Clerk handles the authentication process
5. User is redirected to main app with session

## Key Dependencies

- **@clerk/clerk-expo** - Authentication and user management
- **expo-web-browser** - In-app browser for OAuth
- **lottie-react-native** - Animations
- **react-native-reanimated** - Advanced animations
- **lucide-react-native** - Icons

## Security Notes

- Publishable keys are safe to expose in client-side code
- Clerk handles all sensitive authentication logic server-side
- Sessions are managed securely by Clerk

## Troubleshooting

### Common Issues

1. **"Missing Publishable Key"**
   - Ensure your `.env` file has the correct Clerk publishable key
   - Restart the development server after updating environment variables

2. **OAuth not working on Web (Authentication failed error)**
   - **MOST COMMON ISSUE**: Verify your development server URL is added to Clerk's allowed origins
   - In Clerk Dashboard > Domains, add `http://localhost:8081` and `http://localhost:19006`
   - In Clerk Dashboard > Social Connections > Google, ensure redirect URLs include your development server
   - Check that Google OAuth is enabled in your Clerk dashboard
   - Verify your Google OAuth provider is properly configured with valid credentials

3. **OAuth not working on mobile**
   - Verify Google OAuth is enabled in your Clerk dashboard
   - Check that your OAuth provider is properly configured
   - Ensure your bundle identifier matches your Google OAuth configuration

4. **CORS errors on web**
   - Ensure your Clerk application allows web origins
   - Add your development and production domains to Clerk's allowed origins
   - Check browser console for specific CORS error messages

### Debug Mode

Enable debug logging by checking the Clerk dashboard logs and using:

```typescript
console.log('Clerk OAuth Debug:', {
  publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  currentURL: window.location.href, // Web only
});
```

### Step-by-Step Web OAuth Fix

If you're getting "Authentication failed" on web:

1. **Check your development server URL** - Note the exact URL (usually `http://localhost:8081`)
2. **Go to Clerk Dashboard** - Navigate to your application
3. **Add to Domains** - Go to "Domains" section and add your development URL
4. **Configure Google OAuth** - Go to "Social Connections" > "Google" and ensure redirect URLs include your development server
5. **Clear browser cache** - Clear cookies and local storage for your development site
6. **Restart development server** - Stop and restart your Expo development server

## Production Deployment

1. Update environment variables for production
2. Configure production domains in Clerk dashboard (add your production URL to allowed origins)
3. Update Google OAuth redirect URLs to include production domain
4. Test OAuth flow thoroughly in production environment
5. Ensure proper error handling

## License

MIT License - see LICENSE file for details