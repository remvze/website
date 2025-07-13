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

## Define Your Services

Let's define a simple logger service and a user service that depends on it.

`logger.service.ts`:

```typescript
import { injectable } from 'tsyringe';

@injectable()
export class LoggerService {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}
```

`user.service.ts`:

```typescript
import { injectable, inject } from 'tsyringe';

import { LoggerService } from './logger.service';

@injectable()
export class UserService {
  constructor(@inject('LoggerService') private logger: LoggerService) {}

  createUser(name: string) {
    this.logger.log(`User ${name} created`);
  }
}
```

The `@injectable()` decorator tells TSyringe that the class can be managed by the container.

### Why use `@inject('LoggerService')`?

When using string tokens for dependencies, you must explicitly tell TSyringe how to resolve them. This allows for flexibility, such as swapping in mock or alternate implementations at runtime.

## Register and Resolve Dependencies

`main.ts`:

```typescript
import 'reflect-metadata';
import { container } from 'tsyringe';

import { LoggerService } from './logger.service';
import { UserService } from './user.service';

// Register services by string token
container.register<LoggerService>('LoggerService', { useClass: LoggerService });
container.register<UserService>('UserService', { useClass: UserService });

// Resolve and use
const userService = container.resolve<UserService>('UserService');

userService.createUser('Alice');
```

## Alternative: Use Class as Token (No Strings)

TSyringe also supports using classes directly as tokens. This avoids string-based registration:

```typescript
@injectable()
export class UserService {
  constructor(private logger: LoggerService) {}
}

// Register without strings
container.register<LoggerService>(LoggerService, { useClass: LoggerService });
container.register<UserService>(UserService, { useClass: UserService });

const userService = container.resolve(UserService);
userService.createUser('Bob');
```

## Testing Using Mocks

TSyringe makes it easy to inject mocks during tests.

```typescript
import { container } from 'tsyringe';
import { UserService } from './user.service';

// Create a mock logger
const mockLogger = { log: vi.fn() };

// Register mock instead of real service
container.register('LoggerService', { useValue: mockLogger });

const userService = container.resolve<UserService>('UserService');

userService.createUser('Test');

// Assert the logger was used
expect(mockLogger.log).toHaveBeenCalledWith('User Test created');
```

This pattern works well for unit testing with tools like **Vitest** or **Jest**.
