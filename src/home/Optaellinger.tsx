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
import TableHead from "@material-ui/core/TableHead";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Explore from '@material-ui/icons/Explore';
import IconButton from "@material-ui/core/IconButton";
import * as Cookies from "js-cookie";
import CircularProgress from "@material-ui/core/CircularProgress";
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
    fab: {
        position: 'absolute'
    },
});

interface OptaellingerProps extends WithStyles<typeof styles> {
    openSpecefic: (id: number) => void
}

type RowData = [string, string, number];

interface OptaellingerState {
    isLoading: boolean
    rows: Array<RowData>
    progress: number
}

interface ResponseJson {
    rows: Array<RowData>
}

class OptaellingerC extends React.Component<OptaellingerProps, OptaellingerState> {
    constructor(props: OptaellingerProps) {
        super(props);
        this.state = {
            isLoading: true,
            rows: [],
            progress: 0
        };
    }

    public componentDidMount(): void {
        const host = HostString;

        if (RunMode == "WithServer") {
            ApiInterface.getAuthenticated<ResponseJson>("/admin/counts", host).then((responseJson: ResponseJson) => {
                this.setState({
                    rows: responseJson.rows,
                    isLoading: false
                });
            });
        } else {
            new Promise( resolve => setTimeout(resolve, 1000) ).then((value: unknown) => {
                this.setState({
                    rows: [
                        [(new Date(Date.now())).toLocaleDateString(), "Optalt", 1],
                        [(new Date(Date.now())).toLocaleDateString(), "Optalt", 2],
                        [(new Date(Date.now())).toLocaleDateString(), "Optalt", 3],
                        [(new Date(Date.now())).toLocaleDateString(), "Optalt", 4],
                        [(new Date(Date.now())).toLocaleDateString(), "Optalt", 5]
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
                    {this.state.rows.map((row: RowData, index: number) => {
                        return (
                            <TableRow key={index}>
                                <TableCell align="left">{row[2]}</TableCell>
                                <TableCell align="left">{row[0]}</TableCell>
                                <TableCell align="left">{row[1]}</TableCell>
                                <TableCell align="left">
                                    <IconButton aria-label="delete" onClick={((e: any) => this.props.openSpecefic(row[2]))}>
                                        <Explore fontSize="default" />
                                    </IconButton>
                                </TableCell>
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
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="left">Dato</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                            {this.renderTableWhenLoaded()}
                    </Table>
                    {this.renderLoader()}
                </Card>
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                >
                    <Fab color="primary" aria-label="add" className={this.props.classes.fab}>
                        <AddIcon />
                    </Fab>
                </Grid>
            </div>
        );
    }
}

const Optaellinger = withStyles(styles)(OptaellingerC);

export default Optaellinger;