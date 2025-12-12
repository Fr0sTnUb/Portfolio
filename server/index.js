import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Messages storage file
const MESSAGES_FILE = path.join(__dirname, 'messages.json');

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

// Helper function to read messages
async function readMessages() {
  try {
    const data = await fs.readFile(MESSAGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Helper function to save messages
async function saveMessages(messages) {
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
}

// Helper function to send email notification
async function sendEmailNotification(contactData) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('📧 Email not configured. Set SMTP_USER and SMTP_PASS in .env to receive email notifications.');
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: contactData.email,
      subject: `📨 New Contact: ${contactData.subject || `Message from ${contactData.name}`}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        ${contactData.subject ? `<p><strong>Subject:</strong> ${contactData.subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${contactData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Received: ${new Date(contactData.timestamp).toLocaleString()}</small></p>
      `,
      text: `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
${contactData.subject ? `Subject: ${contactData.subject}` : ''}

Message:
${contactData.message}

---
Received: ${new Date(contactData.timestamp).toLocaleString()}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email notification sent successfully');
    return true;
  } catch (error) {
    console.error('❌ Email sending error:', error.message);
    return false;
  }
}

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

    // Create contact data
    const contactData = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      subject: subject ? subject.trim() : null,
      timestamp: new Date().toISOString(),
      read: false
    };

    // Save to file
    const messages = await readMessages();
    messages.unshift(contactData); // Add to beginning
    await saveMessages(messages);

    console.log('✅ Contact form submission saved:', {
      id: contactData.id,
      name: contactData.name,
      email: contactData.email,
      timestamp: contactData.timestamp
    });

    // Send email notification (non-blocking)
    sendEmailNotification(contactData).catch(err => {
      console.error('Email notification error (non-critical):', err);
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

// Get all messages (with optional password protection)
app.get('/api/messages', async (req, res) => {
  try {
    // Optional password protection
    const providedPassword = req.query.password || req.headers['x-password'];
    const expectedPassword = process.env.MESSAGES_PASSWORD;
    
    if (expectedPassword && providedPassword !== expectedPassword) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Invalid password'
      });
    }

    const messages = await readMessages();
    res.json({ 
      success: true,
      count: messages.length,
      messages: messages
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve messages',
      message: error.message
    });
  }
});

// Mark message as read
app.put('/api/messages/:id/read', async (req, res) => {
  try {
    const messages = await readMessages();
    const message = messages.find(m => m.id === req.params.id);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    message.read = true;
    await saveMessages(messages);
    
    res.json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    console.error('Update message error:', error);
    res.status(500).json({ error: 'Failed to update message' });
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

