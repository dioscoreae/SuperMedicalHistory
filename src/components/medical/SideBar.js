import React, { Component } from 'react'
import { Menu, Segment, Sidebar, List } from 'semantic-ui-react'
import GridLayout from '../../containers/medical/GridLayout';

export default class SideBar extends Component {
  state = { visible: false }
  toggleSideBar = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {

    const { visible } = this.state;
    return (
      <div>
        <Sidebar.Pushable as={Segment} >
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='right'
            vertical
            visible={visible}
          >
            <Segment style={{height:"100%"}}>历史症状解读
            <List relaxed='very'>
                <List.Item>
                  <List.Content>
                    <List.Header as='a'>2018-01-09 仁济医院 内科</List.Header>
                    <List.Description>
                      病毒性感冒
                  </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header as='a'>2017-03-09 仁济医院 内科</List.Header>
                    <List.Description>
                      咽喉炎
                  </List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header as='a'>2017-01-09 仁济医院 内科</List.Header>
                    <List.Description>
                    咽喉炎
        </List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </Segment>

          </Sidebar>

          <Sidebar.Pusher >
            <Segment basic>
              <GridLayout toggleSideBar={this.toggleSideBar}></GridLayout>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}
