import { CanActivate, ExecutionContext,ForbiddenException,Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ApplicationService } from "src/application/application.service";

@Injectable()
export class ProjectOwnerGuard implements CanActivate{
    constructor(private readonly applicationService:ApplicationService){}
  async  canActivate(context: ExecutionContext):Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user= request.user.id;
    const projectId = request.user.id;
    const project = await this.applicationService.findOne(projectId,user); //we can find the application with the token
    if (!project ) {
        throw new ForbiddenException('You do not own this project');
      }
  
      request.project = project; // optional, for reuse in controller
      return true;
    }
}