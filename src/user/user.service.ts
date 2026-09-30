import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { UserSession } from "@thallesp/nestjs-better-auth";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: string, session: UserSession) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user || user.id !== session.session.userId) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }
    return user;
  }
}
