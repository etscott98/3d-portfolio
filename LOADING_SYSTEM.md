# Asset Loading System

## Problem Solved

Previously, the loading screen would disappear after a fixed 800ms timeout, but the 3D model and other assets might not have finished loading yet. This caused:
- Glitchy appearance when model pops in after loading screen
- Layout shifts and visual artifacts
- Poor user experience
- Potential performance issues

## Solution

Implemented a comprehensive asset loading system that:
1. Tracks all critical assets (3D model, textures, etc.)
2. Shows real-time loading progress
3. Waits for all assets before hiding the loading screen
4. Provides smooth transitions

---

## Architecture

### 1. Loading Context (`lib/hooks/useAssetLoader.tsx`)

**Purpose:** Global state management for asset loading

**Features:**
- Tracks which assets have loaded
- Calculates loading progress (0-100%)
- Provides loading status to all components
- Uses React Context for simple, dependency-free implementation

**API:**
```typescript
const { isLoading, progress, setAssetLoaded, setTotalAssets } = useAssetLoader();

// Report an asset as loaded
setAssetLoaded('robot-girl-model');

// Set total number of assets (optional, defaults to 1)
setTotalAssets(3);
```

---

### 2. Loading Screen (`components/shared/LoadingScreen.tsx`)

**Purpose:** Visual loading indicator that waits for assets

**Features:**
- **Progress Bar:** Smooth animated bar showing 0-100%
- **Percentage Display:** Shows exact loading percentage
- **Minimum Display Time:** Ensures screen shows for at least 1 second (prevents flash)
- **Smooth Exit:** 500ms fade-out animation when complete
- **Professional Design:** Matches portfolio aesthetic with lime green accents

**Logic:**
```
Loading screen hides when:
  1. All assets are loaded (isLoading === false)
  AND
  2. Minimum time has elapsed (1 second)
```

**Visual Elements:**
- Large "ERIN SCOTT" text
- Animated progress bar with gradient
- Loading percentage text
- Pulsing indicator dot

---

### 3. Asset Reporting (`components/3d/RobotGirl.tsx`)

**Purpose:** 3D model reports when it's loaded

**Implementation:**
```typescript
const { setAssetLoaded } = useAssetLoader();
const [isModelReady, setIsModelReady] = useState(false);

useEffect(() => {
  if (scene && !isModelReady) {
    setIsModelReady(true);
    setAssetLoaded('robot-girl-model');
    console.log('✅ Robot Girl model loaded');
  }
}, [scene, setAssetLoaded, isModelReady]);
```

**How it works:**
1. Component loads the GLTF model
2. When `scene` object is available, it reports to the loading system
3. Loading context updates progress
4. Loading screen responds to progress

---

### 4. Layout Integration

**Server Component (`app/layout.tsx`):**
- Maintains metadata (for SEO)
- Sets up font variables
- Delegates client-side logic to RootClientLayout

**Client Component (`components/shared/RootClientLayout.tsx`):**
- Wraps entire app in LoadingProvider
- Renders LoadingScreen at top level
- Provides loading context to all child components

---

## File Structure

```
portfolio-v3/
├── lib/
│   └── hooks/
│       └── useAssetLoader.tsx         # Loading context & hook
├── components/
│   ├── shared/
│   │   ├── LoadingScreen.tsx          # Visual loading indicator
│   │   └── RootClientLayout.tsx       # Client-side layout wrapper
│   └── 3d/
│       └── RobotGirl.tsx              # Reports when model loads
└── app/
    └── layout.tsx                      # Server-side layout
```

---

## Usage: Adding New Assets

To track additional assets:

### 1. Set Total Asset Count

In your component:
```typescript
const { setTotalAssets } = useAssetLoader();

useEffect(() => {
  setTotalAssets(3); // 1 for model + 2 for images
}, []);
```

### 2. Report Each Asset

