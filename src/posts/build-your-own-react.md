---
title: 'Build Your Own React'
publishDate: '2025-07-16'
updateDate: '2025-07-16'
tags: ['react', 'javascript']
---

## Introduction

This is a small experiment in understanding how React works under the hood, not all of it, just the core ideas: how elements are represented in memory, how updates happen efficiently, and how components can manage their own state.

We’ll build a minimal virtual DOM library from scratch using plain JavaScript. It won’t support everything React does, not even close, but it should help reveal the patterns and mechanics behind it.

Some basic DOM and JavaScript knowledge is enough. If you’ve used React before, parts of this may feel familiar in a new way. If not, it should still make sense as a slow step-by-step.

## What is a Virtual DOM?

A virtual DOM is just a plain JavaScript object that describes what the real DOM should look like.

Instead of updating the browser’s DOM directly (which can be slow and messy), you build a tree of these virtual nodes in memory. When something changes, you compare the new tree to the old one and update only the parts of the actual DOM that changed.

This idea helps keep UI updates predictable and fast, and it’s the core behind how libraries like React work.

---

## Project Setup

There’s no need for a bundler or build tools, we’ll keep things simple and use plain JavaScript without JSX.

JSX is just syntax sugar for `createElement(...)` calls, so skipping it lets us focus on the core logic without extra setup. If you want to add JSX later, you can easily do that with a bundler.

To get started, just create an `index.html` like this:

```html
<!doctype html>
<html>
  <body>
    <div id="root"></div>
    <script src="mini-react.js"></script>
  </body>
</html>
```

And a `mini-react.js` file, that’s where we’ll write everything.

## Creating Virtual DOM Elements

The first step is to define how our UI is represented in memory. That’s the virtual DOM.

Instead of actual DOM nodes, we describe elements as plain JavaScript objects:

```javascript
{
  type: "div",
  props: { id: "app" },
  children: [...]
}
```

To make this easier to work with, we’ll write a createElement function, similar in spirit to React’s:

```javascript
/**
 * Creates a virtual DOM element.
 *
 * @param {string|function} type - HTML tag name or component class.
 * @param {object} [props={}] - Props including attributes and event handlers.
 * @param {...any} children - Child elements (strings or virtual DOM nodes).
 *
 * @returns {object} Virtual DOM node.
 */
function createElement(type, props = {}, ...children) {
  return {
    type,
    props: props || {},
    children: children
      .flat()
      .map(child =>
        typeof child === 'object' ? child : createTextElement(child),
      ),
  };
}
```

For plain text (like `"Hello world"`), we wrap it in a special text element:

```javascript
/**
 * Creates a virtual DOM text node.
 *
 * @param {string} text - Text content.
 *
 * @returns {object} Virtual DOM text node.
 */
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: { nodeValue: text },
    children: [],
  };
}
```

This gives us a consistent structure for everything, whether it's a tag or a string.

## Rendering to the Real DOM

Now that we have a virtual DOM structure, we need to turn it into real DOM nodes the browser can understand.

This is what `createDom` does. It takes a virtual node and returns the corresponding DOM node:

```javascript
/**
 * Converts a virtual DOM node to a real DOM node.
 *
 * @param {object} vNode - Virtual DOM node.
 *
 * @returns {Node} Real DOM node.
 */
function createDom(vNode) {
  if (typeof vNode.type === 'function') {
    const instance = new vNode.type(vNode.props || {});
    instance._vdom = instance.render();
    const dom = createDom(instance._vdom);
    instance._dom = dom;
    vNode._instance = instance;
    return dom;
  }

  const dom =
    vNode.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(vNode.type);

  updateDom(dom, {}, vNode.props);

  vNode.children.forEach(child => {
    dom.appendChild(createDom(child));
  });

  return dom;
}
```

A few key things are happening here:

- If the `type` is a component (a function or class), we call its `render()` method and recurse.
- If it’s a text element, we create a text node.
- Otherwise, we create a standard DOM element.
- We apply props and event listeners using `updateDom` (we’ll define that next).
- Then we recursively render and append the children.

This gives us a way to walk the virtual tree and build the actual DOM tree.

## Updating the DOM

Once we create a DOM node, we need to apply any props, attributes, or event listeners. That’s what `updateDom` handles.

