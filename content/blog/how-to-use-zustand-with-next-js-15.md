---
title: "How to Use Zustand with Next.js 15"
summary: "<p>This guide explains how to integrate Zustand, a lightweight state management library, with Next.js 15. It covers installing Zustand, creating a simple counter store, and using it in a client component marked with 'use client'. The tutorial includes rendering the component on a page, adding persistence with Zustand middleware, and best practices like keeping stores simple and using TypeScript. It also addresses troubleshooting, such as hydration errors, and highlights Zustand’s compatibility with Next.js 15’s App Router and server components.</p>"
banner: "https://res.cloudinary.com/dxlmdzryf/image/upload/v1780767554/blog/1780767554_ac6c399c-986e-4800-a595-8c59b847763b.png"
author: "Dimas Roger Widianto"
topics:
  - "Frontend"
publishedAt: "2025-04-21T18:37:42"
updatedAt: "2026-06-07T00:39:15"
isHighlight: true
---
# How to Use Zustand with Next.js 15

Zustand is a lightweight, flexible state management library for React that pairs well with Next.js, including the latest Next.js 15. This guide walks you through setting up Zustand in a Next.js 15 project, creating a simple store, and using it in your components. We'll build a basic counter app to demonstrate the integration.

## Prerequisites

- Node.js (v18 or later recommended)

- Basic knowledge of React and Next.js

- A Next.js 15 project set up

If you don't have a Next.js project, create one using:

```
npx create-next-app@latest my-zustand-app
```

Choose TypeScript, Tailwind CSS, and App Router when prompted for a streamlined setup.

## Step 1: Install Zustand

Navigate to your project directory and install Zustand:

```
npm install zustand
```

or, if using Yarn:

```
yarn add zustand
```

## Step 2: Create a Zustand Store

Create a store to manage your application's state. For this example, we'll make a simple counter store.

Create a new file at <mark>lib/store.ts:</mark>

```
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

This store defines a <mark>count</mark> state and two actions: <mark>increment</mark> and <mark>decrement</mark>. The <mark>create</mark> function from Zustand sets up the store with an initial state and methods to update it.

## Step 3: Use the Store in a Component

Next, integrate the store into a Next.js component. Since Next.js 15 uses the App Router by default, we'll create a client component to interact with the Zustand store.

Create a new file at <mark>app/components/Counter.tsx</mark>:

```
'use client';

import { useCounterStore } from '@/lib/store';

export default function Counter() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-2xl font-bold">Counter: {count}</h2>
      <div className="flex gap-2">
        <button
          onClick={increment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
```

The <mark>'use client'</mark> directive ensures this component runs on the client side, as Zustand relies on React hooks. We import the <mark>useCounterStore</mark> hook and use it to access the <mark>count</mark>, <mark>increment</mark>, and <mark>decrement</mark> functions.

## Step 4: Add the Component to a Page

Incorporate the <mark>Counter</mark> component into a page. Edit <mark>app/page.tsx</mark>:

```
import Counter from './components/Counter';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Zustand with Next.js 15</h1>
      <Counter />
    </main>
  );
}
```

This page renders the <mark>Counter</mark> component, which will display the counter and buttons to modify it.

## Step 5: Run Your Application

Start your Next.js development server:

```bash
npm run dev
```

Visit <mark>http&#58;//localhost:3000</mark> in your browser. You should see a counter with buttons to increment and decrement the value.

## Step 6: Advanced Usage (Optional)

Zustand offers powerful features like middleware for persistence or devtools. Here's how to add persistence to save the counter state to <mark>localStorage</mark>:

Update <mark>lib/store.ts:</mark>

```
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
    }),
    {
      name: 'counter-storage', // Key in localStorage
    }
  )
);
```

Now, the counter value persists across page refreshes.

## Best Practices

- **Keep Stores Simple**: Define focused stores for specific features to maintain clarity.

- **Use TypeScript**: Leverage TypeScript for type safety, as shown in the example.

- **Server Components**: Since Next.js 15 emphasizes server components, mark components using Zustand with <mark>'use client'</mark> to ensure compatibility.

- **Optimize Selectors**: For large stores, use Zustand's selector pattern to avoid unnecessary re-renders:

```
const count = useCounterStore((state) => state.count);
```

## Troubleshooting

- **Hydration Errors**: If you see hydration mismatches, ensure your component is marked as <mark>'use client'</mark> and avoid server-side logic in client components.

- **Store Not Updating**: Verify that your store is imported correctly and that you're using the hook in a client component.

- **Next.js 15 Compatibility**: Zustand works seamlessly with Next.js 15, but always test with the latest versions to catch any breaking changes.

## Conclusion

Zustand is a great choice for state management in Next.js 15 due to its simplicity and flexibility. By following this guide, you’ve set up a basic store, integrated it into a client component, and learned how to add persistence. Experiment with Zustand’s features like middleware or combine it with Next.js 15’s server components for a robust application architecture.

---

### Further Resources:

- **Zustand Official Documentation:** [https://github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)

- **Next.js Documentation:** [https://nextjs.org/docs](https://nextjs.org/docs)

- **Community Articles and Examples:** Search for "Zustand Next.js" to find more advanced use cases and community best practices.
