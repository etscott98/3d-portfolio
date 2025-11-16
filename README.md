# Erin Scott Portfolio v3 - 3D Interactive Experience

A modern, immersive portfolio website featuring 3D graphics, advanced animations, and AI-powered chat, inspired by cutting-edge web experiences like Lando Norris's website.

## Features

### 🎨 Design & UX
- **3D Interactive Elements**: Complex 3D models and floating elements using React Three Fiber
- **Glassmorphism UI**: Modern frosted glass aesthetic throughout
- **Smooth Scrolling**: Lenis-powered buttery smooth scroll experience
- **Custom Cursor**: Interactive custom cursor with hover effects
- **Parallax Effects**: Multi-layer parallax animations for depth
- **GSAP Animations**: Professional scroll-triggered animations

### 🚀 Technical Highlights
- **Next.js 14**: Latest App Router with Server Components
- **TypeScript**: Fully typed for better DX and reliability
- **React Three Fiber**: 3D graphics powered by Three.js
- **Framer Motion**: Smooth UI animations and transitions
- **Tailwind CSS**: Utility-first styling with custom design system

### 💬 AI Chat Integration
- **RAG-powered Chatbot**: AI assistant with knowledge about Erin's work
- **Gemini API**: Powered by Google's Gemini 2.0 Flash
- **Supabase Integration**: Chat history and session management
- **Vector Search**: PostgreSQL with pgvector for semantic search

### 📱 Mobile Experience
- **Responsive Design**: Optimized for all screen sizes
- **Simplified 3D**: Performance-optimized mobile experience
- **Device Rotation Prompt**: User-friendly orientation guidance
- **Touch Gestures**: Mobile-optimized interactions

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database with pgvector extension (optional, for chat)
- Supabase account (optional, for chat history)
- Gemini API key (optional, for AI chat)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio-v3
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
# Required for AI chat functionality
GEMINI_API_KEY=your_gemini_api_key

# Required for chat persistence
DATABASE_URL=postgresql://user:password@host:port/database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open the application**
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
portfolio-v3/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── chat/                 # AI chat endpoint
│   │   └── chat-history/         # Chat history endpoint
│   ├── case-study/[id]/          # Dynamic case study pages
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/
│   ├── 3d/                       # 3D components
│   │   ├── Scene3D.tsx           # Main 3D canvas
│   │   ├── FloatingElements.tsx  # Animated 3D objects
│   │   └── ProjectModel.tsx      # 3D project displays
│   ├── home/                     # Homepage sections
│   │   ├── HeroSection.tsx       # 3D hero with parallax
│   │   ├── ProjectShowcase.tsx   # 3D project gallery
│   │   ├── AboutSection.tsx      # Philosophy section
│   │   ├── TimelineSection.tsx   # Career timeline
│   │   ├── ToolsSection.tsx      # Skills and tools
│   │   └── ChatInterface.tsx     # AI chat widget
│   ├── case-study/               # Case study components
│   │   ├── CaseStudyHero3D.tsx   # Immersive hero
│   │   ├── ParallaxContent.tsx   # Scroll animations
│   │   └── InteractiveGallery.tsx# Image lightbox
│   └── shared/                   # Shared components
│       ├── Navigation.tsx        # Animated nav
│       ├── SmoothScroll.tsx      # Lenis wrapper
│       ├── LoadingScreen.tsx     # Loading animation
│       ├── CustomCursor.tsx      # Custom cursor
│       └── DeviceRotationPrompt.tsx
├── lib/
│   ├── projectData.ts            # Portfolio projects data
│   ├── animations.ts             # GSAP configurations
│   ├── ai.ts                     # AI/RAG utilities
│   ├── db.ts                     # Database connection
│   └── hooks/
│       └── useIsMobile.ts        # Mobile detection hook
└── public/
    └── assets/                   # Images and media
```

## Key Technologies

### Core
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework

### 3D & Animation
- **React Three Fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers for R3F
- **Three.js**: 3D graphics library
- **GSAP**: Professional-grade animation
- **Framer Motion**: React animation library
- **Lenis**: Smooth scroll library

### AI & Data
- **Gemini API**: Google's AI model
- **PostgreSQL**: Database with pgvector
- **Supabase**: Backend as a service

### UI Components
- **Lucide React**: Beautiful icon set
- **Next/Image**: Optimized image loading

## Performance Optimizations

- **Dynamic Imports**: Lazy loading for heavy components
- **Image Optimization**: Next.js Image with AVIF/WebP
- **Code Splitting**: Automatic route-based splitting
- **Mobile Simplification**: Reduced 3D complexity on mobile
- **GPU Acceleration**: Transform/opacity animations
- **React Suspense**: Progressive loading experience

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Projects

Edit `lib/projectData.ts` to add new case studies:

```typescript
export const projectData: Record<string, Project> = {
  'project-id': {
    title: 'Project Title',
    subtitle: 'Project Description',
    images: ['/assets/images/projects/...'],
    overviewTags: ['Tag 1', 'Tag 2'],
    tools: ['Tool 1', 'Tool 2'],
    contentBlocks: [...],
    impacts: [...],
  },
};
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Build the project and deploy the `.next` folder:

```bash
npm run build
```

## License

© 2025 Erin Scott. All rights reserved.

## Contact

- Email: lunarspired@gmail.com
- LinkedIn: [Erin Scott](https://linkedin.com/in/erinscott)
- Portfolio: [Live Site](https://your-domain.com)

---

Built with ❤️ using Next.js, React Three Fiber, and modern web technologies.
# 3d-portfolio
