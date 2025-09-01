import { test } from '@playwright/test';

/**
 * Decorator function for wrapping POM methods in a test.step.
 *
 * Use it without a step name `@step()`.
 *
 * Or with a step name `@step("Search something")`.
 *
 * @param stepName - The name of the test step.
 * @returns A decorator function that can be used to decorate test methods.
 */
export function step(stepName: string) {
  return function decorator(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function replacementMethod(...args: any[]): Promise<any> {
      const name = `${stepName ?? (context.name as string)}`;
      if (this.constructor.name) {
        name.concat(` (${this.constructor.name})`);
      }

      return test.step(name, async () => {
        return target.call(this, ...args);
      });
    };
  };
}
