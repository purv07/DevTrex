# DevTrex - Professional Development Platform

A modern React Native app built with Expo Router featuring LinkedIn OAuth authentication and beautiful animations.

## Features

- 🚀 **LinkedIn OAuth Integration** - Secure authentication with LinkedIn
- 🎨 **Beautiful Animations** - Smooth Lottie animations and React Native Reanimated
- 📱 **Cross-Platform** - Works on iOS, Android, and Web
- 🎯 **Modern UI** - Clean, professional design with Poppins fonts
- 🔐 **Secure Storage** - Token management with Expo SecureStore

## Setup Instructions

### 1. LinkedIn OAuth Configuration

To enable LinkedIn authentication, you need to:

1. **Create a LinkedIn App:**
   - Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
   - Create a new app
   - Note your Client ID and Client Secret

2. **Configure Redirect URI:**
   - In your LinkedIn app settings, add the redirect URI:
   - For development: `exp://localhost:19000/--/auth/linkedin`
   - For production: `devtrex://auth/linkedin`

3. **Update Configuration:**
   - Open `services/linkedinAuth.ts`
   - Replace `YOUR_LINKEDIN_CLIENT_ID` with your actual Client ID
   - Replace `YOUR_LINKEDIN_CLIENT_SECRET` with your actual Client Secret

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
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
│   ├── login.tsx          # Login screen with LinkedIn OAuth
│   └── onboarding.tsx     # Onboarding flow
├── components/            # Reusable components
├── services/              # API services
│   └── linkedinAuth.ts    # LinkedIn OAuth service
├── assets/                # Images and animations
└── hooks/                 # Custom hooks
```

## LinkedIn OAuth Flow

1. User taps "Start Now" button
2. App opens LinkedIn OAuth in browser
3. User authorizes the app
4. App receives authorization code
5. Code is exchanged for access token
6. User profile is fetched from LinkedIn API
7. Tokens are stored securely
8. User is redirected to main app

## Key Dependencies

- **expo-auth-session** - OAuth authentication
- **expo-web-browser** - In-app browser for OAuth
- **expo-secure-store** - Secure token storage
- **lottie-react-native** - Animations
- **react-native-reanimated** - Advanced animations
- **lucide-react-native** - Icons

## Security Notes

- Client secrets should never be exposed in client-side code
- Use environment variables for sensitive configuration
- Tokens are stored securely using Expo SecureStore
- OAuth flow uses PKCE for additional security

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI"**
   - Ensure your LinkedIn app has the correct redirect URI configured
   - Check that the scheme matches your app.json configuration

2. **"Client ID not found"**
   - Verify your LinkedIn Client ID is correctly set in the service
   - Ensure your LinkedIn app is active

3. **Authentication fails on web**
   - Web OAuth requires additional CORS configuration
   - Consider using a development build for testing

### Debug Mode

Enable debug logging by adding this to your LinkedIn auth service:

```typescript
console.log('LinkedIn OAuth Debug:', {
  clientId: LINKEDIN_CONFIG.clientId,
  redirectUri: LINKEDIN_CONFIG.redirectUri,
  scopes: LINKEDIN_CONFIG.scopes,
});
```

## Production Deployment

1. Update redirect URIs in LinkedIn app settings
2. Configure production environment variables
3. Test OAuth flow thoroughly
4. Ensure proper error handling

## License

MIT License - see LICENSE file for details