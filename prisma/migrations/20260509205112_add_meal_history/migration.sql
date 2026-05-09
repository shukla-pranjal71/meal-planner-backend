-- CreateTable
CREATE TABLE "MealHistory" (
    "id" TEXT NOT NULL,
    "flatId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MealHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MealHistory" ADD CONSTRAINT "MealHistory_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
