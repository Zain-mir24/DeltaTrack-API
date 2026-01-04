import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApplicationService } from '../application/application.service';
import { CurrentApplication } from '../decorators/application.decorator';
import { Application } from '../application/entities/application.entity';
import { ProjectKeyGuard } from '../guards/project-key.guard';
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly applicationService: ApplicationService,
  ) {}

  @Post('ingest')
  @UseGuards(ProjectKeyGuard)
  async ingestEvent(
    @Body() body: CreateEventDto,
    @CurrentApplication() application: Application,
  ) {
   
    console.log('Application:', application);
    console.log('📥 EVENT RECEIVED');
    console.log('Project:', application.project_key);
    console.log('Payload:', body);

    const createEvent = await this.eventsService.create(body,application);

    return { status: 'ok' };
  }
 

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
