import { Router } from 'express';
import { ExampleController } from '@/controllers/example.controller';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class ExampleRoute implements Routes {
  public path = '/';
  public router = Router();
  public example = new ExampleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.example.searchGoogle);
    this.router.get(`${this.path}/:id(\\d+)`, this.example.getUserById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.example.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateUserDto), this.example.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, this.example.deleteUser);
  }
}
