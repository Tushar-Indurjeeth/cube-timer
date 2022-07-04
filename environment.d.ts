declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_KEY: string;
      NEXT_PUBLIC_AUTH_DOMAIN: string;
      NEXT_PUBLIC_PROJECT_ID: string;
      NEXT_PUBLIC_STORAGE_BUCKET: string;
      NEXT_PUBLIC_MESSAGING_SENDER_ID: string;
      NEXT_PUBLIC_APP_ID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
