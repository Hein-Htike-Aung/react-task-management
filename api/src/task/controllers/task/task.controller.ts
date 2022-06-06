import { UpdateTaskRequest } from './../../models/dto/updateTaskRequest';
import { create } from 'domain';
import { TaskService } from './../../services/task/task.service';
import { CreateTaskDto } from './../../models/dto/CreateTaskRequest';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createOne(@Body() createTaskRequest: CreateTaskDto) {
    return await this.taskService.createOne(createTaskRequest);
  }

  @Get()
  async getAll() {
    return await this.taskService.getAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.taskService.findById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: number,
    @Body() updateTaskRequest: UpdateTaskRequest,
  ) {
    return await this.taskService.updateOne(id, updateTaskRequest);
  }

  @Delete(':id')
  @HttpCode(203)
  async deleteById(@Param('id') id: number) {
    return await this.taskService.deleteOne(id);
  }
}
