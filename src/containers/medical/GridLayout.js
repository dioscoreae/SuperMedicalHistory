import React, { Component } from 'react'
import { Grid, Button, Confirm } from 'semantic-ui-react'
//import Diagnose from './Diagnose';
import { actions as patientActions, getActivePatient } from '../../redux/modules/patients'
import { getLoginInfo } from '../../redux/modules/logonInfo'
import PatientList from '../../containers/medical/PatientList';
import TabMenu from '../../components/medical/TabMenu';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

class GridLayout extends Component {
    //const GridLayout = (props) => {
    state = { open: false };


    finishDiagnose = ((event, data) => {
        this.setState({ open: true });
    }).bind(this);

    handleConfirm = () => {
        console.log(JSON.stringify(this.props.patientInfo));
        console.log(JSON.stringify(this.props.loginInfo));
        this.setState({ result: 'confirmed', open: false })
    }

    handleCancel = () => this.setState({ result: 'cancelled', open: false });

    render() {

        const { open } = this.state
        return (
            <Grid divided>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <PatientList></PatientList>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Grid>
                            <Grid.Column>
                                <Grid.Row>
                                    <TabMenu {...this.props} ></TabMenu>
                                </Grid.Row>
                                <Grid.Row>
                                    <Button onClick={this.finishDiagnose}>接诊结束</Button>
                                    
                                    <Confirm 
                                        open={open} 
                                        content = '确认结束接诊吗'
                                        cancelButton = '确定'
                                        confirmButton = '取消'
                                        onCancel={this.handleCancel} 
                                        onConfirm={this.handleConfirm}>
                                        >
                                        </Confirm>
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
    }
}

const mapStateToProps = (state, props) => {
    return {
        patientInfo: getActivePatient(state),
        loginInfo: getLoginInfo(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(patientActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridLayout);
