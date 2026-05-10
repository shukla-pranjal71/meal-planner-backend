import { generateInsights } from "../services/insight.service.js";

export const getInsightsHandler = async (req, res) => {
  try {
    const { flatId } = req.query;
    const insights = await generateInsights(flatId);
    res.json(insights);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
