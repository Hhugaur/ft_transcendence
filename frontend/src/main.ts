import { Router } from './router';
import { Index } from './pages/index';
import { Test } from './pages/test';

const app = Router.getInstance();

app.register('/', Index);
app.register('/test', Test);

app.launch();
