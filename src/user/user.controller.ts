import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { Roles, Session, type UserSession } from "@thallesp/nestjs-better-auth";
import { ResponseMessage } from "../common/decorators/response-message.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("all")
  @ResponseMessage("Successfully retrieved all users")
  @Roles(["ADMIN"])
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ResponseMessage("Successfully retrieved user by ID")
  findOne(@Param("id") id: string, @Session() session: UserSession) {
    return this.userService.findOne(id, session);
  }
}
