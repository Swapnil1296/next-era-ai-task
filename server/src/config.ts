export const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8080',
//   'https://your-production-domain.com'
];

export const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};