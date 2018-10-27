import React, { Component } from 'react'
import { Table, Search, Dropdown, Input } from 'semantic-ui-react'
import _ from 'lodash'

const options1 = [
    { key: 'kf', text: '口服', value: 'kf' },
    { key: 'cf', text: '冲服', value: 'cf' },
    { key: 'wy', text: '外用', value: 'wy' },
    { key: 'jmzs', text: '静脉注射', value: 'jmzs' },
    { key: 'jrzs', text: '肌肉注射', value: 'jrzs' },
    { key: 'pxzs', text: '皮下注射', value: 'pxzs' },
    { key: 'hf', text: '含服', value: 'hf' },
]

const options2 = [
    { key: 'd1', text: '每天1次', value: 'd1' },
    { key: 'd2', text: '每天2次', value: 'd2' },
    { key: 'd3', text: '每天3次', value: 'd3' },
    { key: 'dd1', text: '两天1次', value: 'dd1' },
    { key: 'ddd1', text: '三天1次', value: 'ddd1' },
    { key: 'w1', text: '每周1次', value: 'w1' },
]

const options3 = [
    { key: 'h', text: '盒', value: 'h' },
    { key: 'b', text: '包', value: 'b' },
    { key: 'p', text: '瓶', value: 'p' },
]

const source = [
    {
        "title": "A10001",
        "description": "阿奇霉素片-0.25g(25万U)",

    },
    {
        "title": "A10002",
        "description": "盐酸环丙沙星片-0.25g(按环丙沙星计)",
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
                        <Table.HeaderCell>药品名称</Table.HeaderCell>
                        <Table.HeaderCell>规格</Table.HeaderCell>
                        <Table.HeaderCell>用法</Table.HeaderCell>
                        <Table.HeaderCell>服用频率</Table.HeaderCell>
                        <Table.HeaderCell>天数</Table.HeaderCell>
                        <Table.HeaderCell>总量</Table.HeaderCell>
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
                                <Table.Cell singleLine><Dropdown placeholder="请选择" itemId={item.id} type="howtouse" options={options1} ></Dropdown></Table.Cell>
                                <Table.Cell singleLine><Dropdown placeholder="请选择" itemId={item.id} type="frequence" options={options2} ></Dropdown></Table.Cell>
                                <Table.Cell singleLine><Input style={{ "width": "3em" }} itemId={item.id} type="days"></Input></Table.Cell>
                                <Table.Cell singleLine><Input style={{ "width": "4em" }} itemId={item.id} type="total"></Input>
                                    <Dropdown placeholder="请选择" itemId={item.id} type="unit" options={options3} ></Dropdown>
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
                                <Table.Cell singleLine><Dropdown   placeholder="请选择"   itemId="" type="howtouse" options={options1} ></Dropdown></Table.Cell>
                                <Table.Cell singleLine><Dropdown placeholder="请选择" itemId="" type="frequence" options={options2} ></Dropdown></Table.Cell>
                                <Table.Cell singleLine><Input style={{ "width": "3em" }} itemId="" type="days"></Input></Table.Cell>
                                <Table.Cell singleLine><Input style={{ "width": "4em" }} itemId="" type="total"></Input>
                                    <Dropdown  placeholder="请选择" itemId="" type="unit" options={options3} ></Dropdown>
                                </Table.Cell>
                            </Table.Row>
                </Table.Body>


            </Table>
        )
    }
}