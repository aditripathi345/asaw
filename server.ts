import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiRouter } from './src/server/routes/api';
import { ENV } from './src/server/config/env';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = ENV.PORT;

  // Middleware for CORS
  app.use(cors({
    origin: true,
    credentials: true,
  }));

  // Capture raw body for Razorpay Webhook verification
  app.use(express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf.toString();
    },
  }));
  app.use(express.urlencoded({ extended: true }));

  // Request logger for API calls
  app.use('/api', (req: Request, _res: Response, next: NextFunction) => {
    if (ENV.NODE_ENV === 'development') {
      console.log(`[API] ${req.method} ${req.originalUrl}`);
    }
    next();
  });

  // Mount REST API endpoints
  app.use('/api', apiRouter);

  // Vite development server middleware integration
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  // Global Error Handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[Server Error]', err);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred. Please contact ASAW support at +91 94159 94473.',
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(`ASAW CONSULTANCY SERVICES - BACKEND ENGINE`);
    console.log(`Headquarters: Gomti Nagar, Lucknow, Uttar Pradesh, India`);
    console.log(`Helpline: +91 94159 94473 | Email: asawconsultancy@gmail.com`);
    console.log(`Server running at: http://localhost:${PORT}`);
    console.log(`API Health: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
