declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_USER: string;
      MONGO_PASSWORD: string;
      PORT?: string;
      SECRET: string;
      PASSPORT_SECRET: string;
    }
  }
}

export {}