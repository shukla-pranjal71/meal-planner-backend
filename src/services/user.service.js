import prisma from "../prisma/client.js";

export const createUser = async (name, email) => {
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new Error("User already exists");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      flat: {
        create: {
          name: `${name}'s Flat`,
        },
      },
    },
    include: {
      flat: true,
    },
  });

  return user;
};

export const getUsers = async () => {
  return prisma.user.findMany({
    include: { flat: true },
  });
};
