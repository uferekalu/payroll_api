import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ElementsService } from './elements.service';
import { CreateElementDto } from './dto/createElementDto';
import { Element } from 'src/entities/elements.entity';
import { UpdateElementDto } from './dto/updateElementDto';

@Controller('elements')
export class ElementsController {
  constructor(private readonly elementsService: ElementsService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.elementsService.findOne(id);
  }

  @Post()
  async create(@Body() createElementDto: CreateElementDto) {
    return await this.elementsService.create(createElementDto);
  }

  @Get()
  findAll(): Promise<Array<Element>> {
    return this.elementsService.findAll();
  }

  @Put(':id')
  updateElement(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateElementDto: UpdateElementDto,
  ) {
    return this.elementsService.updateElement(id, updateElementDto);
  }

  @Delete(':id')
  async deleteElement(@Param('id', ParseIntPipe) id: number) {
    await this.elementsService.deleteElement(id);
  }
}
