import { CanActivate, ExecutionContext,ForbiddenException,Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ProjectTokenGuard implements CanActivate {
  projectsService: any;
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers['x-project-token'];

    if (!token) throw new UnauthorizedException();

    const project = await this.projectsService.findByToken(token);
    if (!project) throw new UnauthorizedException();

    req.project = project;
    return true;
  }
}