import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5174',
      'https://fr0strated.me',
      'https://www.fr0strated.me'
    ];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // In production, check against allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Portfolio data endpoints
app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolioData = {
      profile: {
        name: 'Nitesh Sha',
        username: 'fr0strated',
        title: 'Full Stack Developer · Data Science · Discord Bots',
        status: 'Open for collaborations',
        timezone: 'IST (UTC+5:30)',
        bio: 'I craft immersive front-end experiences, engineer intelligent backends, and analyse data to unlock insights. On Discord, I\'m the go-to builder for bots that elevate communities.',
        stats: {
          yearsExperience: 5,
          projectsShipped: 20,
          discordBots: 15
        }
      },
      skills: [
        {
          icon: 'ri-code-s-slash-line',
          title: 'Frontend',
          tags: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
          value: '8.8K',
          rarity: 'Mythical',
          rarityColor: '#ef4444',
          element: 'Code',
          elementColor: '#6366f1',
          elementIcon: 'ri-code-box-line',
        },
        {
          icon: 'ri-server-line',
          title: 'Backend',
          tags: ['Node.js', 'Python', 'Flask', 'PostgreSQL'],
          value: '5.5K',
          rarity: 'Epic',
          rarityColor: '#a855f7',
          element: 'Server',
          elementColor: '#0ea5e9',
          elementIcon: 'ri-server-line',
        },
        {
          icon: 'ri-bar-chart-box-line',
          title: 'Data Science',
          tags: ['Python', 'R', 'NumPy', 'Pandas'],
          value: '3.2K',
          rarity: 'Uncommon',
          rarityColor: '#3b82f6',
          element: 'Analytics',
          elementColor: '#06b6d4',
          elementIcon: 'ri-bar-chart-2-line',
        },
      ],
      techStack: [
        'React', 'TypeScript', 'Next.js', 'Python', 'C++',
        'discord.js', 'Java', 'Node.js', 'Tailwind', 'Figma', 'C', 'NumPy', 'Pandas', 'R', 'Flask', 'PostgreSQL'
      ],
      timestamp: new Date().toISOString()
    };
    
    res.json(portfolioData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields',
        message: 'Please fill in all required fields.'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid email format',
        message: 'Please provide a valid email address.'
      });
    }

    // TODO: Add email sending logic (using nodemailer, SES, etc.)
    // For now, just log and return success
    console.log('Contact form submission:', { 
      name, 
      email, 
      subject: subject || 'No subject', 
      message,
      timestamp: new Date().toISOString()
    });
    
    res.json({ 
      success: true, 
      message: 'Thank you for your message! I\'ll get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to send message',
      message: 'Sorry, there was an error sending your message. Please try again later.'
    });
  }
});

// Analytics endpoint (optional)
app.post('/api/analytics', async (req, res) => {
  try {
    const { event, data } = req.body;
    
    // TODO: Store analytics data (database, CloudWatch, etc.)
    console.log('Analytics event:', event, data);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log analytics' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

