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
import * as Cookies from "js-cookie";
import CircularProgress from "@material-ui/core/CircularProgress";

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

interface EconomyProps extends WithStyles<typeof styles> {
}

interface EconomyState {
    startDate: Date | null
    endDate: Date | null

    chartData: ChartData
    isLoading: boolean
}

type ChartData = Array<[string, Array<number>]>

interface RequestJsonBody {
    startDate: string
    endDate: string
}

interface ResponseJson {
    chartData: ChartData
}

class EconomyC extends React.Component<EconomyProps, EconomyState> {
    constructor(props: EconomyProps) {
        super(props);
        this.state = {
            startDate: new Date(Date.now()),
            endDate: new Date(Date.now()),

            chartData: [],

            isLoading: false
        };
    }

    private fetchByDate(): void {
        if (process.env.NODE_ENV === "production") {
            const host = window.location.host;
            const jwt = Cookies.get('dm874_jwt') as string;

            const requestBody: RequestJsonBody = {
                startDate: (this.state.startDate as Date).toLocaleDateString(),
                endDate: (this.state.endDate as Date).toLocaleDateString()
            };

            fetch(host + "/admin/economy", {
                headers : {
                    "dm874_jwt": jwt
                },
                method: "post",
                body: JSON.stringify(requestBody)
            })
                .then((response) => response.json())
                .then((data: ResponseJson) => {
                    this.setState({
                        chartData: data.chartData,
                        isLoading: false
                    });
                })
        } else {
            new Promise( resolve => setTimeout(resolve, 1000) ).then((value: unknown) => {
                this.setState({
                    chartData: [
                        ['Indtægter', [0,10,23,17,18,9,11,27,33,40,32,35]],
                        ['Overskud', [0,20,40,60,99,120,159,229,238,268,303,373]],
                        ['Køb', [20,10,15,9,10,13,9,48,20,18,13,17]]
                    ],
                    isLoading: false
                });
            });
        }
    }

    private renderChartConditionally(): React.ReactNode | null {
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
        } else if (this.state.chartData.length === 0) {
            return null;
        } else {
            const names: Array<string> = this.state.chartData.map(value => value[0]);
            const datas: Array<Array<number>> = this.state.chartData.map(v => v[1]);

            //For data entry for an arbitary type we transpose the matrix
            const elems = ((datas[0]).map((_, dataIndex: number) => {
                return [dataIndex].concat(names.map((_, nameIndex: number) => {
                    return (datas[nameIndex][dataIndex]);
                }));
            }));

            console.log(elems);

            const empty: Array<any> = [];

            return (
                <Chart
                    height={'400px'}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={empty.concat([
                        ['x'].concat(names)
                    ]).concat(elems)}
                    options={{
                        hAxis: {
                            title: 'Dato',
                        },
                        vAxis: {
                            title: 'Sum',
                        },
                        series: {
                            0: { curveType: 'function' },
                            1: { curveType: 'function' },
                            2: { curveType: 'function' },
                        },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            );
        }
    }

    public render() {
        return (
            <div>
                <Box paddingBottom={2} />
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Start dato"
                            value={this.state.startDate}
                            onChange={(newDate: Date | null) => {
                                if (newDate !== null && this.state.endDate) {
                                    this.setState({ startDate: newDate, isLoading: true});
                                    this.fetchByDate();
                                } else {
                                    this.setState({ startDate: newDate});
                                }
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Slut dato"
                            value={this.state.endDate}
                            onChange={(newDate: Date | null) => {
                                if (newDate !== null && this.state.startDate) {
                                    this.setState({ endDate: newDate, isLoading: true});
                                    this.fetchByDate();
                                } else {
                                    this.setState({ endDate: newDate});
                                }
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                {this.renderChartConditionally()}
            </div>
        );
    }
}


const Economy = withStyles(styles)(EconomyC);

export default Economy;

