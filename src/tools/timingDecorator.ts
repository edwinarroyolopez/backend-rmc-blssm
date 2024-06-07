export const timingDecorator = (fn: Function, functionName: string) => {
    return async (...args: any[]) => {
      const start = Date.now();
      const result = await fn(...args);
      const end = Date.now();
      console.log(`Execution time for ${functionName}: ${end - start} ms`);
      return result;
    };
  };
  