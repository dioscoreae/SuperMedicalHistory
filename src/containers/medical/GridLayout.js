import React, { Component } from 'react'
import { Grid, Button, Confirm, Message } from 'semantic-ui-react'
//import Diagnose from './Diagnose';
import { actions as patientActions, getActivePatient } from '../../redux/modules/patients'
import { getLoginInfo } from '../../redux/modules/logonInfo'
import PatientList from '../../containers/medical/PatientList';
import TabMenu from '../../components/medical/TabMenu';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

class GridLayout extends Component {
    //const GridLayout = (props) => {
    state = { open: false, finishSuccess: false, checkOpen: false, checkSuccess:false };


    finishDiagnose = ((event, data) => {
        this.setState({ open: true });
    }).bind(this);

    sendToCheck = ((event, data) => {
        this.setState({ checkOpen: true });
    }).bind(this);

    handleConfirm = () => {
        console.log("patientInfo");
        console.log(JSON.stringify(this.props.patientInfo));
        // console.log(JSON.stringify(this.props.loginInfo));
        this.setState({ result: 'confirmed', open: false })
        this.props.finishDiagnose(this.props.loginInfo).then(data => {
            this.setState({ finishSuccess: true });
            setTimeout(() => {
                this.setState({ finishSuccess: false });
            }, 3000);
        });
    }

    handleConfirmCheck = () => {
        this.setState({ result: 'cancelled', open: false, checkOpen: false });
        setTimeout(() => {
            this.props.sendToCheck(91);
        }, 1000);  

        setTimeout(() => {
            this.setState({ checkSuccess: true });
            this.props.sendToCheck();
        }, 2500); 

       

        setTimeout(() => {
            this.setState({ checkSuccess: false });
        }, 3000);        
    }

    handleCancel = () => this.setState({ result: 'cancelled', open: false, checkOpen: false });

    render() {

        const { open, checkOpen } = this.state
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
                                    <Button style={{marginTop:3}} onClick={this.sendToCheck}>Check</Button>
                                    <Button onClick={this.finishDiagnose}>Finish</Button>


                                    <Confirm
                                        open={open}
                                        content='Are you going to finish?'
                                        cancelButton='Cancel'
                                        confirmButton='OK'
                                        onCancel={this.handleCancel}
                                        onConfirm={this.handleConfirm}>
                                        >
                                        </Confirm>

                                    <Confirm
                                        open={checkOpen}
                                        content='Are you going to send the checks?'
                                        cancelButton='Cancel'
                                        confirmButton='OK'
                                        onCancel={this.handleCancel}
                                        onConfirm={this.handleConfirmCheck}>
                                        >
                                        </Confirm>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid>
                        {this.state.finishSuccess ?
                            <Message positive>
                                <Message.Header>Finished！</Message.Header>
                            </Message>
                            :
                            <span></span>
                        }
                        {this.state.checkSuccess ?
                            <Message positive>
                                <Message.Header>Sent to check!</Message.Header>
                            </Message>
                            :
                            <span></span>
                        }                        
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
        loginInfo: getLoginInfo(state),
        patientInfo: getActivePatient(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(patientActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GridLayout);
