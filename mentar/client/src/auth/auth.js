const auth = (userId) => {
  if (userId) {
    return true;
  }

  return false;
};
export default auth;
