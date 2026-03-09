# Atomity — Frontend Engineering Challenge

## Live Demo

Netlify Deployment:
**https://your-vercel-link.vercel.app**

GitHub Repository:
**https://github.com/your-username/your-repo**

---

## About
---

# Feature Chosen

**Option B (0:45–0:55)** — Cloud Optimization Metrics Dashboard

I chose Option B because it presented a richer opportunity for animation craft — multiple data points, real-time feel, and scroll-triggered staggered reveals. A metrics dashboard also maps naturally to what Atomity does as a cloud optimization platform, making the UI feel contextually grounded rather than decorative.

Rather than building a standard table or static card grid, I interpreted this section as a **live intelligence panel** — something that feels like it's actually pulling and presenting infrastructure data in real time.

---

# Approach to Animation

Animations are handled entirely with **Framer Motion**.

Key decisions:

### Scroll-triggered stagger

Cards animate in with a `staggerChildren: 0.12s` delay as the grid enters the viewport.
`whileInView` with `once: true` ensures animations fire once and do not repeat unnecessarily.

### Spring physics on cards

Card entrance uses:

```
type: "spring"
stiffness: 80
damping: 18
```

This gives the motion a natural and responsive feel rather than robotic easing.

### CountUp on viewport entry

Numbers animate from `0 → value` only when the card becomes visible using `useInView`.
This helps the metrics feel **live and reactive** rather than static.

### Hover feedback

Each card uses subtle hover feedback:

* `scale: 1.03`
* blue-tinted shadow highlight

The interaction is intentionally restrained to keep the interface professional.

### Reduced motion support

The project respects `prefers-reduced-motion`.
Users who prefer reduced motion will see instant rendering without animations.

### Skeleton loading

While the API request is in progress, **6 animated skeleton cards** are rendered.
This prevents layout shift and communicates loading state clearly.

---

# Token & Style Architecture

Design tokens are separated into **two layers**.

## CSS Variables (`index.css`)

Actual color values are defined in CSS variables:

```css
:root {
  --color-bg-primary: #0a0e1a;
  --color-accent-primary: #3b82f6;
  --color-accent-success: #22c55e;
}
```

## Token Mapping (`src/tokens/tokens.js`)

JavaScript references to those CSS variables:

```javascript
export const tokens = {
  colors: {
    bgPrimary: "var(--color-bg-primary)",
    accentPrimary: "var(--color-accent-primary)"
  }
}
```

Components import the token object and never reference raw hex values.

This allows **global theme changes by editing a single CSS file**.

---

# Modern CSS Techniques Used

The project intentionally uses modern CSS features:

* `clamp()` → fluid typography and spacing
* logical properties → `margin-inline`, `margin-block`
* `color-mix()` → dynamic badge background tinting
* container queries via `containerType: inline-size`
* responsive grid with `auto-fit + minmax`

These choices allow the UI to scale smoothly across devices.

---

# Data Fetching & Caching

**API used:**
https://dummyjson.com/products?limit=6

Since the API does not provide cloud infrastructure metrics, product data is **transformed into simulated cloud metrics**.

Example mapping:

```javascript
const METRIC_MAP = [
  { title: "Cost Saved", unit: "%", trend: "up" },
  { title: "Uptime", unit: "%", trend: "up" }
]
```

Fields such as:

* `price`
* `stock`
* `rating`
* `discountPercentage`

are converted into realistic cloud-like metrics.

This demonstrates how the component would behave with a real production API.

---

# Caching Strategy

Data fetching is handled with **TanStack Query (React Query)**.

Configuration:

```
staleTime: 1000 * 60 * 5
retry: 2
```

Benefits:

* prevents unnecessary re-fetching
* caches results for faster navigation
* provides built-in loading and error states

States handled:

* `isLoading` → skeleton UI
* `error` → error fallback
* `data` → animated metric cards

---

# Libraries Used

| Library        | Purpose                        |
| -------------- | ------------------------------ |
| React + Vite   | Modern development environment |
| Framer Motion  | Declarative animation system   |
| TanStack Query | Data fetching + caching        |
| react-countup  | Animated numeric values        |

No UI component libraries were used.
All UI elements were built from scratch.

---

# Component Structure

```
src/
  tokens/
    tokens.js
  components/
    Navbar.jsx
    FeatureSection.jsx
    MetricCard.jsx
  hooks/
    useApiData.js
  App.jsx
  main.jsx
index.css
```

---

# Running Locally

Clone the repository:

```
git clone https://github.com/your-username/repository-name
```

Install dependencies:

```
npm install
```

Run development server:

```
npm run dev
```

Then open:

```
http://localhost:5173
```

---

# Tradeoffs & Decisions

### JavaScript over TypeScript

Started in JavaScript for faster iteration.
TypeScript would add stronger prop safety and would be added in a production version.

### Inline styling with tokens

Inline styles make the token architecture explicit and easy to audit.

### DummyJSON data transformation

The metrics are simulated but demonstrate how the component would behave with real backend data.

### Dark mode toggle

The architecture supports it via CSS variables but it was intentionally skipped to focus on animation polish.

---

# What I Would Improve With More Time

* Convert the codebase to TypeScript
* Add sparkline trend charts inside each card
* Implement real-time auto refresh
* Add dark/light theme toggle
* Add container query based responsiveness
* Add unit tests for data transformation logic
* Add E2E tests with Playwright

---

# Author

Submission for **Atomity Frontend Engineering Internship Challenge**
