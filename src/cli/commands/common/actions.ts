export const verboseAction = (enabled: boolean) => {
  if (enabled) {
    process.env.VERBOSE = "true";
  }
};
