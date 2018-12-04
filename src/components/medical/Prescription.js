import React, { Component } from 'react'
import { Table, Search, Dropdown, Input } from 'semantic-ui-react'
import _ from 'lodash'

const options1 = [
    { key: 'kf', text: 'Oral', value: 'kf' },
    { key: 'cf', text: 'Crush', value: 'cf' },
    { key: 'wy', text: 'External use', value: 'wy' },
    { key: 'jmzs', text: 'Intrav. injec.', value: 'jmzs' },
    { key: 'jrzs', text: 'Intram. injec.', value: 'jrzs' },
    { key: 'pxzs', text: 'Sub. injec.', value: 'pxzs' },
]

const options2 = [
    { key: 'd1', text: 'Once a day', value: 'd1' },
    { key: 'd2', text: '2 times a day', value: 'd2' },
    { key: 'd3', text: '3 times a day', value: 'd3' },
    { key: 'dd1', text: 'Once every two days', value: 'dd1' },
    { key: 'ddd1', text: 'Once every three days', value: 'ddd1' },
    { key: 'w1', text: 'Once a week', value: 'w1' },
]

const options3 = [
    { key: 'h', text: 'Box', value: 'h' },
    { key: 'b', text: 'Package', value: 'b' },
    { key: 'p', text: 'Bottle', value: 'p' },
]

const source = [
    {
        "title": "A10001",
        "description": "Adicillin-0.25g(25U)",

    },
    {
        "title": "A10002",
        "description": "Aditoprim-0.25g",
    },
    {
        "title": "A10003",
        "description": "Adrafinil-0.35g(0.35g)",

    },
    {
        "title": "A10004",
        "description": "Afovirsen-0.25g(30U)",
    },   
    {
        "title": "A10005",
        "description": "Aganodine-0.25g(15U)",
    },    
    {
        "title": "A10006",
        "description": "Batilol-0.25g(15U)",
    },      
    {
        "title": "A10006",
        "description": "Benzylpenicillin-0.25g(15U)",
    },      
]

export default class Prescription extends Component {  
    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result, itemId }) => {
        //const { patientId } = this.props
        this.props.setMedicineItem(result, itemId);
    }

    handleSearchChange = (e, { value, itemId }) => {
        let loadingStatus = {};
        loadingStatus[itemId] = true;
        this.setState({ loadingStatus, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)

            loadingStatus[itemId] = false;    
            this.setState({
                loadingStatus,
                results: _.filter(source, isMatch),
            })
        }, 300)
    }

    render() {
        const { loadingStatus, value, results } = this.state

        return (
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Spec.</Table.HeaderCell>
                        <Table.HeaderCell>Usage</Table.HeaderCell>
                        <Table.HeaderCell>Frequency</Table.HeaderCell>
                        <Table.HeaderCell>Days</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.props.medicineItems.map(item =>
                        (
                            <Table.Row collapsing key={item.id}>
                                <Table.Cell>
                                    <Search loading={false}
                                        onResultSelect={this.handleResultSelect}
                                        onSearchChange={this.handleSearchChange}
                                        results={results}
                                        value={item.description}
                                        type="name"
                                        itemId={item.id} />
                                </Table.Cell>
                                <Table.Cell singleLine><Input style={{ "width": "6em" }} itemId={item.id} type="norm" value={item.norm}></Input></Table.Cell>
                                <Table.Cell singleLine><Dropdown placeholder="Choose" itemId={item.id} type="howtouse" key="kf" value="kf" text="Oral" options={options1}  ></Dropdown></Table.Cell>
                                <Table.Cell singleLine><Dropdown placeholder="Choose" itemId={item.id} type="frequence" key="d1" value="d1" text="Once a day" options={options2}  ></Dropdown></Table.Cell>
                                <Table.Cell singleLine><Input style={{ "width": "3em" }} itemId={item.id} type="days" value={item.days}></Input></Table.Cell>
                                <Table.Cell singleLine><Input style={{ "width": "4em" }} itemId={item.id} type="total" value={item.total}></Input>
                                    <Dropdown placeholder="Choose" itemId={item.id} type="unit" options={options3} ></Dropdown>
                                </Table.Cell>
                            </Table.Row>
                        )
                    )}
                            <Table.Row collapsing>
                                <Table.Cell>
                                    <Search loading={false}
                                        onResultSelect={this.handleResultSelect}
                                        onSearchChange={this.handleSearchChange}
                                        results={results}
                                        value=""
                                        type="name"
                                        itemId="" />
                                </Table.Cell>
                                <Table.Cell singleLine><Input style={{ "width": "6em" }} itemId=""  type="norm"></Input></Table.Cell>
                                <Table.Cell singleLine><Dropdown   placeholder="Choose"   itemId="" type="howtouse" options={options1} ></Dropdown></Table.Cell>
                                <Table.Cell singleLine><Dropdown placeholder="Choose" itemId="" type="frequence" options={options2} ></Dropdown></Table.Cell>
                                <Table.Cell singleLine><Input style={{ "width": "3em" }} itemId="" type="days"></Input></Table.Cell>
                                <Table.Cell singleLine><Input style={{ "width": "4em" }} itemId="" type="total"></Input>
                                    <Dropdown  placeholder="Choose" itemId="" type="unit" options={options3} ></Dropdown>
                                </Table.Cell>
                            </Table.Row>
                </Table.Body>


            </Table>
        )
    }
}