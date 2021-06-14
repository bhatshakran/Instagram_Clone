export const hideAlert = (ref, timeout = 6000) => {
  setTimeout(() => {
    ref.current.style.display = "none";
  }, timeout);
};
