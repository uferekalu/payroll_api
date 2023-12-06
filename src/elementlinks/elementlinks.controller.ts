import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ElementlinksService } from './elementlinks.service';
import { CreateElementLinkDto } from './dto/createElementLinkDto';
import { UpdateElementLinkDto } from './dto/updateElementLinkDto';
import { IElementLink } from './interface/elementLinks';

@Controller('elementlinks')
export class ElementlinksController {
  constructor(private readonly elementlinkService: ElementlinksService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.elementlinkService.findOne(id);
  }

  @Post(':id')
  async create(
    @Param('id', ParseIntPipe) id: number,
    @Body() createElementLinkDto: CreateElementLinkDto,
  ) {
    return await this.elementlinkService.create(id, createElementLinkDto);
  }

  @Get(':id/all')
  findAll(@Param('id') id: number): Promise<Array<IElementLink>> {
    return this.elementlinkService.findAll(id);
  }

  @Get(':elementId/elementlinks/:id')
  getAnElementLink(
    @Param('elementId', ParseIntPipe) elementId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IElementLink> {
    return this.elementlinkService.getAnElementLink(elementId, id);
  }

  @Put(':elementId/:id')
  updateElementLink(
    @Param('elementId', ParseIntPipe) elementId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateElementLinkDto: UpdateElementLinkDto,
  ) {
    return this.elementlinkService.updateElementLink(
      elementId,
      id,
      updateElementLinkDto,
    );
  }

  @Delete(':elementId/:id')
  async deleteElementLink(
    @Param('elementId', ParseIntPipe) elementId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.elementlinkService.deleteElementLink(elementId, id);
  }
}
