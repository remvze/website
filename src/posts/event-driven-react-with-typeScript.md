---
title: 'Event-Driven React with TypeScript'
publishDate: '2025-07-13'
updateDate: '2025-07-13'
tags: ['typescript', 'react', 'frontend']
---

## Why Event-Driven React?

In traditional React apps, components communicate by passing props or using context. This works well in small apps, but as your app grows, it can lead to tight coupling, prop drilling, and tangled logic between unrelated parts of the UI.

**Event-driven design** offers a cleaner solution.

**Event-driven design** is a pattern where components communicate by emitting and listening to named events, without needing to know about each other directly.

Think of it like a **publish/subscribe** system:

- One component emits an event (e.g., `user:clicked`)
- Other components listen for that event and respond accordingly

---

## Build a Type-Safe Event Bus

Let's create a lightweight, reusable **EventBus** in TypeScript. It will support three basic methods:

- `on(event, handler)`: subscribe to an event
- `off(event, handler)`: unsubscribe
- `emit(event, payload)`: publish an event with data

### Basic Implementation

```typescript
type EventHandler<T> = (payload: T) => void;

class EventBus<Events extends Record<string, any>> {
  private listeners: {
    [K in keyof Events]?: Set<EventHandler<Events[K]>>;
  } = {};

  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }
    this.listeners[event]!.add(handler);
  }

  off<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>) {
    this.listeners[event]?.delete(handler);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    this.listeners[event]?.forEach(handler => handler(payload));
  }
}
```

### Define Your Event Types

Now define your app's event types for full type safety:

```typescript
type AppEvents = {
  'user:clicked': { timestamp: number };
};
```

### Create and Export the Bus

```typescript
export const eventBus = new EventBus<AppEvents>();
```

You now have a fully typed event bus ready for use in any component.

---

## Use the Event Bus in React

With the `eventBus` in place, React components can communicate without direct relationships.

Let's walk through a simple example:

### Component A: Emit an Event

`button.tsx`:

```tsx
import { eventBus } from './event-bus';

export function Button() {
  const handleClick = () => {
    eventBus.emit('user:clicked', { timestamp: Date.now() });
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

### Component B: Listen for the Event

`logger.tsx`:

```tsx
import { useEffect, useState } from 'react';

import { eventBus } from './event-bus';

function Logger() {
  const [times, setTimes] = useState<string[]>([]);

  useEffect(() => {
    const handler = (data: { timestamp: number }) => {
      setTimes(prev => [
        ...prev,
        new Date(data.timestamp).toLocaleTimeString(),
      ]);
    };

    eventBus.on('user:clicked', handler);

    return () => eventBus.off('user:clicked', handler); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>Click Times</h2>

      {times.map((time, index) => (
        <p key={index}>{time}</p>
      ))}
    </div>
  );
}
```

### Use the Components

`app.ts`:

```tsx
import { Layout } from './layout';
import { Button } from './button';
import { Logger } from './logger';

export function App() {
  return (
    <Layout>
      <Button />
      <Logger />
    </Layout>
  );
}
```

---

## Real-World Use Cases

An **event-driven approach** shines in situations where components need to react to shared events without being **tightly coupled**.

Here are a few practical examples where an event bus can simplify your React app:

### 1. Global Notifications

Show a toast from anywhere in the app:

```typescript
eventBus.emit('toast:show', { message: 'Saved!', type: 'success' });
```

The toast component listens and displays it, no matter where the event came from.

### 2. Analytics and Tracking

Log interactions like clicks or page views without cluttering UI logic:

```typescript
eventBus.emit('analytics:track', { event: 'button_click', label: 'Save' });
```

### 3. Global Error Handling

Surface errors app-wide without pushing error state through context:

```typescript
eventBus.emit('error:occurred', { message: 'Something went wrong.' });
```

### 4. Switching Theme

Toggle light/dark mode from anywhere in the app:

```typescript
eventBus.emit('theme:toggle', { theme: 'dark' });
```

A top-level layout or theme provider listens for this event and updates the UI accordingly.
