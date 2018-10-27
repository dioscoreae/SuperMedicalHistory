import React, { Component } from 'react'
import { Table, Search, Dropdown, Input } from 'semantic-ui-react'
import _ from 'lodash'

const options = [
    { key: 'fb', text: '腹部', value: 'fb' },
    { key: 'tb', text: '头部', value: 'tb' },
    { key: 'jq', text: '颈前', value: 'jq' },
    { key: 'jh', text: '颈后', value: 'jh' },
    { key: 'xb', text: '胸部', value: 'xb' },
    { key: 'yjh', text: '右脚踝', value: 'yjh' },
    { key: 'zjh', text: '左脚踝', value: 'zjh' },
    { key: 'bb', text: '背部', value: 'bb' },
]

const source = [
    {
        "title": "A10001",
        "description": "X片",
    },
    {
        "title": "A10002",
        "description": "CT",
    },
    {
        "title": "A10003",
        "description": "B超",
    },
    {
        "title": "B10001",
        "description": "血常规",
    },
    {
        "title": "B10002",
        "description": "肾功能",
    }
]
export default class Check extends Component {

    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleOnChange = (e, data) => {
        let result;
        if (data.options) {
            result = data.options.find(item => item.key === data.value)
        } else {
            result = data.value;
        }
        this.props.setCheckItem(data.itemId, data.name, result);
    }

    handleResultSelect = (e, { result, itemId, name }) => {
        //const { patientId } = this.props
        this.props.setCheckItem(itemId, name, result);
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
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>项目名称</Table.HeaderCell>
                        <Table.HeaderCell>部位</Table.HeaderCell>
                        <Table.HeaderCell>检查目的</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.props.medicalCheckItems.map(item =>
                        (
                            <Table.Row key={item.itmeId}>
                                <Table.Cell>
                                    <Search loading={false}
                                        onResultSelect={this.handleResultSelect}
                                        onSearchChange={this.handleSearchChange}
                                        results={results}
                                        value={item.description}
                                        name="checkItem"
                                        itemId={item.itemId} />
                                </Table.Cell>
                                <Table.Cell><Dropdown onChange={this.handleOnChange} value={item.checkPart === "" ? "" : item.checkPart.value} itemId={item.itemId} name="checkPart" options={options} selection></Dropdown></Table.Cell>
                                <Table.Cell><Input onChange={this.handleOnChange} value={item.checkPurpose} itemId={item.itemId} name="checkPurpose"></Input></Table.Cell>
                            </Table.Row>
                        )
                    )}
                    <Table.Row>
                        <Table.Cell>
                            <Search loading={false}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={this.handleSearchChange}
                                results={results}
                                value=""
                                name="checkItem"
                                itemId="" />
                        </Table.Cell>
                        <Table.Cell><Dropdown itemId="" name="checkPart" options={options} selection></Dropdown></Table.Cell>
                        <Table.Cell><Input itemId="" name="checkPurpose"></Input></Table.Cell>
                    </Table.Row>
                </Table.Body>


            </Table>
        )
    }
}