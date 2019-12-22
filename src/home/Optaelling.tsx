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
import Regnskab from "./Regnskab";
import Optaellinger from "./Optaellinger";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import * as Cookies from "js-cookie";
import IconButton from "@material-ui/core/IconButton";
import Explore from "@material-ui/core/SvgIcon/SvgIcon";
import TableHead from "@material-ui/core/TableHead";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import ApiInterface from "../util/ApiInterface";
import RunMode from "../util/RunMode";
import HostString from "../util/HostString";

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

interface OptaellingProps extends WithStyles<typeof styles> {
    optaellingId: number
}

interface OptaellingState {
    optaellingOpen: null | number
    isLoading: boolean

    samletStreger: null | number
    samletBeloob: null | number
    rows: Array<RowData>
}

type RowData = [string, string, string];

interface ResponseJson {
    samletStreger: number
    samletBeloob: number
    rows: Array<RowData>
}

interface RequestJsonBody {
    id: number
}

class OptaellingC extends React.Component<OptaellingProps, OptaellingState> {
    constructor(props: OptaellingProps) {
        super(props);
        this.state = {
            optaellingOpen: null,
            isLoading: true,

            samletStreger: null,
            samletBeloob: null,
            rows: []
        };
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
                                <TableCell align="left">{row[0]}</TableCell>
                                <TableCell align="left">{row[1]}</TableCell>
                                <TableCell align="left">{row[2]}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            );
        }
    }

    public componentDidMount(): void {
        const host = HostString;

        if (RunMode == "WithServer") {
            const requestBody: RequestJsonBody = {
                id: this.props.optaellingId
            };

            ApiInterface.postAuthenticated<ResponseJson, RequestJsonBody>("/admin/count", requestBody, host).then((responseJson: ResponseJson) => {
                this.setState({
                    rows: responseJson.rows,
                    isLoading: false,

                    samletBeloob: responseJson.samletBeloob,
                    samletStreger: responseJson.samletStreger
                });
            });
        } else {
            new Promise( resolve => setTimeout(resolve, 1000) ).then((value: unknown) => {
                this.setState({
                    rows: [
                        ["Sodavand", "100", "500"],
                        ["Øl", "200", "1200"]
                    ],
                    isLoading: false,

                    samletBeloob: 1700,
                    samletStreger: 300
                });
            })
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
                                <TableCell align="left">Produkt</TableCell>
                                <TableCell align="left">Streger</TableCell>
                                <TableCell align="left">Beløb</TableCell>
                            </TableRow>
                        </TableHead>
                        {this.renderTableWhenLoaded()}
                    </Table>
                    {this.renderLoader()}
                </Card>
            </div>
        );
    }
}

const Optaelling = withStyles(styles)(OptaellingC);

export default Optaelling;