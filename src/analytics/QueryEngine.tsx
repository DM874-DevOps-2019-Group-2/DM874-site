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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TableHead from "@material-ui/core/TableHead";
import { ValueContainerProps } from 'react-select/src/components/containers';
import { ControlProps } from 'react-select/src/components/Control';
import { MenuProps, NoticeProps } from 'react-select/src/components/Menu';
import { MultiValueProps } from 'react-select/src/components/MultiValue';
import { OptionProps } from 'react-select/src/components/Option';
import { PlaceholderProps } from 'react-select/src/components/Placeholder';
import { SingleValueProps } from 'react-select/src/components/SingleValue';
import { ValueType } from 'react-select/src/types';
import ReactSelect from 'react-select';
import CircularProgress from "@material-ui/core/CircularProgress";
import * as Cookies from "js-cookie";
import HostString from "../util/HostString";
import RunMode from "../util/RunMode";
import ApiInterface from "../util/ApiInterface";

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    card: {
        paddingBottom: 50
    },
    formControl: {
        minWidth: 200
    },
    title: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 5
    },
});

interface QueryEngineProps extends WithStyles<typeof styles> {
}

type TableHeadData = Array<string>
type TableBodyData = Array<Array<string>>

interface QueryEngineState {
    selectedIndex: string
    inputField: string

    isLoading: boolean

    tableHead: TableHeadData | null
    tableBody: TableBodyData | null
}

interface RequestJsonBody {
    requestData: string
}

interface ResponseJson {
    tableHead: TableHeadData
    tableBody: TableBodyData
}

class QueryEngineC extends React.Component<QueryEngineProps, QueryEngineState> {
    constructor(props: QueryEngineProps) {
        super(props);
        this.state = {
            selectedIndex: '',
            inputField: "",

            isLoading: false,

            tableHead: null,
            tableBody: null
        };
    }

    private elems: Array<[string, string, React.ReactNode]> = [
        ["Blacklisted people", "/admin/query/blacklisted", this.getBlacklistedField()],
        ["Query on 'Transactions'", "/admin/query/transactions", this.getManualQueryField()]
    ];

    private fetchQueryResult(endpoint: string): void {

        const host = HostString;

        if (RunMode == "WithServer") {
            const requestBody: RequestJsonBody = {
                requestData: this.state.inputField
            };

            ApiInterface.postAuthenticated<ResponseJson, RequestJsonBody>(endpoint, requestBody, host).then((responseJson: ResponseJson) => {
                this.setState({
                    tableHead: responseJson.tableHead,
                    tableBody: responseJson.tableBody,
                    isLoading: false
                });
            });
        } else {
            const tableHead: TableHeadData = [
                "First col", "Second col", "Third col"
            ];

            const tableBody: TableBodyData = [
                ["11", "12", "13"],
                ["21", "22", "23"],
                ["31", "32", "33"]
            ];

            new Promise( resolve => setTimeout(resolve, 1000) ).then((value: unknown) => {
                this.setState({
                    tableHead: tableHead,
                    tableBody: tableBody,
                    isLoading: false
                });
            });
        }

    }

    public render() {
        return (
            <div>
                <Box paddingTop={4}/>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <form className={this.props.classes.root} autoComplete="off">
                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel htmlFor="query">Type</InputLabel>
                            <Select
                                value={this.state.selectedIndex}
                                onChange={(event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
                                    this.setState({
                                        selectedIndex : event.target.value as string,
                                        inputField: "",
                                        tableHead: null,
                                        tableBody: null
                                    })
                                }}
                                inputProps={{
                                    name: 'query',
                                    id: 'query',
                                }}
                            >
                                {this.elems.map((e: [string, string, React.ReactNode], index: number) => <MenuItem value={index + 1} key={index}>{e[0]}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </form>
                </Grid>
                <Box paddingTop={3} />
                {this.getDescription()}
                {this.conditionalComponent()}
            </div>
        );
    }

    private tableFromData(tableHead: TableHeadData, tableBody: TableBodyData): React.ReactNode {
        return (
          <div>
              <Box paddingBottom={4}/>
              <Table>
                  <TableHead>
                      <TableRow>
                          {tableHead.map((entry: string, index: number) => <TableCell key={index}>{entry}</TableCell>)}
                      </TableRow>
                  </TableHead>
                  <TableHead>
                      {tableBody.map((entry: Array<string>) => {
                          return <TableRow>
                              {entry.map((entry: string) => <TableCell>{entry}</TableCell>)}
                          </TableRow>;
                      })}
                  </TableHead>
              </Table>
          </div>
        );
    }

    private conditionalComponent(): React.ReactNode | null {
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
            if (this.state.tableBody === null || this.state.tableHead === null) {
                return null;
            } else {
                return(
                    <Container maxWidth={"lg"}>
                        {this.tableFromData(this.state.tableHead, this.state.tableBody)}
                    </Container>
                );
            }
        }
    }

    private getManualQueryField(): React.ReactNode {
        return (
            <div>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Typography variant="subtitle1" gutterBottom>
                        Predicate to apply to query "SELECT * FROM transactions WHERE 'YOUR_PREDICATE';"
                    </Typography>
                </Grid>
                <Box paddingTop={1} />
                <TextField
                    key="getManualQueryField"
                    id="getManualQueryField"
                    label="Predicate"
                    fullWidth={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => this.setState({ inputField: e.target.value})}
                />
                <Box paddingTop={4} />
            </div>
        );
    }

    private getBlacklistedField(): React.ReactNode {
        return (
            <div>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Typography variant="subtitle1" gutterBottom>
                        People whose balance meets the condition n >= are shown
                    </Typography>
                </Grid>
                <Box paddingTop={1} />
                <TextField
                    key="getBlacklistedField"
                    id="getBlacklistedField"
                    label="Condition"
                    fullWidth={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => this.setState({ inputField: e.target.value})}
                />
                <Box paddingTop={4} />
            </div>
        );
    }

    private getDescription(): React.ReactNode | null {
        if (this.state.selectedIndex === '') {
            return null;
        } else {
            const currentTuple = this.elems[Number(this.state.selectedIndex) - 1];

            if (currentTuple) {
                const result = currentTuple[2];

                return (
                    <div>
                        {result}
                        <Button variant="contained" color="primary" fullWidth={true} onClick={(() => {
                            this.setState({isLoading: true})
                            this.fetchQueryResult(currentTuple[1])
                        })}>
                            Query
                        </Button>
                    </div>
                );
            } else {
                return null;
            }
        }
    };
}

const QueryEngine = withStyles(styles)(QueryEngineC);

export default QueryEngine;