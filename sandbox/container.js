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

/**
 * USAGE
 */

// Define services
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

// Define dependent class
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

// Set up container
const container = new Container();

container.registerClass('logger', Logger);
container.registerClass('config', Config);
container.registerSingleton('userService', UserService);

// Use the container
const userService = container.resolve('userService');

console.log(userService.getUser());
