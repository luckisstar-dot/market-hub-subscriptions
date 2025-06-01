
interface TestResult {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
  details?: any;
}

interface TestSuite {
  name: string;
  tests: TestResult[];
  duration: number;
  passed: number;
  failed: number;
  skipped: number;
}

class TestRunner {
  private suites: TestSuite[] = [];
  private currentSuite: TestSuite | null = null;

  suite(name: string, fn: () => void | Promise<void>): void {
    this.currentSuite = {
      name,
      tests: [],
      duration: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
    };

    const startTime = performance.now();
    
    try {
      const result = fn();
      if (result instanceof Promise) {
        result.finally(() => {
          if (this.currentSuite) {
            this.currentSuite.duration = performance.now() - startTime;
            this.suites.push(this.currentSuite);
          }
        });
      } else {
        this.currentSuite.duration = performance.now() - startTime;
        this.suites.push(this.currentSuite);
      }
    } catch (error) {
      console.error(`Suite "${name}" failed:`, error);
      if (this.currentSuite) {
        this.currentSuite.duration = performance.now() - startTime;
        this.suites.push(this.currentSuite);
      }
    }
  }

  test(name: string, fn: () => void | Promise<void>): void {
    if (!this.currentSuite) {
      throw new Error('Test must be run within a suite');
    }

    const startTime = performance.now();
    const testResult: TestResult = {
      name,
      status: 'passed',
      duration: 0,
    };

    try {
      const result = fn();
      
      if (result instanceof Promise) {
        result
          .then(() => {
            testResult.status = 'passed';
            testResult.duration = performance.now() - startTime;
            this.currentSuite!.passed++;
          })
          .catch((error) => {
            testResult.status = 'failed';
            testResult.error = error.message;
            testResult.duration = performance.now() - startTime;
            this.currentSuite!.failed++;
          })
          .finally(() => {
            this.currentSuite!.tests.push(testResult);
          });
      } else {
        testResult.status = 'passed';
        testResult.duration = performance.now() - startTime;
        this.currentSuite.passed++;
        this.currentSuite.tests.push(testResult);
      }
    } catch (error) {
      testResult.status = 'failed';
      testResult.error = error instanceof Error ? error.message : String(error);
      testResult.duration = performance.now() - startTime;
      this.currentSuite.failed++;
      this.currentSuite.tests.push(testResult);
    }
  }

  expect(actual: any) {
    return new TestExpectation(actual);
  }

  getResults(): TestSuite[] {
    return this.suites;
  }

  clear(): void {
    this.suites = [];
    this.currentSuite = null;
  }

  async runAll(): Promise<TestSuite[]> {
    // Wait for any pending async tests
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.getResults();
  }
}

class TestExpectation {
  constructor(private actual: any) {}

  toBe(expected: any): void {
    if (this.actual !== expected) {
      throw new Error(`Expected ${expected}, but got ${this.actual}`);
    }
  }

  toEqual(expected: any): void {
    if (JSON.stringify(this.actual) !== JSON.stringify(expected)) {
      throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(this.actual)}`);
    }
  }

  toBeTruthy(): void {
    if (!this.actual) {
      throw new Error(`Expected truthy value, but got ${this.actual}`);
    }
  }

  toBeFalsy(): void {
    if (this.actual) {
      throw new Error(`Expected falsy value, but got ${this.actual}`);
    }
  }

  toContain(expected: any): void {
    if (!this.actual.includes(expected)) {
      throw new Error(`Expected ${this.actual} to contain ${expected}`);
    }
  }

  toThrow(): void {
    if (typeof this.actual !== 'function') {
      throw new Error('Expected a function');
    }
    
    try {
      this.actual();
      throw new Error('Expected function to throw, but it did not');
    } catch (error) {
      // Expected behavior
    }
  }

  toHaveLength(expected: number): void {
    if (this.actual.length !== expected) {
      throw new Error(`Expected length ${expected}, but got ${this.actual.length}`);
    }
  }

  toBeInstanceOf(expected: any): void {
    if (!(this.actual instanceof expected)) {
      throw new Error(`Expected instance of ${expected.name}, but got ${typeof this.actual}`);
    }
  }
}

export const testRunner = new TestRunner();
export { TestRunner, TestResult, TestSuite };
