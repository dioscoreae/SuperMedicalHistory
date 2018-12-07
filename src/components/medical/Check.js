import React, { Component } from 'react'
import { Table, Search, Dropdown, Input,Dimmer, Loader } from 'semantic-ui-react'
import _ from 'lodash'

const options = [
    { key: 'wu', text: 'N.A', value: 'wu' },
    { key: 'fb', text: 'Abdomen', value: 'fb' },
    { key: 'tb', text: 'Head', value: 'tb' },
    { key: 'jq', text: 'Neck front', value: 'jq' },
    { key: 'jh', text: 'Behind the neck', value: 'jh' },
    { key: 'xb', text: 'Chest', value: 'xb' },
    { key: 'yjh', text: 'Right ankle', value: 'yjh' },
    { key: 'zjh', text: 'Left ankle', value: 'zjh' },
    { key: 'bb', text: 'Back', value: 'bb' },
]

const source = [
    {
        "title": "A10001",
        "description": "X-ray",
    },
    {
        "title": "A10002",
        "description": "CT",
    },
    {
        "title": "A10003",
        "description": "MRI",
    },
    {
        "title": "A10004",
        "description": "C-Reactive protein",
    },    
    {
        "title": "B10001",
        "description": "Blood routine",
    },
    {
        "title": "B10002",
        "description": " Renal function",
    }
]
export default class Check extends Component {

    componentWillMount() {
        this.resetComponent()
        setTimeout(() => {
            this.setState({ isLoading: false });
          }, 1300);        
    }

    resetComponent = () => this.setState({ isLoading: true, results: [], value: '' })

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
        const checkResult = this.getCheckResult(result);
        this.props.setCheckItem(itemId, name, checkResult);
    }

    getCheckResult = (result) => {
        if (result.title === "A10001") {
            result.resultType = 1;
            result.checkResult = "无明显异常，边界轮廓清晰"
        } else if (result.title === "A10002") {
            result.resultType = 1;
            result.checkResult = "无明显异常，边界轮廓清晰"
        } else if (result.title === "A10003") {
            result.resultType = 1;
            result.checkResult = "回声清晰无明显异常，边界轮廓较为清晰"
        } else if (result.title === "B10001") {
            result.resultType = 2;
            result.checkResult = [["白细胞", "4.9"], ["血红蛋白", "8.9"],["淋巴细胞", "89"]];
        } else if (result.title === "B10002") {
            result.resultType = 2;
            result.checkResult = [["血尿素氮", "5.9mol/L"], ["血尿素", "7.0mmol/L"],["血肌酐", "132.6μmol/L"],["血尿酸", "434μmol/L"]];
        }
        return result;
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
        const { loadingStatus, value, results, isLoading } = this.state
        return (
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Part</Table.HeaderCell>
                        <Table.HeaderCell>Purpose</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

        { isLoading ? 
            <Dimmer active inverted>
            <Loader size='medium'>Loading...</Loader>
          </Dimmer> : 
        

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
                                <Table.Cell><Dropdown onChange={this.handleOnChange} text={item.checkPart.text} value={item.checkPart === "" ? "" : item.checkPart.value} itemId={item.itemId} name="checkPart" options={options} selection></Dropdown></Table.Cell>
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

                        }
            </Table>
        )
    }
}