import { createUser, getUsers } from "../services/user.service.js";

export const createUserHandler = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await createUser(name, email);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUsersHandler = async (req, res) => {
  const users = await getUsers();
  res.json(users);
};
