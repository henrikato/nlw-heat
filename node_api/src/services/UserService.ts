import prismaClient from "../prisma"

class UserService {
  async getById (id: string) {
    let result = await prismaClient.user.findUnique({
      where: { id }
    });

    return result;
  }
}

export { UserService }