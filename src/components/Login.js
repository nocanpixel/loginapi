import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


export default function Login({userData, logOut, loginService,setUserData}){
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    
    
    const onSubmit = async (data) => {
      try {
        const user = await loginService.login({
          email: data.email,
          password: data.password
        })
        if (user.x_token) {
          console.log(user)
          await loginService.userToken({
            id: user.id,
            x_token: user.x_token,
          })
          window.localStorage.setItem(
            'loggedAppUser', JSON.stringify(user)
          )
          setUserData(user)
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
        </header>
      </div>
        
    )
}