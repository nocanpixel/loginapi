import React from "react";
import usePayLoad from "./usePayLoad";
import { useForm } from "react-hook-form";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Profile({ logOut, userData,loginService }) {
    const response = usePayLoad(userData.x_token, logOut);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        logOut();
    };

    const CloseSession = () => {
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Se ha acabado tu sesion!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Por normas de seguridad vuelve a iniciar sesion :)
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                    <Button onClick={handleClose}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        )
    }

    const onSubmit = async (data) => {
        try {
            const updateUser = await loginService.userUpdate({
                id: userData.id,
                name: data.name,
                email: data.email,
                password: data.password,
                x_token: userData.x_token,
            });
            console.log(updateUser);

        }catch(error){
            console.error(error);
        }
        /*       try {
                const user = await loginService.login({
                  email: data.email,
                  password: data.password
                })
                if (user.x_token) {
                  console.log(user)
                  await loginService.userToken({
                    id: user.id,
                    pass: user.password
                  })
                }
              } catch (e) {
                console.log(e);
              } */
    }

    return (
        <div className="App">
            <header className="App-header">
                {userData !== null && (
                    <>
                        {response === true && (
                            <CloseSession />
                        )}
                        <h1>User profile</h1>
                        <h1>Welcome {userData.email}</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <input placeholder="name" value={userData.name} {...register('name', { required: true })} />
                                {errors.name?.type === 'required' && "Name is required"}
                            </div>
                            <div>
                                <input placeholder="email" value={userData.email} {...register('email', { required: true })} />
                                {errors.email?.type === 'required' && "Email"}
                            </div>
                            <div>
                                <input placeholder="password" {...register('password', { required: true })} />
                                {errors.password && "Password"}
                            </div>
                            <div>
                                <button type="submit">
                                    Save 
                                </button>
                            </div>
                        </form>
                        <br/>
                        <button onClick={() => logOut()}>Log out</button>
                    </>
                )}
            </header>
        </div>
    )
}