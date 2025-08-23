export default () => ({
  app: {
    port: parseInt(process.env.PORT || '3001'),
    globalPrefix: process.env.GLOBAL_PREFIX || 'api',
    cors: {
      origin: process.env.CORS?.split(',') || [],
      methods: process.env.CORS_METHODS || '',
    },
  },
  rapid: {
    url:
      process.env.RAPID_URL || 'https://streaming-availability.p.rapidapi.com',
    apiKey: process.env.RAPID_API_KEY || '',
  },
});
