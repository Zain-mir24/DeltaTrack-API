import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
    @ApiProperty({ description: 'Event type (e.g. error, info, warning)', example: 'error' })
    type: string;

    @ApiProperty({ description: 'Human-readable message for the event', example: 'Unhandled exception in handler' })
    message: string;

    @ApiProperty({ description: 'Stack trace or additional debug info', example: 'Error: Something went wrong\n    at Object.<anonymous> (app.js:10:15)' })
    stack?: string;

    @ApiProperty({ description: 'Event timestamp (ISO 8601)', example: '2026-01-04T12:34:56.789Z', type: String, format: 'date-time' })
    timestamp: Date;

    @ApiProperty({ description: 'Optional line number where the event occurred', example: 123, required: false })
    lineno?: number;

    @ApiProperty({ description: 'Optional column number where the event occurred', example: 45, required: false })
    colno?: number;

    @ApiProperty({ description: 'Optional source file or URL', example: 'https://example.com/static/app.js', required: false })
    source?: string;
}
