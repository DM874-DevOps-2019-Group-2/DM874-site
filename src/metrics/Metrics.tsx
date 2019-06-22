import React from 'react';
import Container from '@material-ui/core/Container';
import '../index.css';
import {Chart} from "react-google-charts";
import Card from '@material-ui/core/Card';
import {Box} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

interface MetricsProps {
}

interface MetricsState {

}

export default class Metrics extends React.Component<MetricsProps, MetricsState> {
    constructor(props: MetricsProps) {
        super(props);
        this.state = {

        };
    }

    public  render() {

        return (
            <Container component="main" maxWidth="md">
                <Box m={3}/>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <Chart
                                chartType="ScatterChart"
                                spreadSheetUrl="https://docs.google.com/spreadsheets/d/1jN0iw0usssnsG1_oi-NXtuKfsUsGme09GsFidbqxFYA/edit#gid=0"
                                options={{
                                    hAxis: {
                                        format: 'short',
                                    },
                                    vAxis: {
                                        format: 'decimal',
                                        // format:'scientific'
                                        // format:'long'
                                        // format:'percent'
                                    },
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="GeoChart"
                                data={[
                                    ['Country', 'Popularity'],
                                    ['Germany', 200],
                                    ['United States', 300],
                                    ['Brazil', 400],
                                    ['Canada', 500],
                                    ['France', 600],
                                    ['RU', 700],
                                ]}
                                // Note: you will need to get a mapsApiKey for your project.
                                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                                mapsApiKey="YOUR_KEY_HERE"
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <Chart
                                width={600}
                                height={'300px'}
                                chartType="Sankey"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['From', 'To', 'Weight'],
                                    ['Brazil', 'Portugal', 5],
                                    ['Brazil', 'France', 1],
                                    ['Brazil', 'Spain', 1],
                                    ['Brazil', 'England', 1],
                                    ['Canada', 'Portugal', 1],
                                    ['Canada', 'France', 5],
                                    ['Canada', 'England', 1],
                                    ['Mexico', 'Portugal', 1],
                                    ['Mexico', 'France', 1],
                                    ['Mexico', 'Spain', 5],
                                    ['Mexico', 'England', 1],
                                    ['USA', 'Portugal', 1],
                                    ['USA', 'France', 1],
                                    ['USA', 'Spain', 1],
                                    ['USA', 'England', 5],
                                    ['Portugal', 'Angola', 2],
                                    ['Portugal', 'Senegal', 1],
                                    ['Portugal', 'Morocco', 1],
                                    ['Portugal', 'South Africa', 3],
                                    ['France', 'Angola', 1],
                                    ['France', 'Senegal', 3],
                                    ['France', 'Mali', 3],
                                    ['France', 'Morocco', 3],
                                    ['France', 'South Africa', 1],
                                    ['Spain', 'Senegal', 1],
                                    ['Spain', 'Morocco', 3],
                                    ['Spain', 'South Africa', 1],
                                    ['England', 'Angola', 1],
                                    ['England', 'Senegal', 1],
                                    ['England', 'Morocco', 2],
                                    ['England', 'South Africa', 7],
                                    ['South Africa', 'China', 5],
                                    ['South Africa', 'India', 1],
                                    ['South Africa', 'Japan', 3],
                                    ['Angola', 'China', 5],
                                    ['Angola', 'India', 1],
                                    ['Angola', 'Japan', 3],
                                    ['Senegal', 'China', 5],
                                    ['Senegal', 'India', 1],
                                    ['Senegal', 'Japan', 3],
                                    ['Mali', 'China', 5],
                                    ['Mali', 'India', 1],
                                    ['Mali', 'Japan', 3],
                                    ['Morocco', 'China', 5],
                                    ['Morocco', 'India', 1],
                                    ['Morocco', 'Japan', 3],
                                ]}
                                rootProps={{ 'data-testid': '2' }}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

//export default withStyles(signinStyle, {withTheme: true})(Signin as any) as any;
