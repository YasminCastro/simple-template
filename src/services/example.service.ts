import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import puppeteer, { Page } from 'puppeteer';

@Service()
export class ExampleService {
  public async lauchPuppeteer(): Promise<Page> {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--window-size=1400,1080'],
    });

    let page = (await browser.pages())[0];
    await page.setViewport({ width: 1400, height: 1080 });
    return page;
  }

  public async searchGoogle(page: Page): Promise<Page> {
    console.log('Abrindo página https://www.google.com');
    await page.goto('https://www.google.com', {
      waitUntil: 'networkidle0',
    });

    //query do navegador
    //document.querySelector("textarea[type='search']")

    const TEXT_AREA = "textarea[type='search']']";

    console.log(`Digitando...`);
    await page.waitForSelector(TEXT_AREA);
    await page.type(TEXT_AREA, 'github');

    return page;
  }

  public async findAllUser(): Promise<User[]> {
    const users: User[] = UserModel;
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = UserModel.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: User): Promise<User> {
    const findUser: User = UserModel.find(user => user.email === userData.email);
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = { ...userData, id: UserModel.length + 1, password: hashedPassword };

    return createUserData;
  }

  public async updateUser(userId: number, userData: User): Promise<User[]> {
    const findUser: User = UserModel.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    const updateUserData: User[] = UserModel.map((user: User) => {
      if (user.id === findUser.id) user = { ...userData, id: userId, password: hashedPassword };
      return user;
    });

    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User[]> {
    const findUser: User = UserModel.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const deleteUserData: User[] = UserModel.filter(user => user.id !== findUser.id);
    return deleteUserData;
  }
}
