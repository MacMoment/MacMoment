# MacMoment Portfolio

A stunning, dark-themed portfolio website showcasing plugin development expertise and web development projects.

## Features

- **Dark Cyberpunk Theme**: Premium dark design with neon cyan and purple accents
- **Smooth Animations**: Parallax effects, scroll-triggered reveals, and micro-interactions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Project Showcase**: Featuring MacAC, MacRefunds, and the portfolio itself
- **Skills Matrix**: Comprehensive display of technical expertise
- **Contact Section**: Easy ways to connect via email or Discord

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **UI Components**: Radix UI primitives, shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Backend**: Express.js (for serving static files)

## Quick Start

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5000`

## Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist` directory.

## Deployment

### GitHub Pages (Recommended)

This project is pre-configured for instant GitHub Pages deployment. The `docs/` folder contains a production-ready build.

**Quick Deploy:**

1. Create a new repository on GitHub (or use an existing one)

2. Push this code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to your repository on GitHub
   - Click **Settings** > **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Under **Branch**, select **main** and **/docs** folder
   - Click **Save**

4. Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

**Rebuilding for GitHub Pages:**

If you make changes and need to rebuild:

```bash
./build-github.sh
```

This script builds the project with relative asset paths (required for GitHub Pages) and regenerates the `docs/` folder. Then commit and push:

```bash
git add docs/
git commit -m "Update build"
git push
```

**Note:** The build script uses `--base=./` to create relative asset paths, ensuring your portfolio works correctly on GitHub Pages project URLs (`username.github.io/repo-name/`).

### Vercel / Netlify

Simply connect your GitHub repository to Vercel or Netlify, and they will automatically detect the Vite configuration and deploy your site.

### Manual Deployment

1. Run the build script: `./build-github.sh`
2. Upload the contents of the `docs/` folder to your web server
3. Configure your server to serve the `index.html` file for all routes

## Project Structure

```
portfolio/
├── client/               # Frontend code
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── lib/         # Utility functions
│   │   └── App.tsx      # Main app component
│   └── index.html       # HTML entry point
├── server/              # Backend code
│   ├── routes.ts        # API routes
│   └── index.ts         # Server entry point
├── shared/              # Shared types and schemas
└── package.json         # Dependencies

```

## Customization

### Changing Colors

Edit the color variables in `client/src/index.css`:

```css
.dark {
  --background: 218 25% 8%;
  --primary: 177 100% 55%;
  --chart-2: 280 85% 65%;
  /* ... other colors */
}
```

### Adding Projects

Edit the `projects` array in `client/src/pages/portfolio.tsx`:

```typescript
const projects: Project[] = [
  {
    id: "project-id",
    title: "Project Name",
    subtitle: "Project Tagline",
    description: "Detailed description...",
    techStack: ["Tech1", "Tech2"],
    metrics: [
      { label: "Metric", value: "Value", color: "text-chart-3" }
    ],
    featured: true
  }
];
```

### Modifying Skills

Edit the `skills` array in `client/src/pages/portfolio.tsx`:

```typescript
const skills: Skill[] = [
  { name: "Skill Name", category: "plugin", proficiency: 95 }
];
```

## Contact

- **Email**: macmomentsp@icloud.com
- **Discord**: @MacMoment

## License

This project is open source and available under the MIT License.

---

Built with ❤️ by MacMoment
