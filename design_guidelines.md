# Design Guidelines: MacMoment Portfolio

## Design Approach: Reference-Based (Portfolio Excellence)
Drawing inspiration from award-winning developer portfolios (Bruno Simon, Lynn Fisher) combined with Linear's typography precision and Stripe's sophisticated color usage. This portfolio demands a bold, technically impressive presentation that showcases both plugin mastery and web development skills through the design itself.

## Core Design Philosophy
**"Code as Art"** - The portfolio itself becomes the primary showcase, demonstrating technical prowess through visual execution. Dark, cyberpunk-inspired aesthetic with neon accents creates a premium, developer-focused experience.

## Color Palette

### Dark Mode Foundation (Primary)
- **Background Deep**: 218 25% 8% (rich navy-black)
- **Background Elevated**: 218 20% 12% (cards, sections)
- **Background Accent**: 218 15% 16% (hover states)

### Neon Accent System
- **Primary Neon**: 177 100% 55% (electric cyan - main CTAs, highlights)
- **Secondary Neon**: 280 85% 65% (vibrant purple - secondary accents)
- **Success Metric**: 142 76% 55% (neon green - stats, achievements)

### Text Hierarchy
- **Primary Text**: 0 0% 98% (near white)
- **Secondary Text**: 218 15% 70% (muted cyan-gray)
- **Tertiary Text**: 218 10% 50% (subdued gray)

## Typography

### Font Stack
- **Display/Headings**: 'Space Grotesk' (bold, modern, technical feel)
- **Body/UI**: 'Inter' (clean readability)
- **Code/Tech**: 'JetBrains Mono' (tech stack badges, metrics)

### Type Scale
- **Hero Title**: text-6xl lg:text-8xl font-bold (massive impact)
- **Section Headers**: text-4xl lg:text-5xl font-bold
- **Project Titles**: text-2xl lg:text-3xl font-semibold
- **Body**: text-base lg:text-lg
- **Captions/Labels**: text-sm

## Layout System

### Spacing Primitives
Core units: **4, 8, 12, 16, 24** (as in p-4, gap-8, space-y-12, py-16, mt-24)
- Tight spacing: 4 (component internals)
- Standard: 8-12 (between elements)
- Section breathing room: 16-24 (section padding)

### Container Strategy
- **Max Width**: max-w-7xl (main content container)
- **Section Padding**: px-6 py-24 lg:px-8 lg:py-32
- **Project Cards**: Grid system with 1-2-3 column progression

## Component Library

### Hero Section (Full Viewport Impact)
- Animated gradient mesh background (subtle, moving)
- Large typography introduction with typing animation effect
- "Plugin Expert & Web Developer" tagline with neon underline
- Floating geometric shapes (subtle parallax on scroll)
- Scroll indicator with smooth animation

### Project Showcase Cards
- **Card Design**: Dark glass-morphism effect (backdrop-blur with border)
- **Layout**: Asymmetric grid layout (featured project larger)
- **Hover Effect**: Lift animation (translate-y) with neon border glow
- **Content Structure**:
  - Project name with animated neon accent bar
  - Brief description (2-3 lines)
  - Tech stack pills/badges with hover tooltips
  - Key metrics display (accuracy, performance, stats)
  - "View Details" CTA with arrow animation

### Metrics Display
- Animated counter on scroll-into-view
- Large numeric display with neon color coding
- Supporting label below in muted text
- Glow effect around exceptional numbers

### Skills Matrix
- Technology grid with animated icon reveals
- Primary skills (Java, JDA, SQL) prominently sized
- Secondary skills scaled smaller
- Hover states show proficiency level with progress bars

### Contact Section
- Clean, centered layout with dark card container
- Email with copy-to-clipboard functionality (visual feedback)
- Discord handle with animated hover state
- Social connection emphasis without external links yet

## Animation Strategy

### Scroll-Triggered Animations
- **Fade-in + Slide-up**: Projects entering viewport (stagger by 100ms)
- **Counter Animation**: Metrics animating from 0 to value
- **Progress Bars**: Skills filling on reveal
- **Parallax**: Background elements moving at different speeds

### Micro-interactions
- **Button Hover**: Neon glow expansion, slight scale (1.02)
- **Card Hover**: Lift effect (-translate-y-2), border glow intensifies
- **Tech Badges**: Scale pulse on hover with color shift
- **Navigation**: Smooth scroll with easing, active link underline slide

### Hero Animations
- **On Load**: Text reveal with stagger (word by word)
- **Gradient Movement**: Subtle animated gradient background
- **Geometric Shapes**: Floating elements with gentle rotation and movement
- **Mouse Parallax**: Hero elements respond to cursor position (subtle)

## Special Portfolio Project Presentation

### Self-Referential Showcase
The portfolio itself featured as third project with:
- "This Portfolio" as project name
- Meta description: "Showcasing development skills through implementation"
- Tech stack: HTML, CSS, JavaScript, Tailwind, Animation Libraries
- Metrics: Load Time, Animation FPS, Responsiveness Score
- Emphasis on "Built from Scratch" badge

## Navigation & Structure

### Single-Page Navigation
- Fixed header with blur background on scroll
- Smooth anchor links: Home, Projects, Skills, Contact
- Active section indicator in navigation
- Scroll progress bar at top (thin neon line)

### Section Flow
1. **Hero** (100vh) - Immediate impact
2. **Featured Projects** (py-24) - MacAC and MacRefunds prominently
3. **All Projects Grid** (py-24) - Including portfolio project
4. **Skills Showcase** (py-24) - Plugin expertise highlighted
5. **Contact** (py-32) - Clean, accessible CTA

## Responsive Breakpoints
- Mobile: Single column, reduced animation complexity
- Tablet (md:): 2-column project grid
- Desktop (lg:): 3-column grid, full animation suite
- Large (xl:): Maximum visual impact with spacing

## Images
**No large hero image** - Hero uses animated gradient mesh background with geometric shapes for technical aesthetic. Project cards use icon-based representations or abstract technical visualizations rather than screenshots, maintaining the sleek, code-focused design language.