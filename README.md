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

3. **Update Environment Variables:**
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

2. **OAuth not working**
   - Verify Google OAuth is enabled in your Clerk dashboard
   - Check that your OAuth provider is properly configured

3. **Authentication fails on web**
   - Ensure your Clerk application allows web origins
   - Check browser console for any CORS errors

### Debug Mode

Enable debug logging by checking the Clerk dashboard logs and using:

```typescript
console.log('Clerk OAuth Debug:', {
  publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
});
```

## Production Deployment

1. Update environment variables for production
2. Configure production domains in Clerk dashboard
3. Test OAuth flow thoroughly
4. Ensure proper error handling

## License

MIT License - see LICENSE file for details