export class CreateEventDto {
    type: string;
    message: string;
    stack: string;
    timestamp: Date;
    lineno?: number;
    colno?: number;
    source?: string;
}
