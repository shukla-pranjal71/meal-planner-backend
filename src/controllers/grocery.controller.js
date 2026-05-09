import {
  addOrUpdateGroceries,
  getGroceries,
} from "../services/grocery.service.js";

export const addGroceriesHandler = async (req, res) => {
  try {
    const { flatId, items } = req.body;
    const result = await addOrUpdateGroceries(flatId, items);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getGroceriesHandler = async (req, res) => {
  try {
    const { flatId } = req.query;
    const groceries = await getGroceries(flatId);
    res.json(groceries);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
