# Docker Deployment Instructions

This document explains how to share and run the Maximo Edge Intelligence presentation using Docker.

## Docker Image Information

- **Image Name**: `maximo-edge-presentation:latest`
- **Built**: October 2025 for MaximoLive 2025
- **Base**: nginx:alpine (lightweight production web server)
- **Port**: 80 (default HTTP)

## Option 1: Share Docker Image as TAR file

### On Your Computer (Exporting)

1. **Save the Docker image to a TAR file:**
   ```bash
   cd /Users/sasreliability/Documents/Repos/presentations/maximoLive2025
   docker save -o maximo-edge-presentation.tar maximo-edge-presentation:latest
   ```

2. **Transfer the TAR file** to the other computer via:
   - USB drive
   - Cloud storage (Google Drive, Dropbox, etc.)
   - Network transfer (scp, rsync, etc.)

   The TAR file will be approximately 30-40 MB.

### On the Other Computer (Importing)

1. **Verify the TAR file exists and navigate to its directory:**
   ```bash
   # Navigate to where you saved the TAR file (adjust path as needed)
   cd ~/Downloads
   # OR
   cd /path/to/where/you/saved/the/file

   # Verify the file exists and check its size
   ls -lh maximo-edge-presentation.tar
   ```

   The file should be approximately 30-40 MB in size.

2. **Load the Docker image (use full or relative path):**
   ```bash
   # If you're in the same directory as the TAR file:
   sudo docker load -i maximo-edge-presentation.tar

   # OR use absolute path:
   sudo docker load -i /full/path/to/maximo-edge-presentation.tar

   # Example with absolute path:
   sudo docker load -i ~/Downloads/maximo-edge-presentation.tar
   ```

3. **Verify the image loaded successfully:**
   ```bash
   sudo docker images | grep maximo
   ```

   You should see `maximo-edge-presentation` in the list.

4. **Run the container:**
   ```bash
   sudo docker run -d -p 8080:80 --name maximo-presentation maximo-edge-presentation:latest
   ```

5. **Access the presentation:**
   - Open browser to: `http://localhost:8080`
   - Or from another device on the network: `http://<computer-ip>:8080`

## Option 2: Push to Docker Hub (for easy sharing)

### On Your Computer

1. **Tag the image for Docker Hub:**
   ```bash
   docker tag maximo-edge-presentation:latest <your-dockerhub-username>/maximo-edge-presentation:latest
   ```

2. **Login to Docker Hub:**
   ```bash
   docker login
   ```

3. **Push the image:**
   ```bash
   docker push <your-dockerhub-username>/maximo-edge-presentation:latest
   ```

### On the Other Computer

1. **Pull the image:**
   ```bash
   docker pull <your-dockerhub-username>/maximo-edge-presentation:latest
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 8080:80 --name maximo-presentation <your-dockerhub-username>/maximo-edge-presentation:latest
   ```

3. **Access**: `http://localhost:8080`

## Running the Container

### Basic Usage

```bash
# Run on port 8080
docker run -d -p 8080:80 --name maximo-presentation maximo-edge-presentation:latest

# Run on port 80 (requires admin/sudo on some systems)
docker run -d -p 80:80 --name maximo-presentation maximo-edge-presentation:latest

# Run on a custom port (e.g., 3000)
docker run -d -p 3000:80 --name maximo-presentation maximo-edge-presentation:latest
```

### Useful Commands

```bash
# View running containers
docker ps

# View container logs
docker logs maximo-presentation

# Stop the container
docker stop maximo-presentation

# Start the container again
docker start maximo-presentation

# Remove the container
docker rm maximo-presentation

# Remove the container (force, even if running)
docker rm -f maximo-presentation
```

## Accessing from Other Devices

If you want to access the presentation from other devices on the same network:

1. **Find your computer's IP address:**
   - Mac/Linux: `ifconfig | grep inet`
   - Windows: `ipconfig`

2. **Run container with host binding:**
   ```bash
   docker run -d -p 0.0.0.0:8080:80 --name maximo-presentation maximo-edge-presentation:latest
   ```

