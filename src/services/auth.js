import UserCollection from "../db/models/user.js";

export const register = async (payload) => {
  return UserCollection.create(payload);
};
