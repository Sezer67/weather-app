export const getWindowSize = () => {
  const { innerHeight, innerWidth } = window;
  return { innerWidth, innerHeight };
};
