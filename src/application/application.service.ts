import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}



  /**
   * Create a new application for a user
   */
  async create(
    createApplicationDto: CreateApplicationDto,
    user: User,
  ): Promise<Application> {
    try{
      console.log(createApplicationDto.projectKey)
      const application = new Application();
      application.name = createApplicationDto.name;
      application.project_key = createApplicationDto.projectKey;
      application.userId = user.id;
      application.user = user;
  
      return await this.applicationRepository.save(application);
    }catch(e){
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: e.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e.message
      });;
    }
   
  }

  /**
   * Find all applications for a specific user
   */
  async findAll(userId: number): Promise<Application[]> {
    return await this.applicationRepository.find({
      where: { userId },
      order: { created_at: 'DESC' },
    });
  }

  /**
   * Find one application by ID (only if user is the owner)
   */
  async findOne(id: string ,userId: number): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { project_key: id },
    });

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    if (application.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this application',
      );
    }
  

    return application;
  }

  /**
   * Update an application (only if user is the owner)
   */
  async update(
    projectKey: string,
    updateApplicationDto: UpdateApplicationDto,
    userId: number,
  ): Promise<Application> {
    const application = await this.findOne(projectKey, userId);

    // Update only the fields that are provided
    if (updateApplicationDto.name) {
      application.name = updateApplicationDto.name;
    }

    return await this.applicationRepository.save(application);
  }

  /**
   * Remove an application (only if user is the owner)
   */
  async remove(projectKey: string, userId: number): Promise<void> {
    const application = await this.findOne(projectKey, userId);
    await this.applicationRepository.remove(application);
  }

  /**
   * Find application by project key (for public API access)
   */
  async findByProjectKey(projectKey: string): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { project_key: projectKey },
    });

    if (!application) {
      throw new NotFoundException('Invalid project key');
    }

    return application;
  }
}
