export function throttle<T extends (...args: Parameters<T>) => void>(
  fn: T,
  timeout = 500
) {
  let isStartted = false;

  return (...args: Parameters<T>) => {
    if (!isStartted) {
      isStartted = true;

      fn(...args);

      setTimeout(() => {
        isStartted = false;
      }, timeout);
    }
  };
}
