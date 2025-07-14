---
title: 'Minimal DI Container in JavaScript'
publishDate: '2025-07-14'
updateDate: '2025-07-14'
tags: ['javascript', 'dependency-injection']
---

## What is Dependency Injection (DI)?

**Dependency Injection** (DI) is a design pattern that promotes loose coupling between components. Instead of a class creating its own dependencies, those dependencies are _injected_ from the outside. This improves testability, readability, and modularity.

For example, instead of doing this:

```javascript
class UserService {
  constructor() {
    this.logger = new Logger(); // tightly coupled
  }
}
```

You can do this:

```javascript
class UserService {
  constructor(logger) {
    this.logger = logger; // dependency injected
  }
}
```

## What is a Dependency Injection Container?

A **DI container** is a tool that automates the process of injecting dependencies. It lets you:

- Register services or values
- Define how they should be created (e.g., once per request or as singletons)
- Automatically resolve dependencies when needed

In short, it acts as a central registry and factory for your application’s components.

## What is the Goal of This Article?

The goal of this article is to demonstrate how to build a simple and functional dependency injection (DI) container in JavaScript, one that’s easy to understand, works with plain JavaScript (no decorators required), and covers the essentials:

- Registering values, factories, and classes
- Resolving dependencies automatically
- Supporting singleton instances
- Using metadata for constructor injection

This kind of container is perfect for learning purposes, small projects, scripts, or lightweight backends where you don’t want the overhead of a full framework.

However, for production-grade applications, especially in TypeScript-heavy or large-scale architectures, you might benefit from more robust DI solutions like **TSyringe**.

This article aims to teach the fundamentals, and perhaps give you a building block to grow from.

---

## Implementation

### The Container

This class holds everything: from registered providers to singleton instances.

```javascript
class Container {
  constructor() {
    /**
     * Stores registered providers and their options.
     * @type {Map<string | symbol | Function, {provider: Function, options: Object}>}
     */
    this.registry = new Map();

    /**
     * Caches singleton instances.
     * @type {Map<string | symbol | Function, any>}
     */
    this.singletons = new Map();
  }

  /**
   * Registers a provider function for a given token.
   *
   * @param {string | symbol | Function} token - The unique identifier for the dependency.
   * @param {Function} provider - A function that returns the instance of the dependency.
   * @param {Object} [options={}] - Optional settings (e.g. singleton).
   */
  register(token, provider, options = {}) {
    this.registry.set(token, { options, provider });
  }

  /**
   * Registers a constant value for a given token.
   *
   * @param {string | symbol | Function} token - The unique identifier for the dependency.
   * @param {*} value - The value to register.
   */
  registerValue(token, value) {
    this.register(token, () => value);
  }

  /**
   * Registers a class to be instantiated on each resolution.
   *
   * @param {string | symbol | Function} token - The unique identifier for the dependency.
   * @param {Function} Class - The class constructor.
   * @param {Object} [options={}] - Optional settings.
   */
  registerClass(token, Class, options = {}) {
    this.register(token, () => this._construct(Class), options);
  }

  /**
   * Registers a class as a singleton.
   *
   * @param {string | symbol | Function} token - The unique identifier for the dependency.
   * @param {Function} Class - The class constructor.
   */
  registerSingleton(token, Class) {
    this.register(token, () => this._getSingleton(token, Class), {
      singleton: true,
    });
  }

  /**
   * Resolves a dependency by token.
   *
   * @param {string | symbol | Function} token - The token to resolve.
   * @returns {*} - The resolved instance.
   * @throws {Error} If the token is not registered.
   */
  resolve(token) {
    const entry = this.registry.get(token);
    if (!entry) {
      throw new Error(`No provider registered for token: ${String(token)}`);
    }
    return entry.provider();
  }

  /**
   * Constructs a class instance, injecting resolved dependencies.
   *
   * @private
   * @param {Function} Class - The class constructor.
   * @returns {*} - The class instance.
   */
  _construct(Class) {
    const deps = Class.inject || [];
    const resolvedDeps = deps.map(dep => this.resolve(dep));
    return new Class(...resolvedDeps);
  }

  /**
   * Returns a singleton instance of the class, creating it if needed.
   *
   * @private
   * @param {string | symbol | Function} token - The unique identifier for the singleton.
   * @param {Function} Class - The class constructor.
   * @returns {*} - The singleton instance.
   */
  _getSingleton(token, Class) {
    if (this.singletons.has(token)) {
      return this.singletons.get(token);
    }
    const instance = this._construct(Class);
    this.singletons.set(token, instance);
    return instance;
  }
}
```

### The `injectable` Higher Order Function

This helper attaches dependency metadata to a class. It lets the container know which dependencies to inject when constructing the class.

```javascript
/**
 * Attaches dependency metadata to a class.
 *
 * @param {Array<string | symbol | Function>} dependencies - Tokens to inject.
 * @param {Function} Class - The class constructor.
 * @returns {Function} The same class with an `inject` static property.
 */
function injectable(dependencies, Class) {
  Class.inject = dependencies;

  return Class;
}
```

Example:

```javascript
const Logger = injectable(
  [],
  class {
    log(msg) {
      console.log('[Log]:', msg);
    }
  },
);
```

### Usage Example

Let's wire everything together with a few services and a dependent class.

```javascript
// Services
const Logger = injectable(
  [],
  class {
    log(message) {
      console.log('[Log]:', message);
    }
  },
);

const Config = injectable(
  [],
  class {
    constructor() {
      this.env = 'production';
    }
  },
);

// Dependent class
const UserService = injectable(
  ['logger', 'config'],
  class {
    constructor(logger, config) {
      this.logger = logger;
      this.config = config;
    }

    getUser() {
      this.logger.log(`Getting user in ${this.config.env} mode...`);
      return { name: 'Alice' };
    }
  },
);
```

Setup and use the container:

```javascript
const container = new Container();

container.registerClass('logger', Logger);
container.registerClass('config', Config);
container.registerSingleton('userService', UserService);

const userService = container.resolve('userService');

console.log(userService.getUser());
```

Output:

```text
[Log]: Getting user in production mode...
{ name: 'Alice' }
```
