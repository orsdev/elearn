
export const findByAttr = (wrapper, value) => {
 return wrapper.find(`[data-test='${value}']`);
};