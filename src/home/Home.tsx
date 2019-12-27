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
import Optaelling from "./Optaelling";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import TableHead from "@material-ui/core/TableHead";
import Explore from "@material-ui/core/SvgIcon/SvgIcon";
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import MaybeWebsocket from "../util/MaybeWebsocket";

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
    paper: {
    }
});

interface HomeProps extends WithStyles<typeof styles> {
}

interface Message {
    sender: string
    message: string
}

interface HomeState {
    uploadingFile: boolean
    name: string
    newMessage: boolean
    message: string
    messages: Array<Message>
    userIds: number[]
}

class HomeC extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);

        MaybeWebsocket.registerHandler(0, (data) => {
            try {
                const parsed = JSON.parse(data)

                if (parsed.$type === "ReceiveMessage") {
                    this.setState({ messages: this.state.messages.concat([{ sender: "Anon", message: parsed.msg as string }]) })
                }
            } catch (e) {

            }
        });

        this.state = {
            uploadingFile: false,
            name: "Test",
            newMessage: true,
            message: "",
            messages: [],
            userIds: []
        };
    }

    public newMessageField(): React.ReactNode | null {
        if (this.state.newMessage) {
            return (
                <Box margin={3}>
                    <TextField id="outlined-basic" label="New message" variant="outlined" fullWidth
                               onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => this.setState({ message: e.target.value})}
                    />
                    <Box p={1}/>
                    <Button variant="contained" color="primary" fullWidth onClick={(e) => {
                        const newStuff = this.state.messages.concat([{
                            message: this.state.message,
                            sender: "You"
                        }]);

                        this.setState({ messages: newStuff })

                        const sendMessage = {
                            $type: "SendMessage",
                            message: this.state.message,
                            destinationUsers: this.state.userIds
                        };

                        MaybeWebsocket.send(JSON.stringify(sendMessage))
                    }}>
                        Send
                    </Button>
                </Box>
            );
        } else {
            return null;
        }
    };

    public getTableRows(): Array<React.ReactNode> {
        return (this.state.messages.map((value: Message, index: number) => {
            return (<TableRow key={index}>
                <TableCell align="left">{value.sender}</TableCell>
                <TableCell align="left">{value.message}</TableCell>
            </TableRow>);
        }));
    };

    public render() {
        const nameField = this.newMessageField();

        return (
            <div className={this.props.classes.root}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <Card className={this.props.classes.card}>
                            <Typography
                                variant={"h4"}
                                className={this.props.classes.title}
                            >
                                Chat
                            </Typography>
                            <Box paddingTop={2}/>
                            <Divider/>
                            <Box paddingTop={4}/>
                            <Container maxWidth={"xl"}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Box paddingTop={1}/>
                                        <Card>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="left">Name</TableCell>
                                                        <TableCell align="left">Message</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                {this.getTableRows()}
                                            </Table>
                                            {nameField}

                                        </Card>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card className={this.props.classes.card}>
                            <Typography
                                variant={"h4"}
                                className={this.props.classes.title}
                            >
                                Upload file
                            </Typography>
                            <Box paddingTop={2}/>
                            <Divider/>
                            <Box paddingTop={4}/>
                            <Box paddingLeft={4} paddingRight={4}>
                                <input
                                    accept="image/*"
                                    className={"submit"}
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    onChange={ (e) => {
                                        const files = e.target.files;

                                        if (files !== null) {
                                            this.setState({ uploadingFile: true });

                                            const file = files.item(0);

                                            if (file !== null) {

                                                var reader = new FileReader();
                                                reader.readAsArrayBuffer(file)
                                                reader.onloadend = (pe) => {
                                                    if (reader.result !== null) {
                                                        console.log("abc");
                                                        const ab = reader.result as ArrayBuffer;

                                                        const asByte = new Int8Array(ab);

                                                        const builder: Array<number> = [];

                                                        asByte.forEach((value) => {
                                                            builder.push(value)
                                                        });

                                                        //&const data = JSON.stringify(asByte);

                                                        const jsonStructure = {
                                                            $type: "UploadHandlerSnippet",
                                                            fileData: builder
                                                        };

                                                        const stringed = JSON.stringify(jsonStructure);

                                                        console.log("Sending with " + builder.length.toString());

                                                        MaybeWebsocket.send(stringed)
                                                    }
                                                }

                                            } else {
                                                this.setState({ uploadingFile: false });
                                            }
                                        }
                                    }}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="contained" component="span" className={"submit"} fullWidth color="primary">
                                        Upload
                                    </Button>
                                </label>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const Home = withStyles(styles)(HomeC);

export default Home;