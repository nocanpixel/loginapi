import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Login({userData, logOut, loginService,dummyFunction,setUserData}){
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    
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
          dummyFunction(user.x_token);
          navigate('/profile');
        } else {
          console.log('Contraseña o usuario incorrectos')
        }
      } catch (e) {
        console.log(e);
      }
  
    }

    return(
        <div className="App">
        <header className="App-header">
          <h1>Iniciar sesion</h1>
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
        
    )
}