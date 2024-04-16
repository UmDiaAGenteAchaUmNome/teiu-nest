import { Controller, Get } from '@nestjs/common';

@Controller('temp')
export class TempController {
    @Get('cron')
    public upApiCronJob() {
        console.log("=== CRON JOB ===")
        return { cron: true }
    }
}
