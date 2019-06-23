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
import {Box} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {Chart} from "react-google-charts";
import Typography from "@material-ui/core/Typography";

interface HomeProps {
}

interface HomeState {

}

export default class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {

        };
    }

    public  render() {

        return (
            <Container component="main" maxWidth="md">
                <Box m={6}/>
                        <Card>
                            <Grid container spacing={3}>
                                <Grid item xs>
                                    <Box p={3}>
                                        <Typography variant="h3">
                                            Select API to pull from
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box p={3}>
                                        <TextField
                                            id="outlined-uncontrolled"
                                            label="Uncontrolled"
                                            defaultValue="some.api.com"
                                            className={"textfield"}
                                            fullWidth
                                            margin="none"
                                            variant="outlined"
                                        />
                                    </Box>
                                    <Box paddingBottom={3} paddingLeft={3} paddingRight={3}>
                                        <Box width={1/6} display="inline-block">
                                            <Button
                                                type="button"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={"submit"}
                                            >
                                                Test
                                            </Button>
                                        </Box>
                                        <Box paddingLeft={2} width={1/6} display="inline-block">
                                            <Button
                                                type="button"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={"submit"}
                                            >
                                                Fetch
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>
            </Container>
        );
    }
}

