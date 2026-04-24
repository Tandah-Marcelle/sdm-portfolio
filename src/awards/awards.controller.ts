import { Controller, Get } from '@nestjs/common';
import { AwardsService } from './awards.service';

@Controller('awards')
export class AwardsController {
    constructor(private readonly awardsService: AwardsService) { }

    @Get()
    findAll() {
        return this.awardsService.findAll();
    }
}
