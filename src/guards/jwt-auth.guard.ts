import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY,
      ) as { user_email: string; role: string };

      const user = await this.usersService.findByEmail(decoded.user_email);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.verified) {
        throw new UnauthorizedException('User not verified');
      }

      // Attach user to request object for use in controllers
      request.user = user;
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

