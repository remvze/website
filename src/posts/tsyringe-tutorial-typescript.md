---
title: 'TSyringe Tutorial in TypeScript'
publishDate: '2025-07-13'
updateDate: '2025-07-13'
tags: ['typescript', 'dependency-injection']
---

## What is TSyringe?

[TSyringe](https://github.com/microsoft/tsyringe) is a lightweight TypeScript-first dependency injection container library that uses decorators and reflection to handle class dependencies automatically.

## Install TSyringe

Install TSyringe and Reflect Metadata API, which it relies on:

```bash
npm install tsyringe reflect-metadata
```

Then enable the following in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

And import `reflect-metadata` **once**, typically in your entry file:

```typescript
import 'reflect-metadata';
```

---

## Basic Usage

### 1. Define a service

This is a simple logger service. It will be injected into other classes. We use `@injectable()` to make `LoggerService` injectable.

```typescript
@injectable()
export class LoggerService {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}
```

### 2. Register the service

Here, we tell TSyringe to associate a **token** with the `LoggerService` class. This token can be a string (like `'LoggerService'`), a symbol, or even the class constructor itself.

```typescript
import { container } from 'tsyringe';

import { LoggerService } from './logger.service';

container.register('LoggerService', { useClass: LoggerService });
```

In this example, we're using a string token, which works fine — but TSyringe also supports using the class itself as the token:

```typescript
container.register(LoggerService, { useClass: LoggerService });
```

Using the class as the token has the advantage of being type-safe and less error-prone than using strings, especially in large codebases.

### 3. Inject it into another class

We use `@inject()` to request `LoggerService`.

```typescript
import { injectable, inject } from 'tsyringe';

@injectable()
class UserService {
  constructor(@inject('LoggerService') private logger: LoggerService) {}

  createUser(name: string) {
    this.logger.log(`Creating user: ${name}`);
  }
}
```

If you registered `LoggerService` using the class as the token, you can inject it without `@inject()` — TSyringe will infer the type using reflection metadata:

```typescript
@injectable()
export class UserService {
  constructor(private logger: LoggerService) {}

  createUser(name: string) {
    this.logger.log(`Creating user: ${name}`);
  }
}
```

This is cleaner and fully type-safe, as long as all types are properly decorated and registered.

### 4. Resolve and use the class

Use the container to resolve `UserService`. TSyringe will automatically:

- Inspect the constructor of `UserService`
- See that it depends on `LoggerService`
- Inject the registered implementation of `LoggerService`

```typescript
const userService = container.resolve(UserService);

userService.createUser('Alice');
```

Note that you didn't have to register `UserService` first, that's because TSyringe can resolve classes decorated with `@injectable()` automatically, as long as **all their dependencies are registered**.

---

## Mocking and Overriding Dependencies for Unit Testing

One of the biggest advantages of using a dependency injection container like **TSyringe** is the ability to easily swap out real implementations with mocks or stubs during testing.

### Overriding a dependency

To override a registered dependency in a test, you can call `container.register()` again before resolving the class under test:

**Using a class as the token**:

```typescript
import { container } from 'tsyringe';
import { UserService } from './user.service';
import { LoggerService } from './logger.service';

const mockLogger = {
  log: jest.fn(),
};

// Override LoggerService with the mock
container.register(LoggerService, { useValue: mockLogger });

const userService = container.resolve(UserService);
userService.createUser('Test');

// Assert that the logger was called
expect(mockLogger.log).toHaveBeenCalledWith('Creating user: Test');
```

This approach is type-safe and avoids hardcoded strings. It pairs naturally with constructor injection that relies on type reflection (i.e., when no `@inject()` is used).

**Using a string token**:

If you registered `LoggerService` using a string token, you would also inject it with `@inject('LoggerService')` and override it like this:

```typescript
container.register('LoggerService', { useValue: mockLogger });
```

---

## Using Interfaces with TSyringe

In large applications, relying on interfaces instead of concrete classes makes your code more flexible and testable. However, due to TypeScript's limitations, TSyringe cannot resolve interfaces automatically — they don’t exist at runtime, so reflection metadata won’t capture them.

### Why Use Interfaces?

Because it decouples abstractions from implementations; it makes your classes depend on contracts, not concrete classes. It's also easier to test and mock, and it supports multiple implementations, allowing you to switch behaviors at runtime or in different environments.

### How to Use Interfaces with TSyringe?

Since interfaces can’t be reflected at runtime, you must use tokens when injecting them. These can be strings, symbols, or InjectionToken objects.

#### 1. Define the interface

```typescript
export interface ILoggerService {
  log(message: string): void;
}
```

#### 2. Implement the interface

```typescript
import { injectable } from 'tsyringe';
import { ILoggerService } from './logger.interface';

@injectable()
export class LoggerService implements ILoggerService {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}
```

#### 3. Register the implementation using a token

Use a string as a token:

```typescript
container.register<ILoggerService>('ILoggerService', {
  useClass: LoggerService,
});
```

Or use `Symbol()` to create unique, collision-resistant tokens that are safer and easier to maintain than plain strings:

```typescript
export const TOKENS = {
  ILoggerService: Symbol('ILoggerService'),
};

container.register<ILoggerService>(TOKENS.ILoggerService, {
  useClass: LoggerService,
});
```

#### 4. Inject the interface using the token

Use the `@inject()` decorator with the same token:

```typescript
import { injectable, inject } from 'tsyringe';
import { ILoggerService } from './logger.interface';

@injectable()
export class UserService {
  constructor(@inject('ILoggerService') private logger: ILoggerService) {}

  createUser(name: string) {
    this.logger.log(`Creating user: ${name}`);
  }
}
```

You **must** use `@inject()` when injecting interfaces as TSyringe can't infer them like it can with classes.
