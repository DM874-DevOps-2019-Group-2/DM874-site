import {
    createMuiTheme
} from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        background: {
            default: orange[500],
            paper: orange[500]
        }
    }
});

export default theme;