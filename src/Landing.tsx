import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import MetricsIcon from '@material-ui/icons/NetworkWifi';
import LogoutIcon from '@material-ui/icons/SupervisedUserCircle';
import { Link as RouterLink } from 'react-router-dom';
import Link from "@material-ui/core/Link";
import * as Cookies from "js-cookie";

interface LandingProps {
    child: React.ReactNode;
}

interface LandingState {

}

export default class Landing extends React.Component<LandingProps, LandingState> {
    constructor(props: LandingProps) {
        super(props);
        this.state = {

        };
    }

    logout = () => {
        Cookies.remove("dm874_jwt");
    };

    public render() {
        return (
            <div>
                <Drawer
                    className={"drawer"}
                    variant="permanent"
                    classes={{
                        paper: "drawerPaper",
                    }}
                    anchor="left"
                >
                    <div className={"toolbar"} />
                    <Divider />
                    <List>
                        <ListItem button key={"Home"} component={RouterLink} to="/home" >
                            <ListItemIcon>{<HomeIcon/>}</ListItemIcon>
                            <ListItemText primary={"Home"} />
                        </ListItem>
                        <ListItem button key={"Metrics"} component={RouterLink} to="/metrics" >
                            <ListItemIcon>{<MetricsIcon/>}</ListItemIcon>
                            <ListItemText primary={"Metrics"} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button key={"Logout"} onClick={this.logout} component={RouterLink} to="/" >
                            <ListItemIcon>{<LogoutIcon/>}</ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItem>
                    </List>
                </Drawer>
                {this.props.child}
            </div>
        );
    }
}

