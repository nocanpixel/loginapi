import './App.css';
import { useForm } from 'react-hook-form';
import loginService from './services/login';
import jwt from 'jwt-simple';
import { useUser } from './hooks/useUser';
import moment from 'moment';

function App() {
  const { userData, setUserData } = useUser();
  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const user = await loginService.login({
        email: data.email,
        password: data.password
      })
      if (user.x_token) {
        await loginService.userToken({
          id: user.id,
          x_token: user.x_token,
        })
        window.localStorage.setItem(
          'loggedAppUser', JSON.stringify(user)
        )
        setUserData(user)
      } else {
        console.log('Contraseña o usuario incorrectos')
      }
    } catch (e) {
      console.log(e);
    }

  }

  const logOut = () => {
    const userLogout = window.localStorage.clear();
    setUserData(null);
  }

  if (userData !== null) {
    const x_token = userData.x_token;
    let payload = {}
    payload = jwt.decode(x_token, 'Nocan');
    payload.expiredAt < moment().unix() && logOut();
    console.log(payload.expiredAt,' - ', 'Current : ', moment().unix());
  }
  return (
    <div className="App">
      <header className="App-header">
        {userData !== null && !userData.error ? (
          <>
            <h1>Welcome {userData.email}</h1>
            <button onClick={() => logOut()}>Log out</button>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input placeholder="email" {...register('email', { required: true })} />
              {errors.email?.type === 'required' && "First name is required"}
            </div>
            <div>
              <input placeholder="password" {...register('password', { required: true })} />
              {errors.password && "Last name is required"}
            </div>
            <div>
              <button type="submit">
                Login
              </button>
            </div>
          </form>

        )}
      </header>
    </div>
  );
}

export default App;
