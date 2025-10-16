#!/bin/bash

# Build the project for GitHub Pages deployment
echo "Building project for GitHub Pages..."

# Build with relative base path for GitHub Pages
# This ensures assets load correctly on project pages (username.github.io/repo-name/)
npx vite build --base=./

# Create docs directory if it doesn't exist
mkdir -p docs

# Copy built files from dist/public to docs/
echo "Copying built files to docs/ folder..."
cp -r dist/public/* docs/

# Create .nojekyll file to prevent GitHub Pages from using Jekyll
echo "Creating .nojekyll file..."
touch docs/.nojekyll

# Create 404.html for client-side routing support with hash routing
echo "Creating 404.html for SPA routing..."
cat > docs/404.html << 'EOF'
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // Simple redirect for single-page portfolio
      // This portfolio only has one route (/) so all 404s go there
      window.location.replace('./index.html#/');
    </script>
  </head>
  <body>
    <p>Redirecting to portfolio...</p>
  </body>
</html>
EOF

# Add redirect handler to index.html if needed
echo "Build complete! Your site is ready in the docs/ folder."
echo ""
echo "To deploy to GitHub Pages:"
echo "1. Push this repository to GitHub"
echo "2. Go to Settings > Pages"
echo "3. Under 'Source', select 'Deploy from a branch'"
echo "4. Under 'Branch', select 'main' and '/docs' folder"
echo "5. Click Save"
echo ""
echo "Your site will be live at: https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/#/"
