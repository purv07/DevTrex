import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Complete the auth session for web
WebBrowser.maybeCompleteAuthSession();

// LinkedIn OAuth Configuration
const LINKEDIN_CONFIG = {
  clientId: process.env.EXPO_PUBLIC_LINKEDIN_CLIENT_ID!,
  clientSecret: process.env.EXPO_PUBLIC_LINKEDIN_CLIENT_SECRET!,
  redirectUri: AuthSession.makeRedirectUri({
    scheme: 'devtrex',
    path: 'auth/linkedin',
  }),
  scopes: ['openid', 'profile', 'email'],
  responseType: AuthSession.ResponseType.Code,
};

// LinkedIn OAuth URLs
const LINKEDIN_ENDPOINTS = {
  authorization: 'https://www.linkedin.com/oauth/v2/authorization',
  token: 'https://www.linkedin.com/oauth/v2/accessToken',
  userInfo: 'https://api.linkedin.com/v2/userinfo',
};

export interface LinkedInUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

export interface AuthResult {
  success: boolean;
  user?: LinkedInUser;
  accessToken?: string;
  error?: string;
}

class AuthService {
  private discovery = {
    authorizationEndpoint: LINKEDIN_ENDPOINTS.authorization,
    tokenEndpoint: LINKEDIN_ENDPOINTS.token,
    userInfoEndpoint: LINKEDIN_ENDPOINTS.userInfo,
  };

  /**
   * Initiate LinkedIn OAuth flow
   */
  async signInWithLinkedIn(): Promise<AuthResult> {
    try {
      console.log('Starting LinkedIn OAuth flow...');
      
      // Validate configuration
      if (!LINKEDIN_CONFIG.clientId || LINKEDIN_CONFIG.clientId === 'your_linkedin_client_id_here') {
        throw new Error('LinkedIn Client ID not configured. Please set EXPO_PUBLIC_LINKEDIN_CLIENT_ID in your .env file');
      }
      
      // Create auth request
      const request = new AuthSession.AuthRequest({
        clientId: LINKEDIN_CONFIG.clientId,
        scopes: LINKEDIN_CONFIG.scopes,
        redirectUri: LINKEDIN_CONFIG.redirectUri,
        responseType: LINKEDIN_CONFIG.responseType,
        additionalParameters: {
          state: Math.random().toString(36).substring(7), // CSRF protection
        },
      });

      console.log('Auth request created:', {
        clientId: LINKEDIN_CONFIG.clientId,
        redirectUri: LINKEDIN_CONFIG.redirectUri,
        scopes: LINKEDIN_CONFIG.scopes,
      });

      // Start auth session
      const result = await request.promptAsync(this.discovery);
      
      console.log('Auth session result:', result);

      if (result.type === 'success') {
        const { code } = result.params;
        
        if (!code) {
          throw new Error('No authorization code received');
        }

        // Exchange code for access token
        const tokenResult = await this.exchangeCodeForToken(code);
        
        if (!tokenResult.access_token) {
          throw new Error('Failed to get access token');
        }

        // Get user info
        const userInfo = await this.getUserInfo(tokenResult.access_token);
        
        // Store tokens securely
        await this.storeTokens({
          accessToken: tokenResult.access_token,
          refreshToken: tokenResult.refresh_token,
          expiresIn: tokenResult.expires_in,
        });

        return {
          success: true,
          user: userInfo,
          accessToken: tokenResult.access_token,
        };
      } else if (result.type === 'cancel') {
        return {
          success: false,
          error: 'User cancelled the authentication',
        };
      } else {
        return {
          success: false,
          error: result.error?.message || 'Authentication failed',
        };
      }
    } catch (error) {
      console.error('LinkedIn OAuth error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Exchange authorization code for access token
   */
  private async exchangeCodeForToken(code: string) {
    const tokenUrl = LINKEDIN_ENDPOINTS.token;
    
    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: LINKEDIN_CONFIG.redirectUri,
      client_id: LINKEDIN_CONFIG.clientId,
      client_secret: LINKEDIN_CONFIG.clientSecret,
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Token exchange failed:', errorText);
      throw new Error(`Token exchange failed: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Get user information from LinkedIn API
   */
  private async getUserInfo(accessToken: string): Promise<LinkedInUser> {
    const response = await fetch(LINKEDIN_ENDPOINTS.userInfo, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('User info fetch failed:', errorText);
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }

    const userInfo = await response.json();
    
    return {
      id: userInfo.sub,
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      given_name: userInfo.given_name,
      family_name: userInfo.family_name,
    };
  }

  /**
   * Store authentication tokens securely
   */
  private async storeTokens(tokens: {
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
  }) {
    try {
      if (Platform.OS !== 'web') {
        await SecureStore.setItemAsync('linkedin_access_token', tokens.accessToken);
        
        if (tokens.refreshToken) {
          await SecureStore.setItemAsync('linkedin_refresh_token', tokens.refreshToken);
        }
        
        if (tokens.expiresIn) {
          const expiryTime = Date.now() + (tokens.expiresIn * 1000);
          await SecureStore.setItemAsync('linkedin_token_expiry', expiryTime.toString());
        }
      } else {
        // For web, use localStorage (less secure but functional)
        localStorage.setItem('linkedin_access_token', tokens.accessToken);
        
        if (tokens.refreshToken) {
          localStorage.setItem('linkedin_refresh_token', tokens.refreshToken);
        }
        
        if (tokens.expiresIn) {
          const expiryTime = Date.now() + (tokens.expiresIn * 1000);
          localStorage.setItem('linkedin_token_expiry', expiryTime.toString());
        }
      }
    } catch (error) {
      console.error('Failed to store tokens:', error);
    }
  }

  /**
   * Get stored access token
   */
  async getStoredAccessToken(): Promise<string | null> {
    try {
      if (Platform.OS !== 'web') {
        return await SecureStore.getItemAsync('linkedin_access_token');
      } else {
        return localStorage.getItem('linkedin_access_token');
      }
    } catch (error) {
      console.error('Failed to get stored token:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getStoredAccessToken();
    return !!token;
  }

  /**
   * Get current user info
   */
  async getCurrentUser(): Promise<LinkedInUser | null> {
    try {
      const token = await this.getStoredAccessToken();
      if (!token) return null;
      
      return await this.getUserInfo(token);
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  /**
   * Sign out user
   */
  async signOut(): Promise<void> {
    try {
      if (Platform.OS !== 'web') {
        await SecureStore.deleteItemAsync('linkedin_access_token');
        await SecureStore.deleteItemAsync('linkedin_refresh_token');
        await SecureStore.deleteItemAsync('linkedin_token_expiry');
      } else {
        localStorage.removeItem('linkedin_access_token');
        localStorage.removeItem('linkedin_refresh_token');
        localStorage.removeItem('linkedin_token_expiry');
      }
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  }
}

export const authService = new AuthService();