# Docker Setup Guide

This project includes Docker and Docker Compose configurations for both development and production environments.

## Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)
- Docker version 20.10 or higher
- Docker Compose version 2.0 or higher

## Quick Start

### Production Build

Build and run the production containers:

```bash
docker-compose up -d
```

This will:
- Build the frontend (React/Vite) and serve it via Nginx on port 80
- Build and run the backend (Express) on port 3000
- Set up networking between services

Access the application:
- Frontend: http://localhost
- Backend API: http://localhost:3000
- Health Check: http://localhost/api/health

### Development Build

For development with hot-reload:

```bash
docker-compose -f docker-compose.dev.yml up
```

This will:
- Run the frontend dev server on port 5173
- Run the backend dev server on port 3000
- Enable hot-reload for both services

Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Commands

### Build images
```bash
# Production
docker-compose build

# Development
docker-compose -f docker-compose.dev.yml build
```

### Start services
```bash
# Production
docker-compose up -d

# Development
docker-compose -f docker-compose.dev.yml up
```

### Stop services
```bash
# Production
docker-compose down

# Development
docker-compose -f docker-compose.dev.yml down
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Rebuild after changes
```bash
# Production
docker-compose up -d --build

# Development
docker-compose -f docker-compose.dev.yml up --build
```

### Remove everything (including volumes)
```bash
docker-compose down -v
```

## Architecture

### Production Setup
- **Frontend**: Multi-stage build with Nginx
  - Stage 1: Build React app with Vite
  - Stage 2: Serve static files with Nginx
  - Nginx proxies `/api` requests to backend

- **Backend**: Express server
  - Runs on port 3000
  - Health check endpoint: `/api/health`

### Development Setup
- **Frontend**: Vite dev server with hot-reload
- **Backend**: Node.js with `--watch` flag for auto-reload
- Both services use volume mounts for live code updates

## Environment Variables

Create a `.env` file in the root directory for production:

```env
NODE_ENV=production
PORT=3000
```

For backend-specific variables, create `server/.env`:

```env
NODE_ENV=production
PORT=3000
```

## Troubleshooting

### Port already in use
If ports 80, 3000, or 5173 are already in use, modify the port mappings in `docker-compose.yml`:

```yaml
ports:
  - "8080:80"  # Change 80 to 8080
```

### Build fails
- Ensure Docker has enough resources (4GB RAM recommended)
- Clear Docker cache: `docker system prune -a`
- Rebuild without cache: `docker-compose build --no-cache`

### Container won't start
- Check logs: `docker-compose logs [service-name]`
- Verify Docker is running: `docker ps`
- Check container status: `docker-compose ps`

### Permission issues (Linux)
If you encounter permission issues, you may need to run with sudo or add your user to the docker group:

```bash
sudo usermod -aG docker $USER
# Then log out and log back in
```

## Production Deployment

For production deployment:

1. Build the images:
   ```bash
   docker-compose build
   ```

2. Tag and push to a registry (optional):
   ```bash
   docker tag portfolio-frontend:latest your-registry/portfolio-frontend:latest
   docker tag portfolio-backend:latest your-registry/portfolio-backend:latest
   docker push your-registry/portfolio-frontend:latest
   docker push your-registry/portfolio-backend:latest
   ```

3. Deploy on your server:
   ```bash
   docker-compose up -d
   ```

## Health Checks

The backend includes a health check endpoint:
- URL: `http://localhost:3000/api/health`
- Response: `{"status":"ok","message":"Server is running"}`

Check container health:
```bash
docker-compose ps
```

## Network

Both services are connected via a Docker bridge network (`portfolio-network`), allowing them to communicate using service names:
- Frontend can reach backend at: `http://backend:3000`
- Backend can reach frontend at: `http://frontend:80`

