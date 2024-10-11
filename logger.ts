export const logInfo = (...args: string[]) => {
  console.log(new Date().toLocaleString(), '[INFO]', ...args);
};

export const logError = (...args: string[]) => {
  console.log(new Date().toLocaleString(), '[ERROR]', ...args);
};
