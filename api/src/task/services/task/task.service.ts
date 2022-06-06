import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../../models/dto/CreateTaskRequest';
import { UpdateTaskRequest } from '../../models/dto/updateTaskRequest';
import { Task, TaskStatus } from '../../models/entity/task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepo: Repository<Task>) {}

  public async createOne(createTaskRequest: CreateTaskDto) {
    return await this.taskRepo.save(createTaskRequest);
  }

  public async getAll() {
    return await this.taskRepo.find();
  }

  public async findById(id: number) {
    try {
      return await this.taskRepo.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new NotFoundException(`No task found with id ${id}`);
    }
  }

  public async updateOne(id: number, updateTaskRequest: UpdateTaskRequest) {
    const task: Task = await this.findById(id);

    const res = await this.taskRepo.update(id, updateTaskRequest);

    if (res.affected != 0) {
      return task;
    } else {
      throw new BadRequestException();
    }
  }

  public async deleteOne(id: number) {
    const task: Task = await this.findById(id);
    return await this.taskRepo.remove(task);
  }
}
