// declare in global space

declare global {
    // JS object in the global namespace
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            MONGO_URI: string;
            CLOUDINARY_API_NAME: string;
            CLOUDINARY_API_KEY: string;
            CLOUDINARY_API_SECRET: string;
            CLOUDINARY_API_URL: string;
            API_BASE: string;
            NODE_ENV: "development" | "production";
        }
    }
}

export {}; // convert the file to module