When each asset loads:
```typescript
const { setAssetLoaded } = useAssetLoader();

// When image loads
onImageLoad={() => {
  setAssetLoaded('hero-image');
}}

// When font loads
document.fonts.ready.then(() => {
  setAssetLoaded('custom-font');
});

// When 3D texture loads
textureLoader.load('texture.jpg', (texture) => {
  setAssetLoaded('main-texture');
});
```

---

## Timeline

### Current Implementation (Default):
```
0ms     → Loading screen appears
100-2000ms → 3D model loads (varies by connection)
1000ms  → Minimum display time met
[when model ready] → Progress reaches 100%
+300ms  → Delay before exit animation
+500ms  → Loading screen fades out
+500ms  → Site fully interactive
```

**Total: ~2-3 seconds** (depending on asset load speed)

### What User Sees:
1. **Immediate:** Black screen with "ERIN SCOTT" text
2. **0-1s:** Progress bar fills to 0-50% (model loading)
3. **1-2s:** Progress bar reaches 100%
4. **2s:** "Ready" appears
5. **2.3s:** Smooth fade out begins
6. **2.8s:** Site revealed, fully loaded

---

## Performance Considerations

### Optimizations Built-in:
- ✅ Only tracks critical assets (3D model, not every texture)
- ✅ Minimum 1-second display prevents jarring flash
- ✅ GPU-accelerated animations (transform, opacity)
- ✅ Single global context (no prop drilling)
- ✅ Lazy evaluation (only re-renders when progress changes)

### Mobile-Specific:
- Progress bar scales appropriately
- Text sizes responsive
- Animations smooth on lower-end devices

---

## Debugging

### Console Messages:
```
✅ Robot Girl model loaded
```

### If Loading Never Completes:
1. Check console for errors
2. Verify model path: `/models/robot-girl/scene.gltf`
3. Ensure `setAssetLoaded()` is being called
4. Check network tab for failed asset loads

### Force Skip (for development):
Temporarily reduce minimum time in LoadingScreen.tsx:
```typescript
setTimeout(() => {
  setMinTimeElapsed(true);
}, 100); // Changed from 1000ms
```

---

## Benefits

### User Experience:
- ✅ No glitchy pop-ins
- ✅ Professional loading experience
- ✅ Real-time progress feedback
- ✅ Smooth transitions
- ✅ Prevents interaction with broken state

### Developer Experience:
- ✅ Easy to add new assets
- ✅ Simple API
- ✅ No external dependencies
- ✅ TypeScript support
- ✅ Clear console logging

### Performance:
- ✅ Blocks rendering until ready (prevents layout shifts)
- ✅ Preloads critical assets
- ✅ Prevents wasted render cycles
- ✅ Smooth 60fps animations

---

## Testing Checklist

- [ ] Loading screen appears immediately
- [ ] Progress bar animates smoothly
- [ ] Percentage updates as assets load
- [ ] Screen shows for minimum 1 second
- [ ] Smooth fade-out when complete
- [ ] 3D model appears fully loaded
- [ ] No glitches or pop-ins
- [ ] Works on slow connections (throttle network in DevTools)
- [ ] Works on mobile devices
- [ ] Animations are smooth

---

## Future Enhancements (Optional)

### Possible Additions:
1. **Multiple Asset Types:** Track images, fonts, etc.
2. **Asset Names Display:** Show "Loading model..." text
3. **Error Handling:** Retry failed assets
4. **Preload Strategy:** Load less critical assets after
5. **Caching:** Remember loaded assets for faster revisits

### Implementation Example:
```typescript
// Advanced: Track specific asset categories
const { setAssetLoaded } = useAssetLoader();

// Model
setAssetLoaded('3d-model');

// Textures
setAssetLoaded('texture-1');
setAssetLoaded('texture-2');

// Images
setAssetLoaded('hero-image');
setAssetLoaded('project-1');
```

---

## Summary

The new loading system ensures a professional, glitch-free experience by:
1. Tracking all critical assets
2. Showing real-time progress
3. Waiting for complete load before reveal
4. Providing smooth, polished transitions

**Result:** Users see a complete, ready-to-interact portfolio instead of a half-loaded, glitchy experience.

