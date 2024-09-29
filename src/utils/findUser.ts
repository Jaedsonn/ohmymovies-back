import prisma from "../prisma";

export async function findUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    throw new Error("User already exixts");
  }
}
