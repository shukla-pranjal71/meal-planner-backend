import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.mealHistory.deleteMany();
  await prisma.recipe.deleteMany();

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
      {
        name: "Aloo Gobi",
        type: "veg",
        ingredientsRequired: ["Potato", "Cauliflower"],
        ingredientsOptional: ["Tomato"],
      },
      {
        name: "Bhindi Masala",
        type: "veg",
        ingredientsRequired: ["Bhindi", "Onion"],
        ingredientsOptional: ["Tomato"],
      },
      {
        name: "Chole",
        type: "veg",
        ingredientsRequired: ["Chole", "Onion", "Tomato"],
        ingredientsOptional: ["Garlic"],
      },
      {
        name: "Rajma",
        type: "veg",
        ingredientsRequired: ["Rajma", "Onion", "Tomato"],
        ingredientsOptional: [],
      },
      {
        name: "Mix Veg",
        type: "veg",
        ingredientsRequired: ["Carrot", "Beans", "Peas"],
        ingredientsOptional: ["Potato"],
      },
      {
        name: "Paneer Butter Masala",
        type: "veg",
        ingredientsRequired: ["Paneer", "Tomato", "Butter"],
        ingredientsOptional: ["Cream"],
      },
      {
        name: "Egg Bhurji",
        type: "non-veg",
        ingredientsRequired: ["Egg", "Onion"],
        ingredientsOptional: ["Tomato"],
      },
      {
        name: "Chicken Curry",
        type: "non-veg",
        ingredientsRequired: ["Chicken", "Onion", "Tomato"],
        ingredientsOptional: ["Garlic"],
      },
      {
        name: "Lauki Sabzi",
        type: "veg",
        ingredientsRequired: ["Lauki"],
        ingredientsOptional: ["Tomato"],
      },
      {
        name: "Moong Dal",
        type: "veg",
        ingredientsRequired: ["Moong Dal"],
        ingredientsOptional: ["Tomato"],
      },
    ],
  });

  console.log("Seeded recipes successfully");
}

main();
