---
title: 'Form Handling in React'
publishDate: '2025-03-18'
tags: ['react']
---

**Note**: This article will focus on built-in methods for handling forms in React. While third-party libraries exist and may be more suitable for specific needs, they are beyond the scope of this discussion.

One common approach to handling forms in React involves tracking the value of each input using separate state variables and then utilizing the `onSubmit` event handler:

```javascript
function MyForm() {
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    console.log(`The password is: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Another method, quite similar to the previous one, involves using `FormData` instead of tracking each input individually:

```javascript
function MyForm() {
  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password');

    console.log(`The password is: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

However, newer versions of React introduce the form action function, allowing you to pass a function to the `action` prop to handle form submissions:

```javascript
function MyForm() {
  const submit = formData => {
    const password = formData.get('password');

    console.log(`The password is: ${password}`);
  };

  return (
    <form action={submit}>
      <input type="password" name="password" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

You can also use Server Functions, identified by the `'use server'` marker.