```javascript
/**
 * Updates a DOM node based on prop changes.
 *
 * @param {Node} dom - The real DOM node.
 * @param {object} prevProps - Previous props.
 * @param {object} nextProps - New props.
 */
function updateDom(dom, prevProps, nextProps) {
  // Remove old event listeners
  Object.keys(prevProps).forEach(name => {
    if (name.startsWith('on')) {
      const event = name.slice(2).toLowerCase();
      dom.removeEventListener(event, prevProps[name]);
    }
  });

  // Set new props/events
  Object.keys(nextProps).forEach(name => {
    if (name.startsWith('on')) {
      const event = name.slice(2).toLowerCase();
      dom.addEventListener(event, nextProps[name]);
    } else if (name !== 'children' && name !== 'nodeValue') {
      dom[name] = nextProps[name];
    }
  });

  // Update text node content
  if ('nodeValue' in nextProps) {
    dom.nodeValue = nextProps.nodeValue;
  }
}
```

What it does:

- Removes any event listeners from the previous props.
- Adds new ones from the updated props.
- Sets other properties directly on the DOM node, except `children` and `nodeValue`.
- For text nodes, it updates the content using `nodeValue`.

This keeps DOM nodes in sync with our virtual DOM description.

## Diffing and Reconciliation

To avoid re-rendering everything on every change, we need to compare the new virtual DOM to the old one and update only what's necessary. This is called **reconciliation or diffing**.

The `updateElement` function handles this:

```javascript
/**
 * Diffs and updates DOM based on virtual DOM changes.
 *
 * @param {Node} parent - The parent real DOM node.
 * @param {object|null} newVNode - New virtual DOM node.
 * @param {object|null} oldVNode - Old virtual DOM node.
 * @param {number} [index=0] - Child index.
 */
function updateElement(parent, newVNode, oldVNode, index = 0) {
  const existingDom = parent.childNodes[index];

  if (!oldVNode) {
    parent.appendChild(createDom(newVNode));
    return;
  }

  if (!newVNode) {
    parent.removeChild(existingDom);
    return;
  }

  if (newVNode.type !== oldVNode.type) {
    parent.replaceChild(createDom(newVNode), existingDom);
    return;
  }

  if (typeof newVNode.type === 'function') {
    const instance = oldVNode._instance;
    instance.props = newVNode.props;
    const newChildVDOM = instance.render();
    updateElement(existingDom, newChildVDOM, instance._vdom, 0);
    instance._vdom = newChildVDOM;
    return;
  }

  updateDom(existingDom, oldVNode.props, newVNode.props);

  // Keyed diffing
  const keyedOld = {};
  const oldUnkeyed = [];

  oldVNode.children.forEach((child, i) => {
    const key = child?.props?.key;
    if (key != null) {
      keyedOld[key] = { child, i };
    } else {
      oldUnkeyed.push({ child, i });
    }
  });

  const newChildren = newVNode.children;
  const domNode = existingDom;
  let currentIndex = 0;

  newChildren.forEach((newChild, i) => {
    const key = newChild?.props?.key;

    if (key != null && keyedOld[key]) {
      const { child: oldChild } = keyedOld[key];
      updateElement(domNode, newChild, oldChild, currentIndex++);
    } else if (key == null && oldUnkeyed.length > 0) {
      const { child: oldChild } = oldUnkeyed.shift();
      updateElement(domNode, newChild, oldChild, currentIndex++);
    } else {
      updateElement(domNode, newChild, null, currentIndex++);
    }
  });

  // Remove extra old nodes
  const oldLen = oldVNode.children.length;
  const newLen = newVNode.children.length;
  for (let i = newLen; i < oldLen; i++) {
    domNode.removeChild(domNode.childNodes[newLen]);
  }
}
```

Summary:

- If there's no old node, it appends the new one.
- If there's no new node, it removes the old one.
- If types differ, it replaces the node.
- If it's a component, it re-renders and diffs its output.
- Otherwise, it updates props and recursively diffs children.
- It also supports keyed elements for more stable updates.

This is the heart of what makes UI updates fast and predictable.

## Building Class-Based Components

So far, we've described UI as plain objects and functions. To manage state and logic, we’ll introduce class-based components.

Each component:

- Stores its own state
- Implements a `render()` method to return virtual DOM
- Can trigger re-renders using `setState`

Here's the base class:

```javascript
/**
 * Base class for components.
 */
class BaseComponent {
  /**
   * @param {object} [props={}] - Initial props.
   */
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this._vdom = null;
    this._container = null;
  }

  /**
   * Updates component state and triggers re-render.
   * @param {object} partialState - Partial state to merge.
   */
  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    this._rerender();
  }

  /**
   * Internal render update logic.
   * @private
   */
  _rerender() {
    const newVDOM = this.render();
    updateElement(this._container, newVDOM, this._vdom);
    this._vdom = newVDOM;
  }

  /**
   * Mounts component into DOM.
   * @param {HTMLElement} container - DOM element to mount to.
   */
  mount(container) {
    this._container = container;
    this._vdom = this.render();
    const dom = createDom(this._vdom);
    container.appendChild(dom);
    this.componentDidMount();
  }

  /**
   * Render method to be overridden by subclasses.
   * @returns {object} Virtual DOM.
   */
  render() {
    throw new Error('render() not implemented');
  }

  /**
   * Lifecycle hook called after mounting.
   */
  componentDidMount() {}
}
```

