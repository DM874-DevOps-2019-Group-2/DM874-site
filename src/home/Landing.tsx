import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {Theme, withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { flexbox } from '@material-ui/system';
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const registerStyle = (theme: Theme) => ({
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

interface RegisterProps {
    classes?: any;
}

interface RegisterState {

}

class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {

        };
    }



    public  render() {
        const classes = this.props.classes;

        return (
            <h1>Hey</h1>
        );
    }
}

export default withStyles(registerStyle, {withTheme: true})(Register as any) as any;
