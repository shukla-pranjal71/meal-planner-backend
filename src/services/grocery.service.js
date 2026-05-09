import prisma from "../prisma/client.js";

export const addOrUpdateGroceries = async (flatId, items) => {
  const results = [];

  for (const item of items) {
    const result = await prisma.grocery.upsert({
      where: {
        flatId_ingredientName: {
          flatId,
          ingredientName: item.ingredientName,
        },
      },
      update: {
        quantityLevel: item.quantityLevel,
        isAvailable: item.isAvailable,
      },
      create: {
        flatId,
        ingredientName: item.ingredientName,
        quantityLevel: item.quantityLevel,
        isAvailable: item.isAvailable,
      },
    });

    results.push(result);
  }

  return results;
};

export const getGroceries = async (flatId) => {
  return prisma.grocery.findMany({
    where: { flatId },
  });
};
