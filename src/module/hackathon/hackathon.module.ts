import { Module } from "@nestjs/common";
import { HackathonService } from "./hackathon.service";
import { HackathonController } from "./hackathon.controller";
import { PrismaService } from "../../database/prisma.service";

@Module({
  controllers: [HackathonController],
  providers: [HackathonService, PrismaService],
})
export class HackathonModule {}
