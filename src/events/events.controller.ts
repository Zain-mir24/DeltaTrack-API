import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApplicationService } from '../application/application.service';
import { CurrentApplication } from '../decorators/application.decorator';
import { Application } from '../application/entities/application.entity';
import { ProjectKeyGuard } from '../guards/project-key.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
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
    const createEvent = await this.eventsService.create(body, application);
    return { status: 'Event has been registered', event: createEvent };
  }

  @Get(':applicationId')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('applicationId', ParseIntPipe) applicationId: number) {
    return this.eventsService.findByApplicationId(applicationId);
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
