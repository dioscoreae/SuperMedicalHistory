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
                return "waiting"
            case 2:
                return "Under treatment"
            case 3:
                return "Finished"
            case 4:
                return "Finished"
        }
    }

    handleItemClick(event, data) {
        setTimeout(() => {
            this.props.setActivePatient(data.patientId);
            this.props.setLinkedData();
          }, 1500);

          this.props.setActivePatient(data.patientId, 92);          

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
                    <label color="grey">Patient List</label>
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