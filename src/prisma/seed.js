import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.recipe.createMany({
    data: [
      {
        name: "Aloo Tamatar",
        type: "veg",
        ingredientsRequired: ["Potato", "Tomato"],
        ingredientsOptional: ["Onion"],
      },
      {
        name: "Dal Tadka",
        type: "veg",
        ingredientsRequired: ["Dal", "Tomato"],
        ingredientsOptional: ["Garlic"],
      },
      {
        name: "Paneer Bhurji",
        type: "veg",
        ingredientsRequired: ["Paneer", "Onion", "Tomato"],
        ingredientsOptional: ["Capsicum"],
      },
    ],
  });
}

main();
