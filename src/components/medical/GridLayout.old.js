import React from 'react'
import { Grid, Button } from 'semantic-ui-react'
//import Diagnose from './Diagnose';
import PatientList from '../../containers/medical/PatientList';
import TabMenu from './TabMenu';

const GridLayout = (props) => (
    <Grid  divided>
        <Grid.Row>
            <Grid.Column width={2}>
                <PatientList></PatientList>
            </Grid.Column>
            <Grid.Column width={13}>
                <Grid>
                    <Grid.Column>
                        <Grid.Row>
                            <TabMenu {...props} ></TabMenu>
                        </Grid.Row>
                        <Grid.Row>
                            <Button>患者送检</Button>
                            <Button>接诊结束</Button>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Grid.Column>
            {/* <Grid.Column width={2}>
                历史症状解读
            </Grid.Column> */}
        </Grid.Row>

    </Grid>
)

export default GridLayout