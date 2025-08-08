import '../style.css';
import { Router } from './router';
import { Index } from './pages/index';
import { Login } from './pages/login';
import { Game } from './pages/game';
import { Tournament } from './pages/tournament';
import { Profile } from './pages/profile';
import { Register } from './pages/register';
//import { ForgotPassword } from './pages/forgot-password';

const app = Router.getInstance();

app.register('/', Index);
app.register('/login', Login);
app.register('/game', Game);
app.register('/tournament', Tournament);
app.register('/profile', Profile);
app.register('/register', Register);
//app.register('/forgot-password', ForgotPassword);
//

app.launch();
