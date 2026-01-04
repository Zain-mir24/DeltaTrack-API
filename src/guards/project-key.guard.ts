import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ApplicationService } from '../application/application.service';

@Injectable()
export class ProjectKeyGuard implements CanActivate {
  constructor(private readonly applicationService: ApplicationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const projectKey = request.headers['x-project-key'];

    if (!projectKey) {
      throw new UnauthorizedException('Project key is required');
    }

    try {
      const application = await this.applicationService.findByProjectKey(
        projectKey,
      );

      // Attach application to request object for use in controllers
      request.application = application;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid project key');
    }
  }
}

