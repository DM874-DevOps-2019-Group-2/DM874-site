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
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import TableHead from "@material-ui/core/TableHead";
import SearchSelector from '../util/SearchSelector';
import * as Cookies from "js-cookie";
import CircularProgress from "@material-ui/core/CircularProgress";
import HostString from "../util/HostString";
import RunMode from "../util/RunMode";
import ApiInterface from "../util/ApiInterface";

const styles = (theme: Theme) => createStyles({
    root: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    card: {
        paddingBottom: 50
    },
    title: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 5
    },
    input: {
        flex: 1
    }
});

type TableUserDescriptionData = Array<string>
type TableUserBodyData = Array<Array<string>>

interface QueryableTableProps extends WithStyles<typeof styles> {
    endpoint: string
    emails: Array<string>

    topTableHead: Array<string>
    bottomTableHead: Array<string>
}

interface QueryableTableState {
    searchString: string
    resultTable: [TableUserDescriptionData, TableUserBodyData]
    isLoading: boolean
}

interface RequestJsonBody {
    email: string
}

interface ResponseJson {
    resultTable: [TableUserDescriptionData, TableUserBodyData]
}

class QueryableTableC extends React.Component<QueryableTableProps, QueryableTableState> {
    constructor(props: QueryableTableProps) {
        super(props);
        this.state = {
            searchString: '',
            resultTable: [[],[]],
            isLoading: false
        };
    }

    private fetchByUser(email: string): void {
        const host = HostString;

        if (RunMode == "WithServer") {
            const requestBody: RequestJsonBody = {
                email: email
            };

            ApiInterface.postAuthenticated<ResponseJson, RequestJsonBody>("/admin/" + this.props.endpoint, requestBody, host).then((responseJson: ResponseJson) => {
                this.setState({
                    resultTable: responseJson.resultTable,
                    isLoading: false
                });
            });
        } else {
            new Promise( resolve => setTimeout(resolve, 1000) ).then((value: unknown) => {
                this.setState({
                    resultTable: [
                        ["Valdemar Grange", "sagra16", "-114", "Indbetaling: kr. 100 via MobilePay, 24-04-2019 09:34"],
                        [
                            [(new Date(Date.now())).toLocaleDateString(), "42" ,"55", "Indbetaling: kr. 100 via MobilePay, 24-04-2019 09:34"],
                            [(new Date(Date.now())).toLocaleDateString(), "66" ,"102", "Indbetaling: kr. 100 via MobilePay, 24-04-2019 09:34"]
                        ]
                    ],
                    isLoading: false
                });
            });
        }
    }

    public renderConditionalTable(): React.ReactNode | null {
        if (!this.state.isLoading) {
            return (
                <div>
                    <Box paddingTop={4} />
                    <Table>
                    <TableHead>
                        <TableRow>
                            {(this.props.topTableHead).map((value: string, index: number) => {
                                return (<TableCell align="left" key={index}>{value}</TableCell>)
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {(this.state.resultTable[0]).map((value: string, index: number) => {
                                return (<TableCell align="left" key={index}>{value}</TableCell>)
                            })}
                        </TableRow>
                    </TableBody>
                    <TableHead>
                        <TableRow>
                            {(this.props.bottomTableHead).map((value: string, index: number) => {
                                return (<TableCell align="left" key={index}>{value}</TableCell>)
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(this.state.resultTable[1]).map((value: Array<string>, indexOuter: number) => {
                            return (<TableRow key={indexOuter}>{value.map((stringValue: string, index: number) => {
                                return (<TableCell align="left" key={index}>{stringValue}</TableCell>)
                            })}</TableRow>);
                        })}
                    </TableBody>
                </Table>
                </div>
            );
        } else {
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
    }

    public render() {
        return (
            <div>
                <Box paddingBottom={3} />
                <Paper className={this.props.classes.root}>
                    <SearchSelector
                        label={"Brugernavn"}
                        choices={this.props.emails}
                        onSelect={(e: string) => {
                            this.setState({
                                isLoading: true,
                            });
                            this.fetchByUser(e);
                        }}
                    />
                </Paper>
                {this.renderConditionalTable()}
                <Box paddingBottom={10}/>
            </div>
        );
    }
}

const QueryableTable = withStyles(styles)(QueryableTableC);

export default QueryableTable;