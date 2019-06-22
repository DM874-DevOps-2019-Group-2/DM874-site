import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

interface RegisterProps {
}

interface RegisterState {
    username: string | null;
    password: string | null;
    showDialogue: boolean;
}

export default class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
            username: null,
            password: null,
            showDialogue: false
        };
    }


    public handleSubmit = (event: any) => {
        axios.post("/register", this.state).then((r) => {
            console.log(r);
        }).then((r) => {
            this.setState({showDialogue: true});
        });
    };

    public  render() {
        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={"papers"}>
                        <div className={"form"}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={attr => this.setState({username: attr.target.value})}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={attr => this.setState({password: attr.target.value})}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={"submit"}
                                onClick={this.handleSubmit}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link component={RouterLink} to="/signin" variant="body2">
                                        {"Sign in"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </Container>
                <Dialog
                    open={this.state.showDialogue}
                    onClose={(x) => this.setState({showDialogue: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"You have successfully registered."}</DialogTitle>
                    <DialogActions>
                        <Button onClick={(x) => this.setState({showDialogue: false})} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

