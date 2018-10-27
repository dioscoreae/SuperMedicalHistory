import React, { Component } from 'react'
import { Table, Dimmer, Button, Loader, Input, Grid, Popup, Label, Header, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

class History extends Component {

    runSearch() {
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({
                history: [{
                    date: "2018-02-09",
                    hostipal: "仁济医院",
                    department: "内科",
                    symptom: ["头疼", "鼻塞"],
                    checkRecord: [{ name: "B超", result: "", type: 1 }],
                    //checkRecord: [{ name: "B超", result: "", type: 1 }, { name: "血常规", result: [["白细胞", "4.9"], ["血红蛋白", "8.9"]], type: 2 }],
                    diagnose: "",
                    prescription: []
                }]
            });
            this.setState({ loading: false });
        }, 1000);

    }

    componentWillMount() {
        this.setState({ loading: false });
        this.setState({ history: [] });
    }

    render() {
        return (  <Popup
            trigger={<Button icon='add' />}
            content="The default theme's basic popup removes the pointing arrow."
            basic
          />)
        // return (
        //     <Grid padded>
        //         <Grid.Row >
        //             <Input type='text' placeholder='头痛，发烧...' action>
        //                 <input />
        //                 <Button type='submit' onClick={this.runSearch.bind(this)} >搜索</Button>
        //             </Input>
        //         </Grid.Row>
        //         <Grid.Row></Grid.Row>
        //         <Grid.Row>
        //             <Table celled>
        //                 <Table.Header>
        //                     <Table.Row>
        //                         <Table.HeaderCell>日期</Table.HeaderCell>
        //                         <Table.HeaderCell>医院</Table.HeaderCell>
        //                         <Table.HeaderCell>科室</Table.HeaderCell>
        //                         <Table.HeaderCell>症状</Table.HeaderCell>
        //                         <Table.HeaderCell>检查记录</Table.HeaderCell>
        //                         <Table.HeaderCell>诊断结果</Table.HeaderCell>
        //                         <Table.HeaderCell>开药记录</Table.HeaderCell>
        //                     </Table.Row>
        //                 </Table.Header>

        //                 {this.state.loading ?
        //                     <Table.Body>
        //                         <Dimmer active inverted>
        //                             <Loader size='medium'>Loading</Loader>
        //                         </Dimmer>
        //                     </Table.Body>
        //                     :
        //                     <Table.Body>
        //                         {this.state.history.map(item =>
        //                             <Table.Row>
        //                                 <Table.Cell>{item.date}</Table.Cell>
        //                                 <Table.Cell>{item.hostipal}</Table.Cell>
        //                                 <Table.Cell>{item.department}</Table.Cell>
        //                                 <Table.Cell>{item.symptom.map(symptomItem => (
        //                                     <Label basic >{symptomItem}</Label>
        //                                 ))}</Table.Cell>
        //                                 <Table.Cell>
                                            
        //                                 </Table.Cell>
        //                                 <Table.Cell></Table.Cell>
        //                                 <Table.Cell></Table.Cell>
        //                             </Table.Row>
        //                         )}
        //                     </Table.Body>
        //                 }

        //             </Table>
        //         </Grid.Row>
        //     </Grid>

        // )
    }
}

export default connect()(History);