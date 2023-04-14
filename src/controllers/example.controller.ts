import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ExampleService } from '@/services/example.service';

export class ExampleController {
  public example = Container.get(ExampleService);

  public searchGithubOnGoogle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = await this.example.lauchPuppeteer();
      await this.example.searchGoogle(page, 'github');

      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  };

  public searchOnGoogle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = await this.example.lauchPuppeteer();
      await this.example.searchGoogle(page, req.body.text);

      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  };
}