What it does:

- `setState()` merges state and triggers a re-render
- `_rerender()` diffs the new output with the old one
- `mount()` initializes and renders into a real DOM container
- `render()` must be implemented by subclasses
- `componentDidMount()` is a lifecycle hook that runs once after mounting

Now we can build components that encapsulate their own behavior and update when their state changes.

---

That’s about it. Here’s the complete Mini React implementation code, all in one place:

```javascript
/**
 * Creates a virtual DOM element.
 *
 * @param {string|function} type - HTML tag name or component class.
 * @param {object} [props={}] - Props including attributes and event handlers.
 * @param {...any} children - Child elements (strings or virtual DOM nodes).
 *
 * @returns {object} Virtual DOM node.
 */
function createElement(type, props = {}, ...children) {
  return {
    type,
    props: props || {},
    children: children
      .flat()
      .map(child =>
        typeof child === 'object' ? child : createTextElement(child),
      ),
  };
}

/**
 * Creates a virtual DOM text node.
 *
 * @param {string} text - Text content.
 *
 * @returns {object} Virtual DOM text node.
 */
function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: { nodeValue: text },
    children: [],
  };
}

/**
 * Converts a virtual DOM node to a real DOM node.
 *
 * @param {object} vNode - Virtual DOM node.
 *
 * @returns {Node} Real DOM node.
 */
function createDom(vNode) {
  if (typeof vNode.type === 'function') {
    const instance = new vNode.type(vNode.props || {});
    instance._vdom = instance.render();
    const dom = createDom(instance._vdom);
    instance._dom = dom;
    vNode._instance = instance;
    return dom;
  }

  const dom =
    vNode.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(vNode.type);

  updateDom(dom, {}, vNode.props);

  vNode.children.forEach(child => {
    dom.appendChild(createDom(child));
  });

  return dom;
}

/**
 * Updates a DOM node based on prop changes.
 *
 * @param {Node} dom - The real DOM node.
 * @param {object} prevProps - Previous props.
 * @param {object} nextProps - New props.
 */
function updateDom(dom, prevProps, nextProps) {
  // Remove old event listeners
  Object.keys(prevProps).forEach(name => {
    if (name.startsWith('on')) {
      const event = name.slice(2).toLowerCase();
      dom.removeEventListener(event, prevProps[name]);
    }
  });

  // Set new props/events
  Object.keys(nextProps).forEach(name => {
    if (name.startsWith('on')) {
      const event = name.slice(2).toLowerCase();
      dom.addEventListener(event, nextProps[name]);
    } else if (name !== 'children' && name !== 'nodeValue') {
      dom[name] = nextProps[name];
    }
  });

  // Update text node content
  if ('nodeValue' in nextProps) {
    dom.nodeValue = nextProps.nodeValue;
  }
}

/**
 * Diffs and updates DOM based on virtual DOM changes.
 *
 * @param {Node} parent - The parent real DOM node.
 * @param {object|null} newVNode - New virtual DOM node.
 * @param {object|null} oldVNode - Old virtual DOM node.
 * @param {number} [index=0] - Child index.
 */
function updateElement(parent, newVNode, oldVNode, index = 0) {
  const existingDom = parent.childNodes[index];

  if (!oldVNode) {
    parent.appendChild(createDom(newVNode));
    return;
  }

  if (!newVNode) {
    parent.removeChild(existingDom);
    return;
  }

  if (newVNode.type !== oldVNode.type) {
    parent.replaceChild(createDom(newVNode), existingDom);
    return;
  }

  if (typeof newVNode.type === 'function') {
    const instance = oldVNode._instance;
    instance.props = newVNode.props;
    const newChildVDOM = instance.render();
    updateElement(existingDom, newChildVDOM, instance._vdom, 0);
    instance._vdom = newChildVDOM;
    return;
  }

  updateDom(existingDom, oldVNode.props, newVNode.props);

  // Keyed diffing
  const keyedOld = {};
  const oldUnkeyed = [];

  oldVNode.children.forEach((child, i) => {
    const key = child?.props?.key;
    if (key != null) {
      keyedOld[key] = { child, i };
    } else {
      oldUnkeyed.push({ child, i });
    }
  });

  const newChildren = newVNode.children;
  const domNode = existingDom;
  let currentIndex = 0;

  newChildren.forEach((newChild, i) => {
    const key = newChild?.props?.key;

    if (key != null && keyedOld[key]) {
      const { child: oldChild } = keyedOld[key];
      updateElement(domNode, newChild, oldChild, currentIndex++);
    } else if (key == null && oldUnkeyed.length > 0) {
      const { child: oldChild } = oldUnkeyed.shift();
      updateElement(domNode, newChild, oldChild, currentIndex++);
    } else {
      updateElement(domNode, newChild, null, currentIndex++);
    }
  });

  // Remove extra old nodes
  const oldLen = oldVNode.children.length;
  const newLen = newVNode.children.length;
  for (let i = newLen; i < oldLen; i++) {
    domNode.removeChild(domNode.childNodes[newLen]);
  }
}

/**
 * Base class for components.
 */
class BaseComponent {
  /**
   * @param {object} [props={}] - Initial props.
   */
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this._vdom = null;
    this._container = null;
  }

  /**
   * Updates component state and triggers re-render.
   * @param {object} partialState - Partial state to merge.
   */
  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    this._rerender();
  }

  /**
   * Internal render update logic.
   * @private
   */
  _rerender() {
    const newVDOM = this.render();
    updateElement(this._container, newVDOM, this._vdom);
    this._vdom = newVDOM;
  }

  /**
   * Mounts component into DOM.
   * @param {HTMLElement} container - DOM element to mount to.
   */
  mount(container) {
    this._container = container;
    this._vdom = this.render();
    const dom = createDom(this._vdom);
    container.appendChild(dom);
    this.componentDidMount();
  }

  /**
   * Render method to be overridden by subclasses.
   * @returns {object} Virtual DOM.
   */
  render() {
    throw new Error('render() not implemented');
  }

  /**
   * Lifecycle hook called after mounting.
   */
  componentDidMount() {}
}
```

