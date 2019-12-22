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
import SearchSelector from "../util/SearchSelector";
import TableHead from "@material-ui/core/TableHead";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import HostString from "../util/HostString";
import RunMode from "../util/RunMode";
import ApiInterface from "../util/ApiInterface";
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

interface SettingsProps extends WithStyles<typeof styles> {
}

interface SettingsState {
    isLoadingUsers: boolean

    passwordChanged: boolean
    passwordChanging: boolean

    oldPassword: string | null
    newPassword: string | null

    showAddAsAdminButton: boolean
    addAdminUser: string | null

    users: Array<string>
    admins: Array<string>

    changePasswordMessage: string
}

interface AdminRequestJsonBody {
    email: string
}

interface ChangePasswordRequestJsonBody {
    oldPassword: string
    newPassword: string
}

interface ChangePasswordResponse {
    message: string
}

interface Emails {
    userEmails: Array<string>
    adminEmails: Array<string>
}

class SettingsC extends React.Component<SettingsProps, SettingsState> {
    constructor(props: SettingsProps) {
        super(props);
        this.state = {
            isLoadingUsers: true,
            passwordChanged: false,
            passwordChanging: false,
            oldPassword: null,
            newPassword: null,
            showAddAsAdminButton: false,
            addAdminUser: null,

            users: [],
            admins: [],

            changePasswordMessage: ''
        };
    }

