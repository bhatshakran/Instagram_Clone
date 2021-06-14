export const hideAlert = (ref, timeout = 2000) => {
  setTimeout(() => {
    if (ref.current !== null) ref.current.style.display = "none";
  }, timeout);
};
