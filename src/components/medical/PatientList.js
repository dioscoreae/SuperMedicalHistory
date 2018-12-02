import React, { Component } from 'react'
import { List, Grid, Icon } from 'semantic-ui-react'


class PatientList extends Component {
    componentDidMount() {
        this.props.getPatientList();

    }

    componentDidUpdate() {
        if (!this.props.activePatient) {
            const defaultPatient = this.props.patientList[0].id;
            this.props.setActivePatient(defaultPatient);
        }
    }


    getStatusDesc(status) {
        switch (status) {
            case 1:
                return "待诊"
            case 2:
                return "就诊中"
            case 3:
                return "检查完成"
            case 4:
                return "就诊完成"
        }
    }

    handleItemClick(event, data) {
        this.props.setActivePatient(data.patientId);
    }

    setIcon(status) {
        switch (status) {
            case 1:
                return "circle"
            case 2:
                return "hand point right outline"
            case 3:
                return "shekel sign"
        }
    }

    render() {
        return (
            <Grid textAlign='center'>
                <Grid.Row>
                    <label>患者列表</label>
                </Grid.Row>
                <Grid.Row>
                    <List divided relaxed>
                        {this.props.patientList.map(patient => {
                            return (
                                <List.Item onClick={this.handleItemClick.bind(this)} key={patient.id} patientId={patient.id}>
                                    <Icon name={this.setIcon(patient.status)} />
                                    <List.Content >
                                        <List.Header as='a'>{patient.name}</List.Header>
                                        <List.Description as='a'>{
                                            this.getStatusDesc(patient.status)
                                        }</List.Description>
                                    </List.Content>
                                </List.Item>
                            );
                        })}


                    </List>

                </Grid.Row>
            </Grid>
        )
    }
}

export default PatientList