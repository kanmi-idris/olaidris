const envConfig = {
  dbURL: `${process.env.DATABASE_URL}`,
  dbName: process.env.DATABASE_NAME || "",
  apiKey: process.env.API_KEY || "",
  secret: process.env.APPLICATION_SECRET || "",
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || "development",
};

export default envConfig;
