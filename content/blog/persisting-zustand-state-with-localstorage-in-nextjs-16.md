---
title: "Persisting Zustand State with localStorage in Next.js 16"
summary: "<hr><p><strong>Tired of your app losing state on every page refresh?</strong> In this guide, we dive into one of the most practical Zustand tricks for Next.js 16 — persisting state to localStorage using Zustand's built-in <code>persist</code> middleware. No extra packages, no complicated setup. We'll walk you through building a real counter app, handling the tricky hydration mismatch that trips up most Next.js developers, and even show you how to selectively persist only the data you need. By the end, your app's state will survive refreshes, tab closes, and everything in between — exactly the way users expect it to.</p>"
banner: "https://res.cloudinary.com/dxlmdzryf/image/upload/v1780768211/blog/1780768208_9c6209ee-2ae8-44bb-9050-03d5fc57cc90.png"
author: "Dimas Roger Widianto"
topics:
  - "Frontend"
publishedAt: "2026-06-07T00:50:19"
updatedAt: "2026-06-07T00:50:19"
isHighlight: true
---
> # Persisting Zustand State with localStorage in Next.js 16

---

If you've been using Zustand for state management in Next.js, you've probably run into this problem: every time the page refreshes, your state resets back to zero. Pretty frustrating, right? In this article, we'll walk through how to persist Zustand state to `localStorage` so your data sticks around even after a refresh or browser close.

## Prerequisites

- A Next.js 16 project set up

- Basic knowledge of Zustand

- Node.js v18 or later

Don't have a Next.js 16 project yet? Create one with:

```
npx create-next-app@latest my-app
```

Choose TypeScript, Tailwind CSS, and App Router when prompted.

## Step 1: Install Zustand

If you haven't installed Zustand yet, run the following command in your project root:

```
npm install zustand
```

Or if you're using pnpm or yarn:

```
pnpm add zustand
# or
yarn add zustand
```

## Step 2: Create a Zustand Store with Persist Middleware

This is the core part. Zustand ships with a built-in `persist` middleware that automatically saves your state to `localStorage` — no extra packages needed!

Create a new file at `src/stores/useCounterStore.ts`:

```
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: 'counter-storage', // key name in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
)
```

The key difference from a regular store is wrapping the function with `persist()` and providing a `name` config as the localStorage key.

## Step 3: Handle Hydration in Next.js (Important!)

In Next.js, there's a classic issue called **hydration mismatch**. Since Next.js renders pages on the server too, and `localStorage` only exists in the browser, we need to handle this properly.

Create a custom hook at `src/hooks/useHydrated.ts`:

```
import { useEffect, useState } from 'react'

export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated
}
```

## Step 4: Use the Store in a Component

Now let's build the counter component. Create `src/components/Counter.tsx`:

```
'use client'

import { useCounterStore } from '@/stores/useCounterStore'
import { useHydrated } from '@/hooks/useHydrated'

export default function Counter() {
  const { count, increment, decrement, reset } = useCounterStore()
  const hydrated = useHydrated()

  // Prevent hydration mismatch
  if (!hydrated) return null

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h2 className="text-2xl font-bold">Counter</h2>
      <p className="text-4xl font-mono">{count}</p>
      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
      <button
        onClick={reset}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Reset
      </button>
      <p className="text-sm text-gray-400">
        Try refreshing the page — the count stays! 🎉
      </p>
    </div>
  )
}
```

## Step 5: Add the Component to a Page

Open `src/app/page.tsx` and add the Counter component:

```
import Counter from '@/components/Counter'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Counter />
    </main>
  )
}
```

## Step 6: Run and Test

```
npm run dev
```

Open `http://localhost:3000`, click the + button a few times, then refresh the page. The state persists! You can also check DevTools → Application → Local Storage to see the stored data.

## Step 7: Partial Persist (Optional)

Sometimes you don't want to persist everything to localStorage. For example, you might only want to persist `count` but not the actions. Use the `partialize` option:

```
export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: 'counter-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ count: state.count }), // only persist count
    }
  )
)
```

## Bonus: Using sessionStorage

If you want the state to only last for the browser session (cleared when the tab is closed), simply swap `localStorage` with `sessionStorage`:

```
storage: createJSONStorage(() => sessionStorage),
```

## Best Practices

- **Always handle hydration** — don't render store state before the client has hydrated

- **Use partialize** — only persist data you actually need, and avoid storing sensitive information

- **Use unique key names** — prevent conflicts with other libraries that also use localStorage

- **Never persist sensitive data** — passwords, auth tokens, and other sensitive data should never go in localStorage

## Troubleshooting

**State not saved after refresh?** Make sure the `name` key is unique and doesn't conflict with other keys in localStorage.

**Hydration error in the console?** Make sure you're using the `useHydrated` hook before rendering any values from the store, as explained in Step 3.

**localStorage is not defined?** This happens when the code runs on the server. Make sure the component using the store is marked with `'use client'`.

## Conclusion

Persisting Zustand state to localStorage in Next.js 16 is pretty straightforward thanks to the built-in `persist` middleware. The most important thing to remember is handling hydration mismatch correctly to avoid errors in production.

From here, you can explore further — like using `IndexedDB` for more complex data, or combining persist with other Zustand middleware like `immer`.

Happy coding! 🚀
