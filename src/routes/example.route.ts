import { Router } from 'express';
import { ExampleController } from '@/controllers/example.controller';
import { SearchDto } from '@/dtos/example.dto';
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
    this.router.get(`${this.path}google`, this.example.searchGithubOnGoogle);
    this.router.post(`${this.path}`, ValidationMiddleware(SearchDto), this.example.searchOnGoogle);
  }
}
