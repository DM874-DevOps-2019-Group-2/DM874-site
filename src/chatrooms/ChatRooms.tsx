import React from 'react';
import Container from '@material-ui/core/Container';
import '../index.css';
import './ChatRooms.scss';
import {Chart} from "react-google-charts";
import Card from '@material-ui/core/Card';
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.background.default,
            },
        },
    }),
)(TableRow);

function createData(name: string, description: string, numPeople: number) {
    return { name, description, numPeople};
}

const rows = [
    createData('General', 'General chat with general themes', 500),
    createData('Gamers Republic','Gamers only, casuals out', 230),
    createData('Food and Drinks', 'Share your oppinion on popular food in Denmark', 134),
    createData('Travelers', 'Pack your things and hit the road!', 45)
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },

});

interface ChatRoomsProps {
}

interface ChatRoomsState {

}

export default class ChatRooms extends React.Component<ChatRoomsProps, ChatRoomsState> {
    constructor(props: ChatRoomsState) {
        super(props);
        this.state = {

        };

    }
    public  render() {

        return (
            <Container component="main" maxWidth="lg">
                <Paper className="root">
                    <Table className="table" aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Chat&nbsp;room</StyledTableCell>
                                <StyledTableCell align="left">Description</StyledTableCell>
                                <StyledTableCell align="center">Number&nbsp;of&nbsp;Chatters</StyledTableCell>
                                <StyledTableCell align="left"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.description}</StyledTableCell>
                                    <StyledTableCell align="center">{row.numPeople}</StyledTableCell>
                                    <Button href="/chat" color="primary">Enter</Button>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        );
    }
}

//export default withStyles(signinStyle, {withTheme: true})(Signin as any) as any;
