import React, {Component} from 'react'
import { Button, Table, Search, Grid, Label, Dropdown, Icon, Input } from 'semantic-ui-react'
import _ from 'lodash'

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

    handleResultSelect = (e, { result }) => this.setState({ value: result.description })    

    handleSearchChange = (e, { value, type }) => {
        this.setState({ isLoading: true, value })
    
        setTimeout(() => {
          if (this.state.value.length < 1) return this.resetComponent()
    
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = result => re.test(result.title)
    
          this.setState({
            isLoading: false,
            results: _.filter(source, isMatch),
          })
        }, 300)
      }    

    render() {
        const { isLoading, value, results } = this.state
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
                    <Table.Row>
                        <Table.Cell>
                            <Search loading={isLoading}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={this.handleSearchChange}
                                results={results}
                                value={value}
                                type = "checkItem" />
                        </Table.Cell>
                        <Table.Cell><Dropdown></Dropdown></Table.Cell>
                        <Table.Cell><Input></Input></Table.Cell>
                    </Table.Row>
                </Table.Body>


            </Table>
        )
    }
}