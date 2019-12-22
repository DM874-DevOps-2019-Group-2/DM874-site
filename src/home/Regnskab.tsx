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
    KeyboardDatePicker, DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CircularProgress from "@material-ui/core/CircularProgress";
import * as Cookies from "js-cookie";
import IconButton from "@material-ui/core/IconButton";
import Explore from "@material-ui/core/SvgIcon/SvgIcon";
import ApiInterface from "../util/ApiInterface";
import HostString from "../util/HostString";
import RunMode from "../util/RunMode";

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

interface RegnskabProps extends WithStyles<typeof styles> {
}

interface RegnskabState {
    isLoading: boolean
    rows: Array<RowData>
}


type RowData = [string, string];

interface ResponseJson {
    rows: Array<RowData>
}


class RegnskabC extends React.Component<RegnskabProps, RegnskabState> {
    constructor(props: RegnskabProps) {
        super(props);
        this.state = {
            isLoading: false,
            rows: []
        };
    }

    public componentDidMount(): void {
    this.fetchData()
    }

    private fetchData(): void {
        const host = HostString;

        if (RunMode == "WithServer") {
            ApiInterface.getAuthenticated<ResponseJson>("/admin/accounting", host).then((responseJson: ResponseJson) => {
                this.setState({
                    rows: responseJson.rows,
                    isLoading: false
                });
            });
        } else {
            new Promise( resolve => setTimeout(resolve, 1000) ).then((value: unknown) => {
                this.setState({
                    rows: [
                        [ "Totale antal streger sat", "16253"],
                        [ "Totalt beløb af streger", "90943.00"],
                        [ "Totalt beløb af indbetalinger", "124865.00"],
                        [ "Totalt beløb af udbetalinger", "9607.50"],
                        [ "Total sum af saldoer*", "2066.50"],
                        [ "Gennemsnitlig saldo*", "2.492762"],
                        [ "Total sum af negative saldoer*", "-19279.00"],
                        [ "Total sum af positive saldoer*", "21345.50"]
                    ],
                    isLoading: false
                });
            });
        }
    }

    private renderLoader(): React.ReactNode | null {
        if (this.state.isLoading) {
            return (
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
            );
        } else {
            return null;
        }
    }

    public renderTableWhenLoaded(): React.ReactNode | null {
        if (this.state.isLoading) {
            return null;
        } else {
            return (
                <TableBody>
                    {this.state.rows.map((row: RowData) => {
                        return (
                            <TableRow>
                                <TableCell align="left">{row[0]}</TableCell>
                                <TableCell align="left">{row[1]}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            );
        }
    }

    public render() {
        return (
            <div>
                <Box paddingBottom={3} />
                <Card>
                    <Table>
                        {this.renderTableWhenLoaded()}
                    </Table>
                    {this.renderLoader()}
                </Card>
            </div>
        );
    }
}


const Regnskab = withStyles(styles)(RegnskabC);

export default Regnskab;