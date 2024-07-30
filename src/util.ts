export const getWindow = (inBrowser: boolean): Window => {
  if (inBrowser) {
    return window;
  }

  return {
    document: {
      documentElement: {},
    },
    addEventListener: () => null,
    dispatchEvent: () => true,
    getComputedStyle: () => ({
      getPropertyValue: () => '',
    }),
  } as unknown as Window;
};
