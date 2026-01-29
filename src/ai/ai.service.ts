import { Injectable } from '@nestjs/common';
import { ErrorsSummaryResponseDto } from './dto/create-ai.dto';
import { UpdateAiDto } from './dto/update-ai.dto';
import { EventsService } from '../events/events.service';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly openai: OpenAI;

  constructor(private readonly eventsService: EventsService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  create(createAiDto: any) {
    return 'This action adds a new ai';
  }

  findAll() {
    return `This action returns all ai`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ai`;
  }

  update(id: number, updateAiDto: UpdateAiDto) {
    return `This action updates a #${id} ai`;
  }

  remove(id: number) {
    return `This action removes a #${id} ai`;
  }

  /**
   * Generate an AI summary of errors for a given application and date range.
   */
  async summarizeErrorsForRange(
    applicationId: number,
    from: Date,
    to: Date,
  ) {
    const events = await this.eventsService.findByApplicationIdAndDateRange(
      applicationId,
      from,
      to,
    );

    const total = events.length;
    const byType: Record<string, number> = {};
    const sampleMessages: string[] = [];
    if(events.length===0) return "No error events found in the given date range.";
    

    for (const ev of events) {
      byType[ev.type] = (byType[ev.type] ?? 0) + 1;
      if (sampleMessages.length < 20 && ev.message) {
        sampleMessages.push(
          `[${ev.type}] ${ev.message} (source: ${ev.source ?? 'n/a'})`,
        );
      }
    }

    const prompt = `
You are analyzing error monitoring data for a web/application project.

Time window: ${from.toISOString()} to ${to.toISOString()}
Total error events: ${total}

Counts by type:
${Object.entries(byType)
  .map(([type, count]) => `- ${type}: ${count}`)
  .join('\n')}

Sample error messages:
${sampleMessages.join('\n')}

Please provide:
- A short high-level summary of what happened this period.
- Key error categories and probable root causes.
- Any noticeable trends or spikes you can infer.
- 3–5 concrete suggestions to reduce these errors.
Keep it concise and non-technical-product-owner friendly.
`;

    const completion = await this.openai.responses.create({
      model: 'gpt-5-mini',
      input: prompt,
    });
    console.log('AI completion response:', completion);

    const aiSummary = completion.output_text?.trim() ?? 'No summary generated.';
      

    return {
      from,
      to,
      total,
      byType,
      sampleMessages,
      aiSummary,
    };
  }
}
