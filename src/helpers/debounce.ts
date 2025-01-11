export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  timeout = 500
) {
  let timer: null | ReturnType<typeof setTimeout> = null;
  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
}
