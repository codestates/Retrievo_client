// eslint-disable-next-line import/prefer-default-export
export const getProjectId = (currentPath: string): string => {
  const startIndex = currentPath.length;
  return window.location.pathname.slice(startIndex);
};
