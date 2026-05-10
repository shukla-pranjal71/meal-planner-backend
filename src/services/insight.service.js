import prisma from "../prisma/client.js";

export const generateInsights = async (flatId) => {
  const groceries = await prisma.grocery.findMany({
    where: { flatId },
  });

  const insights = [];

  const now = new Date();

  for (const item of groceries) {
    // 1. LOW quantity → urgent
    if (item.quantityLevel === "LOW") {
      insights.push({
        type: "LOW_STOCK",
        message: `Use ${item.ingredientName} soon (low stock)`,
      });
    }

    // 2. Not used recently
    if (item.lastUsedAt) {
      const diffDays =
        (now - new Date(item.lastUsedAt)) / (1000 * 60 * 60 * 24);

      if (diffDays > 2) {
        insights.push({
          type: "UNUSED",
          message: `${item.ingredientName} hasn't been used in ${Math.floor(diffDays)} days`,
        });
      }
    }
  }

  return insights;
};
