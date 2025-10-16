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

### GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to GitHub Pages

### Vercel / Netlify

Simply connect your GitHub repository to Vercel or Netlify, and they will automatically detect the Vite configuration and deploy your site.

### Manual Deployment

1. Build the project
2. Upload the contents of the `dist` folder to your web server
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
