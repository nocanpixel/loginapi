import React from "react";
import usePayLoad from "./usePayLoad";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Profile({ logOut, userData }) {
    const response = usePayLoad(userData.x_token, logOut);

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

    return (
        <div className="App">
            <header className="App-header">
                {userData !== null && (
                    <>
                        {response===true&&(
                            <CloseSession/>
                        )}
                        <h1>User profile</h1>
                        <h1>Welcome {userData.email}</h1>
                        <button onClick={() => logOut()}>Log out</button>
                    </>
                )}
            </header>
        </div>
    )
}