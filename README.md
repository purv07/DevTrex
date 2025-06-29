# DevTrex - Professional Development Platform

A modern React Native app built with Expo Router featuring Clerk authentication and beautiful animations.

## Features

- 🚀 **Clerk Authentication** - Secure authentication with LinkedIn OAuth
- 🎨 **Beautiful Animations** - Smooth Lottie animations and React Native Reanimated
- 📱 **Cross-Platform** - Works on iOS, Android, and Web
- 🎯 **Modern UI** - Clean, professional design with Poppins fonts
- 🔐 **Secure Storage** - Token management with Clerk

## Quick Setup Guide

### Step 1: Get Your Clerk Publishable Key

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application or select existing one
3. Copy your **Publishable Key** from the API Keys section

### Step 2: Configure Environment

1. Open the `.env` file in the root directory
2. Replace `pk_test_your_actual_publishable_key_here` with your actual Clerk Publishable Key:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

### Step 3: Configure Clerk for Web Development

**This is the most critical step for web OAuth to work:**

1. In your Clerk Dashboard, go to **"Domains"**
2. Add these development URLs to your allowed origins:
   - `http://localhost:8081`
   - `http://localhost:19006`
   - `https://localhost:8081` (if using HTTPS)

3. Go to **"User & Authentication"** > **"Social Connections"**
4. Click on **"LinkedIn"** and ensure it's enabled
5. In LinkedIn OAuth settings, add these redirect URLs:
   - `http://localhost:8081`
   - `http://localhost:19006`
   - Your actual development server URL

### Step 4: Enable LinkedIn OAuth

1. In Clerk Dashboard, go to **"User & Authentication"** > **"Social Connections"**
2. Enable **LinkedIn** OAuth provider
3. Configure your LinkedIn OAuth credentials (Client ID and Secret)

### Step 5: Run the App

```bash
npm install
npm run dev
```

## Troubleshooting OAuth Issues

### "Authentication failed" Error

This is usually caused by domain configuration issues:

1. **Check your development server URL** - Note the exact URL in your browser (e.g., `http://localhost:8081`)
2. **Add to Clerk Domains** - In Clerk Dashboard > Domains, add your exact development URL
3. **Update LinkedIn OAuth** - In Clerk Dashboard > Social Connections > LinkedIn, ensure redirect URLs match
4. **Clear browser cache** - Clear cookies and local storage for your development site
5. **Restart dev server** - Stop and restart `npm run dev`

### "Missing Publishable Key" Error

1. Ensure your `.env` file exists in the root directory
2. Verify the key starts with `pk_test_` or `pk_live_`
3. Restart the development server after updating the `.env` file

### Web-Specific Issues

- **Popup blocked**: Allow popups for your development site
- **CORS errors**: Ensure your development URL is in Clerk's allowed domains
- **Network errors**: Check your internet connection and Clerk service status

### Mobile-Specific Issues

- **Bundle identifier**: Ensure your app's bundle ID matches your OAuth configuration
- **Deep linking**: Verify your app's URL scheme is properly configured

### LinkedIn OAuth Specific Issues

- **"oauth_linkedin_oidc does not match one of the allowed values"**: Ensure LinkedIn OAuth is enabled in your Clerk Dashboard
- **LinkedIn app configuration**: Make sure your LinkedIn app has the correct redirect URLs configured
- **Scopes**: Verify that your LinkedIn app has the necessary scopes (openid, profile, email)

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

## Development Workflow

1. **Start development server**: `npm run dev`
2. **Test on web**: Open the provided localhost URL
3. **Test on mobile**: Use Expo Go app to scan QR code
4. **Debug OAuth**: Check Clerk Dashboard logs for authentication attempts

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
- Never commit secret keys to version control

## Production Deployment

1. **Update environment variables** for production
2. **Configure production domains** in Clerk dashboard
3. **Update OAuth redirect URLs** to include production domain
4. **Test authentication flow** thoroughly in production
5. **Monitor Clerk Dashboard** for authentication logs and errors

## Support

If you're still experiencing issues:

1. Check the [Clerk Documentation](https://clerk.com/docs)
2. Review [Expo OAuth Guide](https://docs.expo.dev/guides/authentication/)
3. Check Clerk Dashboard logs for specific error messages
4. Ensure all URLs and domains are correctly configured

## License

MIT License - see LICENSE file for details