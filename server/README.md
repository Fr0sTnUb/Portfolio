# Backend Server

Backend server for the portfolio contact form.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the server:**
   ```bash
   npm run dev    # Development (with auto-reload)
   npm start      # Production
   ```

## Features

### Contact Form API
- **POST `/api/contact`** - Submit contact form
  - Stores messages in `messages.json`
  - Sends email notification (if configured)
  
### View Messages

**Option 1: Via API (Browser/curl)**
```bash
# View all messages (if password protected, use ?password=your-password)
curl http://localhost:3000/api/messages

# Or open in browser:
http://localhost:3000/api/messages?password=your-password
```

**Option 2: Via Script**
```bash
node view-messages.js
```

**Option 3: Direct API Call**
```javascript
fetch('http://localhost:3000/api/messages?password=your-password')
  .then(r => r.json())
  .then(data => console.log(data.messages));
```

## Email Configuration (Optional)

To receive email notifications when someone submits the contact form:

1. **Gmail Setup:**
   - Enable 2-Step Verification
   - Generate App Password: https://support.google.com/accounts/answer/185833
   - Use the App Password in `.env`

2. **Update `.env`:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=your-email@gmail.com
   ```

If email is not configured, messages will still be saved to `messages.json`.

## Messages Storage

Messages are stored in `server/messages.json` in this format:
```json
[
  {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!",
    "subject": null,
    "timestamp": "2024-01-01T12:00:00.000Z",
    "read": false
  }
]
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/portfolio` - Portfolio data
- `POST /api/contact` - Submit contact form
- `GET /api/messages` - Get all messages (optional password protected)
- `PUT /api/messages/:id/read` - Mark message as read

## Security

- Set `MESSAGES_PASSWORD` in `.env` to password-protect the messages endpoint
- Messages are stored locally in JSON file
- Email notifications are optional

