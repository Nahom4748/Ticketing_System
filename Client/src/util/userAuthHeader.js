// src/util/userAuthHeader.js

const userAuthHeader = async () => {
  const user = JSON.parse(localStorage.getItem("authToken"));
  console.log(user.token);

  if (user && user.token) {
    const decodedToken = decodeTokenPayload(user.user_token);
    user.user_role = decodedToken.user_role;
    user.user_id = decodedToken.user_id;
    user.user_first_name = decodedToken.user_first_name;
    user.user_last_name = decodedToken.user_last_name;
    return user;
  } else {
    return {};
  }
};

const decodeTokenPayload = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export default userAuthHeader;
