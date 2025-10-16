# MacMoment Portfolio

## Overview
A professional, dark-themed portfolio website showcasing plugin development expertise and web development projects. Built with React, TypeScript, and Tailwind CSS with smooth animations and modern design.

## Project Purpose
This portfolio serves as a comprehensive showcase of MacMoment's technical expertise, featuring:
- Advanced anti-cheat systems (MacAC)
- Discord integration plugins (MacRefunds)
- Modern web development capabilities (this portfolio)

## Recent Changes
- **2025-10-16**: GitHub Pages deployment configuration
  - Configured hash-based routing (wouter useHashLocation) for GitHub Pages compatibility
  - Created build-github.sh script for one-command deployment builds
  - Set up docs/ folder with .nojekyll and 404.html for proper SPA routing
  - Configured relative asset paths (--base=./) for GitHub Pages project URLs
  - Portfolio now works seamlessly at username.github.io/repo-name/#/

- **2025-10-16**: Initial portfolio creation with dark cyberpunk theme
  - Configured custom design tokens with neon cyan/purple accents
  - Built Hero section with animated gradient background
  - Created Projects showcase with interactive cards
  - Implemented Skills matrix with proficiency bars
  - Added Contact section with email/Discord integration
  - Configured smooth scroll navigation and animations

## Architecture
- **Frontend**: React SPA with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui (Radix primitives)
- **Routing**: Wouter with hash-based routing (GitHub Pages compatible)
- **Animations**: CSS animations with custom keyframes
- **Backend**: Express.js for serving static files (development only)
- **Deployment**: Static build in docs/ folder for GitHub Pages

## Key Features
1. **Smooth Scroll Navigation**: Single-page app with anchor-based navigation
2. **Dark Theme**: Premium dark design with neon accents (always dark mode)
3. **Animations**: Parallax effects, scroll reveals, hover interactions
4. **Responsive**: Fully responsive across all device sizes
5. **Performance**: Optimized loading and smooth 60fps animations

## Project Structure
```
/client              - Frontend React application
  /src
    /pages          - Portfolio page component
    /components     - Reusable UI components (shadcn)
    /lib            - Utility functions
/server             - Express backend for static serving
/shared             - TypeScript types and schemas
```

## Development
- Run `npm run dev` to start development server
- Portfolio accessible at http://localhost:5000
- Hot reload enabled for rapid development

## Design System
- **Primary Color**: Electric Cyan (hsl(177 100% 55%))
- **Secondary Color**: Vibrant Purple (hsl(280 85% 65%))
- **Success/Metrics**: Neon Green (hsl(142 76% 55%))
- **Background**: Deep Navy Black (hsl(218 25% 8%))
- **Typography**: Space Grotesk (display), Inter (body), JetBrains Mono (code)

## Contact Information
- Email: macmomentsp@icloud.com
- Discord: @MacMoment

## Deployment

### GitHub Pages (Configured)
The portfolio is pre-configured for instant GitHub Pages deployment:
- Run `./build-github.sh` to build for GitHub Pages
- Built files are output to `docs/` folder
- Uses hash-based routing (/#/) for compatibility
- Includes .nojekyll and 404.html for SPA support

**Quick Deploy:**
1. Push to GitHub
2. Enable GitHub Pages: Settings → Pages → Deploy from main branch /docs folder
3. Site will be live at: `https://USERNAME.github.io/REPO-NAME/#/`

### Other Platforms
- **Vercel/Netlify**: Auto-detects Vite config
- **Manual**: Build with `npm run build` and deploy `dist/` folder