---

## Examples

### Counter App

A minimal example showing how state and re-rendering work:

```javascript
class Counter extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return createElement(
      'div',
      {},
      createElement('p', {}, `Count: ${this.state.count}`),
      createElement(
        'button',
        { onClick: () => this.setState({ count: this.state.count + 1 }) },
        'Increment',
      ),
    );
  }
}

const app = new Counter();
app.mount(document.getElementById('root'));
```

### Todo App

A slightly more involved example with input handling, state updates, and rendering lists:

```javascript
class App extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { id: 0, text: 'Buy Some Milk', isCompleted: false },
        { id: 1, text: 'Buy Some Pizza', isCompleted: false },
      ],
      newTodo: '',
    };
  }

  handleInput = e => {
    this.setState({ newTodo: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const trimmed = this.state.newTodo.trim();
    if (trimmed === '') return;

    const newTodo = {
      id: Date.now(),
      text: trimmed,
      isCompleted: false,
    };

    this.setState({
      todos: [...this.state.todos, newTodo],
      newTodo: '',
    });
  };

  render() {
    return createElement(
      'div',
      {},
      createElement('h2', {}, 'Todos'),
      createElement(
        'form',
        { onSubmit: this.handleSubmit },
        createElement('input', {
          type: 'text',
          value: this.state.newTodo,
          onInput: this.handleInput,
          placeholder: 'Enter new todo',
        }),
        createElement('button', { type: 'submit' }, 'Add'),
      ),
      createElement(
        'div',
        {},
        ...this.state.todos.map(todo =>
          createElement('p', { key: todo.id }, todo.text),
        ),
      ),
    );
  }
}

new App().mount(document.getElementById('root'));
```

---

## Where to Go Next

This tiny library covers just the basics, enough to understand how a React-like system works at its core: virtual DOM, diffing, stateful components, and rendering.

But there's still a lot missing:

- **Functional components**: right now, only class-based components are supported.
- **Hooks like useState or useEffect**: which would require a separate system for managing per-render state.
- **Better lifecycle support**: there’s only componentDidMount, and nothing like componentDidUpdate or componentWillUnmount.
- **JSX support**: you can add this if you want, though it does require a build step.
- **Performance improvements**: no batching, no async rendering, no real scheduling.
- **Error boundaries, refs, portals, context, suspense...** the list goes on.

You don’t need all of those to build useful UIs. But knowing _how_ and _why_ they exist becomes much clearer after building something like this yourself.

If you want to keep going:

- Try adding support for functional components
- Implement a simple `useState` hook
- Add `shouldComponentUpdate` or memoization to avoid re-renders
- Or just rewrite this from scratch again without looking, and see what you remember

That’s it. Thanks for reading.
