import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('applications')
@Controller('applications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Application created successfully' })
  create(
    @Body() createApplicationDto: CreateApplicationDto,
    @CurrentUser() user: User,
  ) {
    return this.applicationService.create(createApplicationDto, user);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all applications for the authenticated user' })
  findAll(@CurrentUser() user: User) {
    return this.applicationService.findAll(user.id);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns a specific application' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Application not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Access denied' })
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.applicationService.findOne(id, user.id);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Application updated successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Application not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Access denied' })
  update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @CurrentUser() user: User,
  ) {
    return this.applicationService.update(id, updateApplicationDto, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Application deleted successfully' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Application not found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Access denied' })
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.applicationService.remove(id, user.id);
  }
}
