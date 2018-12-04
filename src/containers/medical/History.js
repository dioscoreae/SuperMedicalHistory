import React, { Component } from 'react'
import { Table, Dimmer, Button, Loader, Input, Grid, Popup, Label, Header, Segment } from 'semantic-ui-react'
import { actions as patientActions, getHistory } from '../../redux/modules/patients'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

class History extends Component {

    runSearch() {
       this.setState({ loading: true });


        this.props.getHistory().then(
            historyRecord=>{
                this.setState({ history: historyRecord })
                this.setState({ loading: false });
            }
        );
        
        // this.setState({
        //     history: [{
        //         date: "2018-02-09",
        //         hostipal: "仁济医院",
        //         department: "内科",
        //         symptom: ["头疼", "鼻塞"],
        //         //checkRecord: [{ name: "B超", result: "", type: 1 }],
        //         checkRecord: [{ name: "B超", result: "右下回声不均匀，左侧也不均匀", type: 1 }, { name: "血常规", result: [["白细胞", "4.9"], ["血红蛋白", "8.9"],["淋巴细胞", "89"]], type: 2 }],
        //         diagnose: "",
        //         prescription: []
        //     }]
        // });
               

        // setTimeout(() => {
        //     this.props.getHistory().then(
        //         historyRecord=>{
        //             this.setState({ history: historyRecord })
        //         }
        //     );
            
        //     // this.setState({
        //     //     history: [{
        //     //         date: "2018-02-09",
        //     //         hostipal: "仁济医院",
        //     //         department: "内科",
        //     //         symptom: ["头疼", "鼻塞"],
        //     //         //checkRecord: [{ name: "B超", result: "", type: 1 }],
        //     //         checkRecord: [{ name: "B超", result: "右下回声不均匀，左侧也不均匀", type: 1 }, { name: "血常规", result: [["白细胞", "4.9"], ["血红蛋白", "8.9"],["淋巴细胞", "89"]], type: 2 }],
        //     //         diagnose: "",
        //     //         prescription: []
        //     //     }]
        //     // });
        //     this.setState({ loading: false });
        // }, 500);

    }

    componentWillMount() {
        this.setState({ loading: false });
        this.setState({ history: [] });
    }

    render() {
        return (
            <Grid padded>
                <Grid.Row >
                    <Input type='text' placeholder='headache，fever...' action>
                        <input />
                        <Button type='submit' onClick={this.runSearch.bind(this)} >Search</Button>
                    </Input>
                </Grid.Row>
                <Grid.Row></Grid.Row>
                <Grid.Row>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.HeaderCell>Hostial</Table.HeaderCell>
                                <Table.HeaderCell>Department</Table.HeaderCell>
                                <Table.HeaderCell>symptom</Table.HeaderCell>
                                <Table.HeaderCell>Record</Table.HeaderCell>
                                <Table.HeaderCell>Result</Table.HeaderCell>
                                <Table.HeaderCell>Drug</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        {this.state.loading ?
                            <Table.Body>
                                <Dimmer active inverted>
                                    <Loader size='medium'>正在搜索...</Loader>
                                </Dimmer>
                            </Table.Body>
                            :
                            <Table.Body>
                                {this.state.history.map(item =>
                                    <Table.Row>
                                        <Table.Cell>{item.date}</Table.Cell>
                                        <Table.Cell>{item.hostipal}</Table.Cell>
                                        <Table.Cell>{item.department}</Table.Cell>
                                        <Table.Cell>{item.symptom.map((symptomItem,index) => (
                                            // <Label basic >{symptomItem.text}</Label> 
                                             ((index+1) % 3 == 0)? <span><p></p><Label basic >{symptomItem.text}</Label></span> : <Label basic >{symptomItem.text}</Label> 
                                        ))}</Table.Cell>
                                        <Table.Cell>
                                            {item.checkRecord && item.checkRecord.map(checkItem => (
                                                checkItem.type == 1 ?
                                                    <Popup flowing hoverable trigger={<Label color="teal" basic >{checkItem.name}</Label>}>
                                                        {checkItem.result}
                                                    </Popup>
                                                    :
                                                    <Popup flowing hoverable trigger={<Label color="teal" basic >{checkItem.name}</Label>}>
                                                        <Table basic='very' celled collapsing>
                                                            <Table.Header>
                                                                <Table.Row>
                                                                    <Table.HeaderCell>类别</Table.HeaderCell>
                                                                    <Table.HeaderCell>结果</Table.HeaderCell>
                                                                </Table.Row>
                                                            </Table.Header>

                                                            <Table.Body>
                                                                {checkItem.result.map(resultItem => (
                                                                    <Table.Row>
                                                                        <Table.Cell>
                                                                            <Header as='h4' image>
                                                                                <Header.Content>
                                                                                    {resultItem[0]}
                                                                                </Header.Content>
                                                                            </Header>
                                                                        </Table.Cell>
                                                                        <Table.Cell>{resultItem[1]}</Table.Cell>
                                                                    </Table.Row>
                                                                ))}
                                                            </Table.Body>
                                                        </Table>
                                                    </Popup>
                                            ))}
                                        </Table.Cell>
                                        <Table.Cell>{item.result}</Table.Cell>
                                        <Table.Cell>
                                            {item.prescriptions && item.prescriptions.map(prescriptionItem => (
                                                <Label basic >{prescriptionItem.name}</Label>
                                            ))}                                            
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        }

                    </Table>
                </Grid.Row>
            </Grid>

        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        // activePatient: getActivePatient(state),
        // loginInfo: getLoginInfo(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(patientActions, dispatch),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(History);