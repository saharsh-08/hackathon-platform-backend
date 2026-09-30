import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  BadRequestException,
} from "@nestjs/common";
import { HackathonService } from "./hackathon.service";
import {
  AllowAnonymous,
  Roles,
  Session,
  type UserSession,
} from "@thallesp/nestjs-better-auth";
import { CreateHackathonDto } from "./dto/create-hackathon.dto";
import { ResponseMessage } from "../../common/decorators/response-message.decorator";
import { UpdateHackathonDto } from "./dto/update-hackathon.dto";

@Controller("hackathon")
export class HackathonController {
  constructor(private readonly hackathonService: HackathonService) {}

  @Post()
  @Roles(["ADMIN"])
  @ResponseMessage("Hackathon created successfully")
  createHackathon(
    @Body() dto: CreateHackathonDto,
    @Session() session: UserSession,
  ) {
    return this.hackathonService.create(session.session.userId, dto);
  }

  @Get()
  @AllowAnonymous()
  @ResponseMessage("Hackathons retrieved successfully")
  getHackathons() {
    return this.hackathonService.findAll();
  }

  @Get(":id")
  @AllowAnonymous()
  @ResponseMessage("Hackathon retrieved successfully")
  getHackathonById(@Param("id") id: string) {
    return this.hackathonService.findOne(id);
  }

  @Patch(":id")
  @Roles(["ADMIN"])
  @ResponseMessage("Hackathon updated successfully")
  updateHackathon(@Param("id") id: string, @Body() dto: UpdateHackathonDto) {
    return this.hackathonService.update(id, dto);
  }

  @Delete(":id")
  @Roles(["ADMIN"])
  @ResponseMessage("Hackathon deleted successfully")
  deleteHackathon(@Param("id") id: string) {
    return this.hackathonService.delete(id);
  }

  @Post(":id/join")
  @Roles(["PARTICIPANT"])
  @ResponseMessage("Joined hackathon successfully")
  joinHackathon(@Session() session: UserSession, @Param("id") id: string) {
    return this.hackathonService.join(session, id);
  }
}
