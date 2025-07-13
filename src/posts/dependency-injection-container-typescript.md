---
title: 'Dependency Injection in TypeScript'
publishDate: '2025-07-13'
updateDate: '2025-07-13'
tags: ['typescript', 'dependency-injection', 'design-patterns']
---

## What is Dependency Injection?

**Dependency Injection** (DI) is a design pattern in which objects (such as classes, components, or services) receive their dependencies from external sources instead of creating them internally.

This promotes **loose coupling**, making code easier to test, change, and maintain; **better modularity**, enabling components to be reused more effectively; and **Inversion of Control** (IoC), where the class no longer controls how its dependencies are created—this responsibility is handled externally.

### Without Dependency Injection

```typescript
interface IEmailService {
  sendEmail(to: string, message: string): void;
}

class EmailService implements IEmailService {
  sendEmail(to: string, message: string) {
    console.log(`Email sent to ${to}: ${message}`);
  }
}

class UserController {
  private emailService = new EmailService();

  notifyUser() {
    this.emailService.sendEmail('user@example.com', 'Welcome!');
  }
}
```

In this example, `UserController` is **tightly coupled** to `EmailService`, meaning it directly creates and relies on a specific implementation. This makes it difficult to substitute a mock service for testing or switch to a different email provider without modifying the class itself.

### With Dependency Injection

```typescript
class UserController {
  constructor(private emailService: IEmailService) {}
  // ^ Shorthand to declaring and assigning `emailService`

  notifyUser() {
    this.emailService.sendEmail('user@example.com', 'Welcome!');
  }
}

const emailService = new EmailService();
const userController = new UserController(emailService);
```

Now, `UserController` is loosely coupled and depends only on an interface—not on how the dependency is created. This means you can substitute different implementations, including mocks, without changing the class.

### Easier Testing with Mocks

Dependency Injection makes testing much simpler. By injecting dependencies instead of creating them inside a class, you can easily substitute real implementations with mock or stub versions during testing. This allows you to avoid side effects and test behavior without relying on external services.

Here's how you can use a mock implementation of `EmailService`:

```typescript
class MockEmailService implements IEmailService {
  public sentMessages: Array<{
    to: string;
    message: string;
  }> = [];

  sendEmail(to: string, message: string) {
    this.sentMessages.push({ to, message });
  }
}

// Test:
test('should send a welcome email', () => {
  const mockService = new MockEmailService();
  const controller = new UserController(mockService);

  controller.notifyUser();

  expect(mockService.sentMessages).toHaveLength(1);
});
```
