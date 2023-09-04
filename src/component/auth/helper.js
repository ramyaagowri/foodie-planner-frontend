export const updateUser = (state, setState, purpose, value) => {
  let temp = { ...state };
  temp[purpose] = value;
  setState({ ...temp });
};
