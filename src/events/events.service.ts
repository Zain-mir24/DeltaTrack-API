import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Application } from '../application/entities/application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) 
  private readonly eventRepository: Repository<Event>){}
  async create(createEventDto: CreateEventDto,application: Application) {
  try{
  const event = new Event();
    event.applicationId = application.id;
    event.timestamp = new Date(createEventDto.timestamp);
    event.type = createEventDto.type;
    event.message = createEventDto.message;
    event.stack = createEventDto.stack ?? null;
    event.lineno = createEventDto.lineno ?? null;
    event.colno = createEventDto.colno ?? null;
    event.source = createEventDto.source ?? null;
    const savedEvent = await this.eventRepository.save(event);
    return savedEvent;
  }catch(err){
    console.error('Error saving event:', err);
    throw err;
  }
  
  }
  /**
   * 
   * @returns Returns even for a specific project
   */
  findByApplicationId(applicationId: number) {
    return this.eventRepository.find({
      where: { applicationId },
    });
  }
 
  findOne() {
    return `This action returns  event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
