export const setUUID = (userId) => {
  localStorage.setItem("UnoUUID", userId);
};

export const getUUID = () => {
  localStorage.getItem("UnoUUID");
};

export const removeUUID = () => {
  localStorage.removeItem("UnoUUID");
};
