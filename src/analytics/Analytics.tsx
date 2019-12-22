import 'date-fns';
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
import {Box, createStyles, Theme, WithStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {Chart} from "react-google-charts";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Economy from "./Economy";
import QueryEngine from "./QueryEngine";

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1
    },
    card: {
        paddingBottom: 50
    },
    title: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 5
    },
});

interface AnalyticsProps extends WithStyles<typeof styles> {
}

interface AnalyticsState {
}

class AnalyticsC extends React.Component<AnalyticsProps, AnalyticsState> {
    constructor(props: AnalyticsProps) {
        super(props);
        this.state = {
        };
    }

    public render() {
        return (
            <div className={this.props.classes.root}>
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <Card className={this.props.classes.card}>
                            <Typography
                                variant={"h4"}
                                className={this.props.classes.title}
                            >
                                Økonomi
                            </Typography>
                            <Container maxWidth={"lg"}>
                                <Economy />
                            </Container>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className={this.props.classes.card}>
                            <Typography
                                variant={"h4"}
                                className={this.props.classes.title}
                            >
                                Query
                            </Typography>
                            <Container maxWidth={"lg"}>
                                <QueryEngine/>
                            </Container>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const Analytics = withStyles(styles)(AnalyticsC);

export default Analytics;