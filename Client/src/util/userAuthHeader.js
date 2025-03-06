// src/util/userAuthHeader.js

const userAuthHeader = async () => {
  const user = JSON.parse(localStorage.getItem("authToken"));

  if (user) {
    user.role = user.role;
    user.email = user.email;
    console.log(user);
    return user;
  } else {
    return {};
  }
};

export default userAuthHeader;
