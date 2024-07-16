export const camelToSentenceCase = (value) => {
  return value.split("_").join(" ");
};

export const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
