import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {Theme, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { flexbox } from '@material-ui/system';
import axios from 'axios';
import {Link as RouterLink, Redirect} from 'react-router-dom';

const signinStyle = (theme: Theme) => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    papers: {
        marginTop: theme.spacing(8),
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

interface SignInProps {
    classes?: any;
}

interface SignInState {
    username: string | null;
    password: string | null;
    loginError: string | null;
    loggedIn: boolean;
}

class Signin extends React.Component<SignInProps, SignInState> {
    constructor(props: SignInProps) {
        super(props);
        this.state = {
            username: null,
            password: null,
            loginError: null,
            loggedIn: false
        };
    }

    componentDidMount = (): void => {
        const jwt = localStorage.getItem("dm874-jwt");

        if (jwt == null) {
        }
    };

    public handleSubmit = (event: any) => {
        axios.post("/login", this.state).then((r) => {
            const asString = (r.data as string);
            if (asString.startsWith("Token:")) {
                document.cookie = "dm874_jwt=" + asString.slice("Token:".length);
                console.log(document.cookie);
                this.setState({loggedIn: true});
            } else {
                this.setState({loginError: asString});
            }
        });
    };

    public  render() {
        const classes = this.props.classes;

        if (this.state.loggedIn) {
            return <Redirect to={"/home"}/>;
        }

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.papers}>
                    <div className={classes.form}>
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
                            className={classes.submit}
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

export default withStyles(signinStyle, {withTheme: true})(Signin as any) as any;
