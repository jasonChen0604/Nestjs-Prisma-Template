import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { JwtPayload } from 'src/auth/jwt-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Try to retrieve the JWT from request's cookies
      //--------------------------------------------------------------------------
      const request: Request = context.switchToHttp().getRequest();

      // token 等於 header的Authorization 的值
      const token: string = request.headers.authorization.split(' ')[1];

      if (!token) throw new UnauthorizedException();

      // Verify the JWT and check if it has been revoked
      //--------------------------------------------------------------------------
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      //   if (
      //     await this.prisma.revokedToken.findUnique({
      //       where: { jti: payload.jti },
      //     })
      //   )
      //     throw new UnauthorizedException();

      // Attach user's data to the request
      //--------------------------------------------------------------------------
      request.user = payload;

      return true;
    } catch (err: unknown) {
      throw new UnauthorizedException();
    }
  }
}
