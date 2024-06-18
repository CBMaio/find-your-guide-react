const generateRandomToken = function () {
  return Math.random().toString(36).substring(2, 6);
};

export const userMockData = {
  picture: "../assets/images/author-profile.png",
  name: "Usuario",
  degree: "dev",
  userToken: generateRandomToken(),
};
