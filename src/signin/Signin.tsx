import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {Link as RouterLink, Redirect} from 'react-router-dom';
import '../index.css';
import Cookies from "js-cookie";

interface SignInProps {
}

interface SignInState {
    username: string | null;
    password: string | null;
    loginError: string | null;
    loggedIn: boolean;
}

export default class Signin extends React.Component<SignInProps, SignInState> {
    constructor(props: SignInProps) {
        super(props);
        this.state = {
            username: null,
            password: null,
            loginError: null,
            loggedIn: false
        };
    }

    public handleSubmit = (event: any) => {
        axios.post("/login", this.state).then((r) => {
            const asString = (r.data as string);
            if (asString.startsWith("Token:")) {
                Cookies.set("dm874_jwt", asString.slice("Token:".length));
                this.setState({loggedIn: true});
            } else {
                this.setState({loginError: asString});
            }
        });
    };

    public  render() {

        if (this.state.loggedIn) {
            return <Redirect to={"/home"}/>;
        }

        return (
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
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link component={RouterLink} to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Container>
        );
    }
}

//export default withStyles(signinStyle, {withTheme: true})(Signin as any) as any;
