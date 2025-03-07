// src/util/userAuthHeader.js

const userAuthHeader = async () => {
  const user = JSON.parse(localStorage.getItem("authToken"));
  console.log(user);
  if (user) {
    user.role = user.role;
    user.email = user.email;
    return user;
  } else {
    return {};
  }
};

export default userAuthHeader;
