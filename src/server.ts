import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { ExampleRoute } from '@/routes/example.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new ExampleRoute(), new AuthRoute()]);

app.listen();
