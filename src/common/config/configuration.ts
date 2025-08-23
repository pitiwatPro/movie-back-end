export default () => ({
  rapid: {
    url:
      process.env.RAPID_URL || 'https://streaming-availability.p.rapidapi.com',
    apiKey: process.env.RAPID_API_KEY || '',
  },
});
