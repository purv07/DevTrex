declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_LINKEDIN_CLIENT_ID: string;
      EXPO_PUBLIC_LINKEDIN_CLIENT_SECRET: string;
      EXPO_PUBLIC_API_URL: string;
    }
  }
}

// Ensure this file is treated as a module
export {};