# Quick Start Guide

## Running the Project

1. **Install dependencies** (if not already done)
```bash
cd /Users/kmalik/Documents/Dev/circadia/erin-portfolio/portfolio-v3
npm install
```

2. **Run the development server**
```bash
npm run dev
```

3. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Optional: Set Up AI Chat

If you want the AI chat functionality to work:

1. Create a `.env.local` file in the project root
2. Add your API keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=your_postgresql_connection_string
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
```

**Note**: The site works perfectly without these - the chat will just show a fallback message.

## What's Been Built

### Homepage
- ✅ 3D animated hero section with floating elements
- ✅ Interactive project showcase gallery (3D cards)
- ✅ About/philosophy section with animated cards
- ✅ Career timeline with scroll animations
- ✅ Tools & expertise grid
- ✅ AI chat interface (glassmorphic design)

### Case Study Pages
- ✅ Immersive 3D hero with parallax
- ✅ Scroll-triggered content animations
- ✅ Interactive image gallery with lightbox
- ✅ Impact stats with animations
- ✅ All existing projects migrated

### Features
- ✅ Smooth scroll (Lenis)
- ✅ 3D graphics (React Three Fiber)
- ✅ Advanced animations (GSAP + Framer Motion)
- ✅ Custom cursor
- ✅ Mobile-optimized (simplified 3D)
- ✅ Device rotation prompt
- ✅ Loading screen
- ✅ Animated navigation

## Project Structure

```
portfolio-v3/
├── app/                    # Next.js pages
│   ├── page.tsx           # Homepage
│   ├── case-study/[id]/   # Case studies
│   └── api/               # Chat APIs
├── components/
│   ├── 3d/                # 3D components
│   ├── home/              # Homepage sections
│   ├── case-study/        # Case study components
│   └── shared/            # Reusable components
└── lib/
    └── projectData.ts     # Edit to add/modify projects
```

## Adding New Projects

Edit `lib/projectData.ts`:

```typescript
export const projectData: Record<string, Project> = {
  'new-project-id': {
    title: 'Project Name',
    subtitle: 'Description',
    images: ['/assets/images/projects/...'],
    overviewTags: ['Tag 1', 'Tag 2'],
    tools: ['Figma', 'React'],
    impacts: [
      { value: '50%', label: 'Improvement', desc: 'Description' }
    ],
  },
};

// Add to display order
export const projectOrder = ['flologic', 'new-project-id', ...];
```

## Tech Stack

- **Framework**: Next.js 14 + TypeScript
- **3D**: React Three Fiber + Three.js
- **Animations**: GSAP + Framer Motion
- **Styling**: Tailwind CSS
- **Smooth Scroll**: Lenis
- **Icons**: Lucide React

## Build for Production

```bash
npm run build
npm start
```

## Deploy

Recommended: Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables (if using chat)
4. Deploy

---

**All features are production-ready!** 🚀

