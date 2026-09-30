import { Injectable, BadRequestException } from "@nestjs/common";
import { CreateHackathonDto } from "./dto/create-hackathon.dto";
import { PrismaService } from "../../database/prisma.service";
import { type UserSession } from "@thallesp/nestjs-better-auth";
import { UpdateHackathonDto } from "./dto/update-hackathon.dto";

@Injectable()
export class HackathonService {
  constructor(private readonly prismaService: PrismaService) {}

  create(authorId: string, dto: CreateHackathonDto) {
    return this.prismaService.hackathon.create({
      data: {
        ...dto,
        authorId,
      },
    });
  }

  findAll() {
    return this.prismaService.hackathon.findMany();
  }

  findOne(id: string) {
    return this.prismaService.hackathon.findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateHackathonDto) {
    return this.prismaService.hackathon.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  delete(id: string) {
    return this.prismaService.hackathon.delete({
      where: { id },
    });
  }

  async join(sessionInfo: UserSession, id: string) {
    try {
      const hackathon = await this.prismaService.hackathon.findUnique({
        where: { id },
      });
      if (!hackathon) {
        throw new BadRequestException(
          `Hackathon with ID: ${id} does not exist`,
        );
      }

      if (!hackathon.isActive) {
        throw new BadRequestException(`Hackathon with ID: ${id} is not active`);
      }
      if (hackathon.endDate < new Date()) {
        throw new BadRequestException(
          `Hackathon with ID: ${id} has already ended`,
        );
      }

      const hackathonParticipant =
        await this.prismaService.hackathonParticipant.create({
          data: {
            hackathonId: id,
            userId: sessionInfo.session.userId,
          },
        });
      return hackathonParticipant;
    } catch (error: any) {
      if (error?.code === "P2002") {
        throw new BadRequestException(
          `User with ID: ${sessionInfo.session.userId} has already joined the hackathon`,
        );
      }
      throw error;
    }
  }
}
