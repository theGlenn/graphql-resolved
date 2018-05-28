export const wrap = resolverFunction => {
  return (...args) => new Promise((resolve, reject) => {
    try {
      return Promise.resolve(resolverFunction(...args)).then(r => resolve(r), e => reject(e));
    } catch (e) {
      return reject(e);
    }
  });
};