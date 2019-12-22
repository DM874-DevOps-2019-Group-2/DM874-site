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
import QueryableTable from "./QueryableTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import HostString from "../util/HostString";
import RunMode from "../util/RunMode";
import ApiInterface from "../util/ApiInterface";

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

interface SoogningProps extends WithStyles<typeof styles> {
}

interface SoogningState {
    isLoading: boolean

    emails: Array<string>
}

class SoogningC extends React.Component<SoogningProps, SoogningState> {
    constructor(props: SoogningProps) {
        super(props);
        this.state = {
            isLoading: false,
            emails: []
        };
    }

    private loadRender(): React.ReactNode {
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Box justifyContent="center" m={2}>
                        <CircularProgress/>
                    </Box>
                </Grid>
                <Box paddingBottom={5}/>
            </div>
        );
    }

    public componentDidMount(): void {
        const host = HostString;

        if (RunMode == "WithServer") {
            ApiInterface.allEmails(host).then((responseJson) => {
                this.setState({
                    isLoading: false,
                    emails: responseJson.emails
                })
            });
        } else {
            new Promise( resolve => setTimeout(resolve, 1000) ).then((value: unknown) => {
                this.setState({
                    isLoading: false,
                    emails: ["sagra16", "anmor16", "mkris16", "gajen16"]
                });
            })

        }
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
                                Køb
                            </Typography>
                            <Container maxWidth={"lg"}>
                                {(this.state.isLoading) ? this.loadRender() :
                                    <QueryableTable
                                        endpoint={"purchases"}
                                        emails={this.state.emails}
                                        topTableHead={["Navn", "Email", "Saldo"]}
                                        bottomTableHead={["Dato", "Total beløb", "Type", "Status", "Købs metode", "Antal"]}
                                    />
                                }
                            </Container>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className={this.props.classes.card}>
                            <Typography
                                variant={"h4"}
                                className={this.props.classes.title}
                            >
                                Indbetalinger
                            </Typography>
                            <Container maxWidth={"lg"}>
                                {(this.state.isLoading) ? this.loadRender() :
                                    <QueryableTable
                                        endpoint={"transactions"}
                                        emails={this.state.emails}
                                        topTableHead={["Navn", "Email", "Saldo"]}
                                        bottomTableHead={["Dato", "Beløb", "Status", "Type"]}
                                    />
                                }
                            </Container>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const Soogning = withStyles(styles)(SoogningC);

export default Soogning;