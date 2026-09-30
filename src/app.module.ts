import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "./utils/auth";
import { UserModule } from "./module/user/user.module";
import { HackathonModule } from "./module/hackathon/hackathon.module";

@Module({
  imports: [AuthModule.forRoot({ auth }), UserModule, HackathonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