3. **Access from other devices:**
   - Use `http://<your-computer-ip>:8080`
   - Example: `http://192.168.1.100:8080`

## Presentation Features

- **20 slides** covering Edge AI for Maximo
- **Keyboard navigation**: Arrow keys, Space, Enter
- **Click navigation**: Click anywhere to advance
- **Direct slide access**: Add `#<slide-number>` to URL (e.g., `#20` for the CTA slide)
- **Responsive design**: Works on desktop, tablet, and mobile
- **Offline ready**: All assets embedded, no internet required (except Google Fonts)

## Troubleshooting

### Permission Denied Error (Unix Socket)

If you see "permission denied while trying to connect to unix socket", try these solutions:

**Option 1 - Run with sudo (Quick Fix):**

```bash
sudo docker load -i maximo-edge-presentation.tar
sudo docker run -d -p 8080:80 --name maximo-presentation maximo-edge-presentation:latest
```

**Option 2 - Add User to Docker Group (Permanent Fix - Linux/Mac):**

```bash
# Add your user to the docker group
sudo usermod -aG docker $USER

# Log out and log back in, or run:
newgrp docker

# Now you can run docker commands without sudo
docker load -i maximo-edge-presentation.tar
```

**Option 3 - Start Docker Desktop (Mac/Windows):**

1. Make sure Docker Desktop is running
2. Check the Docker icon in system tray/menu bar
3. Wait for Docker to fully start (icon should be solid, not animated)
4. Try the command again

**Option 4 - Restart Docker Service (Linux):**

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### Port Already in Use

If port 8080 is already in use, choose a different port:

```bash
docker run -d -p 9090:80 --name maximo-presentation maximo-edge-presentation:latest
```

### Container Won't Start

Check logs for errors:

```bash
docker logs maximo-presentation
```

### Can't Access from Network

- Ensure firewall allows the port
- Use `0.0.0.0:8080:80` binding instead of just `8080:80`
- Check that you're using the correct IP address

### "No Such File or Directory" Error

If you see an error like `var/lib/docker/tmp/docker-import... no such file or directory`:

1. **Check you're in the correct directory:**
   ```bash
   pwd                                    # Show current directory
   ls -lh maximo-edge-presentation.tar   # Verify file exists
   ```

2. **Use absolute path to the TAR file:**
   ```bash
   # Find the full path
   realpath maximo-edge-presentation.tar

   # Then use it with docker load
   sudo docker load -i /full/path/shown/above/maximo-edge-presentation.tar
   ```

3. **Check file integrity (ensure it wasn't corrupted during transfer):**
   ```bash
   # File should be 30-40 MB
   du -h maximo-edge-presentation.tar

   # Check if it's a valid tar file
   tar -tzf maximo-edge-presentation.tar | head
   ```

4. **If file seems corrupted, re-export from source computer:**
   ```bash
   # On source computer
   docker save -o maximo-edge-presentation.tar maximo-edge-presentation:latest

   # Verify the export
   ls -lh maximo-edge-presentation.tar
   ```

### Docker Load Still Fails - Alternative Method

If `docker load` continues to fail, try importing with stdin redirection:

```bash
# Method 1: Using stdin redirection
sudo docker load < maximo-edge-presentation.tar

# Method 2: Using cat
cat maximo-edge-presentation.tar | sudo docker load

# Method 3: Gunzip (if file is compressed)
gunzip -c maximo-edge-presentation.tar.gz | sudo docker load
```

Or check Docker daemon status:

```bash
# Check if Docker daemon is running
sudo systemctl status docker

# Check Docker info
sudo docker info

# Check available disk space
df -h /var/lib/docker
```

### Docker Not Installed

1. Install Docker Desktop from: <https://www.docker.com/products/docker-desktop/>
2. Start Docker Desktop
3. Run the commands above

## System Requirements

- **Docker**: Version 20.10 or newer
- **RAM**: Minimum 512 MB available
- **Disk Space**: ~50 MB for the image
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

## Production Notes

- The presentation runs entirely in the browser (client-side)
- No server-side processing or data collection
- All images and assets are pre-built into the container
- Uses nginx for fast, reliable static file serving
- Container is read-only and stateless
