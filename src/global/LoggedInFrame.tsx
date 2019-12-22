import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import Analytics from '@material-ui/icons/GraphicEq';
import MetricsIcon from '@material-ui/icons/NetworkWifi';
import Explore from '@material-ui/icons/Explore';
import LogoutIcon from '@material-ui/icons/SupervisedUserCircle';
import { Link as RouterLink } from 'react-router-dom';
import * as Cookies from "js-cookie";
import { Paper, Grid, Box} from '@material-ui/core';
import { withStyles, ThemeProvider } from '@material-ui/styles';
import GlobalTheme from './GlobalTheme';
import { makeStyles, useTheme, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MaybeWebsocket from "../util/MaybeWebsocket";

const drawerWidth = 300;
const appBarHeight = 65;
const defaultSideMargin = 40;

const styles = (theme: Theme) => createStyles({
    outerRoot: {
    },
    root: {
        display: 'flex',
    },
    appBar: {
        //marginLeft: drawerWidth,
        height: appBarHeight,
    },
    toolbar: {
        textAlign: "center",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        marginTop: appBarHeight,
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        marginLeft: drawerWidth + defaultSideMargin,
        marginTop: appBarHeight,
        marginRight: defaultSideMargin,
    },
});

interface LoggedInFrameProps extends WithStyles<typeof styles> {
    child: React.ReactNode | undefined;
}

interface LoggedInFrameState {
}

class LoggedInFrameC extends React.Component<LoggedInFrameProps, LoggedInFrameState> {
    constructor(props: LoggedInFrameProps) {
        super(props);
        this.state = {

        };
    }
    public static defaultProps:Partial<LoggedInFrameProps> = {
        child: undefined
    };

    logout = () => {
        Cookies.remove("dm874_jwt");
    };

    public render() {
        return (
            <div className={this.props.classes.outerRoot}>
                <AppBar position="sticky" className={this.props.classes.appBar}>
                    <Toolbar className={this.props.classes.toolbar}>
                        <Typography color="inherit" aria-label="Menu" align={"center"}>
                            Imada sodavandsordning
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={this.props.classes.drawer}>
                    <Drawer
                        variant="permanent"
                        anchor="left"
                        classes={{
                            paper: this.props.classes.drawerPaper
                        }}
                    >
                            <ThemeProvider theme={GlobalTheme} >
                                <Divider />
                                <List>
                                    <ListItem button key={"Home"} component={RouterLink} to="/home" >
                                        <ListItemIcon>{<HomeIcon color="primary" />}</ListItemIcon>
                                        <ListItemText primary={<Typography variant="body1" align='justify'>Home</Typography>} />
                                    </ListItem>
                                    <ListItem button key={"Søgning"} component={RouterLink} to="/soogning" >
                                        <ListItemIcon>{<Explore color="primary" />}</ListItemIcon>
                                        <ListItemText primary={<Typography variant="body1" align='justify'>Søgning</Typography>} />
                                    </ListItem>
                                    <ListItem button key={"Analyse"} component={RouterLink} to="/analytics" >
                                        <ListItemIcon>{<Analytics color="primary" />}</ListItemIcon>
                                        <ListItemText primary={<Typography variant="body1" align='justify'>Analyse</Typography>} />
                                    </ListItem>
                                    <ListItem button key={"Settings"} component={RouterLink} to="/settings" >
                                        <ListItemIcon>{<Settings color="primary" />}</ListItemIcon>
                                        <ListItemText primary={<Typography variant="body1" align='justify'>Instillinger</Typography>} />
                                    </ListItem>
                                </List>
                                <Divider />
                                <List>
                                    <ListItem button key={"Logout"} onClick={this.logout} component={RouterLink} to="/" >
                                        <ListItemIcon>{<LogoutIcon color="primary" />}</ListItemIcon>
                                        <ListItemText primary={<Typography variant="body1" align='justify'>Log ud</Typography>} />
                                    </ListItem>
                                </List>
                            </ThemeProvider>
                    </Drawer>
                </nav>
                <div className={this.props.classes.content}>
                    {this.props.child}
                </div>
            </div>
        );
    }
}

const LoggedInFrame = withStyles(styles)(LoggedInFrameC);

export default LoggedInFrame;