    public componentDidMount(): void {
        const host = HostString;

        if (RunMode == "WithServer") {
            ApiInterface.getAuthenticated<Emails>("/admin/adminsAndUsers", host).then((responseJson: Emails) => {
                this.setState({
                    users: responseJson.userEmails,
                    admins: responseJson.adminEmails,
                    isLoadingUsers: false
                });
            });
        } else {
            new Promise( resolve => setTimeout(resolve, 250) )
                .then((_) => this.setState({
                    users: ["sagra16", "anmor16", "mkris16", "gajen16"],
                    admins: [],
                    isLoadingUsers: false
                }));
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
                                Indstillinger
                            </Typography>
                            <Container maxWidth={"lg"}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="oldpassword"
                                    label="Old password"
                                    name="oldpassword"
                                    autoFocus
                                    type="password"
                                    onChange={attr => this.setState({oldPassword: attr.target.value})}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="newpassword"
                                    label="New password"
                                    type="password"
                                    id="newpassword"
                                    onChange={attr => this.setState({newPassword: attr.target.value})}
                                />
                                <Box paddingBottom={2} />
                                <Button
                                    type="button"
                                    disabled={this.state.passwordChanging}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={"submit"}
                                    onClick={(e) => this.changePassword()}
                                >
                                    Change password
                                </Button>
                                <Box paddingBottom={3} />
                                {(this.state.passwordChanging === false) ? null :
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                    >
                                        <Box justifyContent="center" m={2}>
                                            <CircularProgress/>
                                        </Box>
                                    </Grid>}
                                {(this.state.changePasswordMessage === '') ? null :
                                    <Typography
                                        variant={"h2"}
                                        className={this.props.classes.title}
                                    >
                                        {this.state.changePasswordMessage}
                                    </Typography>}
                            </Container>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card className={this.props.classes.card}>
                            <Typography
                                variant={"h4"}
                                className={this.props.classes.title}
                            >
                                Administratore
                            </Typography>
                            <Container maxWidth={"lg"}>
                                {(this.state.isLoadingUsers === true) ?
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
                                    :
                                    <div>
                                    <Box paddingTop={2} />
                                    <Table>
                                        <TableHead>
                                            <TableCell align="left">Navn</TableCell>
                                            <TableCell align="left">Brugernavn</TableCell>
                                            <TableCell align="left"></TableCell>
                                        </TableHead>
                                        <TableHead>
                                            {
                                                this.state.admins.map((value: string) => {
                                                    return (<TableRow>
                                                        <TableCell align="left">{value}</TableCell>
                                                        <TableCell align="left">{value}</TableCell>
                                                        <TableCell align="left">
                                                            <IconButton aria-label="delete">
                                                                <DeleteIcon fontSize="default" onClick={((e) => this.removeAdmin(value))}/>
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>);
                                                })
                                            }
                                        </TableHead>
                                    </Table>
                                    <Box paddingBottom={3} />
                                    <SearchSelector
                                        label={"Brugernavn"}
                                        choices={this.state.users}
                                        onSelect={(e: string) => this.setState({
                                            showAddAsAdminButton: true,
                                            addAdminUser: e
                                        })}
                                    />
                                    <Box paddingBottom={3} />
                                    {this.renderAddAdminButton()}
                                    <Box paddingBottom={10} />
                                </div>}
                            </Container>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }

    private renderAddAdminButton(): React.ReactNode | null {
        if (this.state.showAddAsAdminButton) {
            return (
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={"submit"}
                    onClick={((e) => this.addAdmin())}
                >
                    Tilføj som administrator
                </Button>
            );
        } else {
            return (<Box paddingBottom={2} />);
        }
    }

    private removeAdmin(user: string): Promise<any> {
        const host = HostString;

        if (RunMode == "WithServer") {
            const requestBody: AdminRequestJsonBody = {
                email: user
            };

            return ApiInterface.postAuthenticated<object, AdminRequestJsonBody>("/admin/removeAdmin", requestBody, host).then(_ => {
                if (this.state.admins.includes(user)) {
                    this.setState({
                        admins: this.state.admins.filter((value: string) => value !== user),
                        users: this.state.users.concat([user])
                    })
                }
            });
        } else {
            return new Promise( resolve => setTimeout(resolve, 250) )
                .then((u) => {
                    const result = true;
                    if (result) {
                        //Remove admin locally
                        if (this.state.admins.includes(user)) {
                            this.setState({
                                admins: this.state.admins.filter((value: string) => value !== user),
                                users: this.state.users.concat([user])
                            })
                        }
                    }
                });
        }
    }

    private addAdmin(): Promise<any> | null {
        const user = this.state.addAdminUser;

        if (user) {
            const host = HostString;

            if (this.state.addAdminUser === null) {
                return null;
            } else if (RunMode == "WithServer") {
                const requestBody: AdminRequestJsonBody = {
                    email: this.state.addAdminUser
                };

                return ApiInterface.postAuthenticated<object, AdminRequestJsonBody>("/admin/addAdmin", requestBody, host).then(_ => {
                    //Add admin locally
                    if (!this.state.admins.includes(user)) {
                        this.setState({
                            admins: this.state.admins.concat([user]),
                            users: this.state.users.filter((value: string) => value !== user)
                        })
                    }
                });
            } else {
                return new Promise( resolve => setTimeout(resolve, 250) )
                    .then((u) => {
                        const result = true;
                        if (result) {
                            //Add admin locally
                            if (!this.state.admins.includes(user)) {
                                this.setState({
                                    admins: this.state.admins.concat([user]),
                                    users: this.state.users.filter((value: string) => value !== user)
                                })
                            }
                        }
                    });
            }
        } else {
            return null;
        }
    }

    private changePassword() {
        this.setState({passwordChanging: true});

        const host = HostString;

        if (this.state.oldPassword === null || this.state.newPassword === null) {
            return
        } else if (RunMode == "WithServer") {
            const requestBody: ChangePasswordRequestJsonBody = {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword
            };

            ApiInterface.postAuthenticated<ChangePasswordResponse, ChangePasswordRequestJsonBody>("/admin/changePassword", requestBody, host).then((responseJson) => {
                this.setState({
                    passwordChanging: false,
                    passwordChanged: true,
                    changePasswordMessage: responseJson.message
                })
            });
        } else {
            new Promise( resolve => setTimeout(resolve, 250) ).then(_ => this.setState({
                passwordChanging: false,
                passwordChanged: true,
                changePasswordMessage: "Hello"
            }))
        }
    }
}

const Settings = withStyles(styles)(SettingsC);

export default Settings;