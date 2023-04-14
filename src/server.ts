import { App } from '@/app';
import { ExampleRoute } from '@/routes/example.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new ExampleRoute()]);

app.listen();
