import { ADD_NUMBER, SUB_NUMBER } from "./constants.js";
// 实际开发应该把action作为函数
// export function addAction(num) {
//   return {
//     type: "ADD_NUMBER",
//     num,
//   };
// }

export const addAction = (num) => {
  return {
    type: ADD_NUMBER,
    num,
  };
};
export const subAction = (num) => {
  return {
    type: SUB_NUMBER,
    num,
  };
};
