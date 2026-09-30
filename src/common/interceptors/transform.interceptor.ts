import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpStatus,
} from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { RESPONSE_MESSAGE_KEY } from "../decorators/response-message.decorator";

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const statusCode =
      context.switchToHttp().getResponse<{ statusCode: number }>().statusCode ||
      HttpStatus.OK;
    const message =
      this.reflector.get<string[]>(
        RESPONSE_MESSAGE_KEY,
        context.getHandler(),
      ) || "Success";
    return next.handle().pipe(
      map((data: T) => ({
        statusCode,
        message,
        data,
      })),
    );
  }
}
