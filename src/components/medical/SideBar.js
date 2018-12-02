import React, { Component } from 'react'
import { Menu, Dimmer, Table, Loader, Segment, Sidebar, List } from 'semantic-ui-react'
import GridLayout from '../../containers/medical/GridLayout';

import { render } from 'react-dom'
import { ResponsivePie, Pie, ResponsivePieCanvas } from '@nivo/pie'
import { ResponsiveLine } from '@nivo/line'

export default class SideBar extends Component {
  state = { visible: false, loading: false, count: 0 }

  toggleSideBar = () => {
    if (!this.state.visible) {
      this.setState({ loading: true });

      if (this.state.count == 0) {
        this.props.setLinkedData();
      }

      const count = this.state.count + 1;
      this.setState({ count: count });
    }

    this.setState({ visible: !this.state.visible })
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);

  }

  componentWillMount() {
    this.setState({ loading: false });
  }


  render() {

    const { visible } = this.state;

    const data = [
      {
        "id": "肺炎",
        "label": "肺炎",
        "value": 20,
        "color": "hsl(196, 70%, 50%)"
      },
      {
        "id": "咽喉炎",
        "label": "咽喉炎",
        "value": 55,
        "color": "hsl(175, 70%, 50%)"
      },
      {
        "id": "过敏",
        "label": "过敏",
        "value": 10,
        "color": "hsl(343, 70%, 50%)"
      },
      {
        "id": "其他",
        "label": "其他",
        "value": 15,
        "color": "hsl(51, 70%, 50%)"
      }
    ]

    const data2 = [
      {
        "id": "低压",
        "color": "hsl(323, 70%, 50%)",
        "data": [
          {
            "x": "7/13",
            "y": 88
          },
          {
            "x": "8/5",
            "y": 75
          },
          {
            "x": "8/15",
            "y": 73
          },
          {
            "x": "9/20",
            "y": 79
          },
          {
            "x": "当日",
            "y": 93
          }
        ]
      },
      {
        "id": "高压",
        "color": "hsl(274, 70%, 50%)",
        "data": [
          {
            "x": "7/13",
            "y": 100
          },
          {
            "x": "8/5",
            "y": 110
          },
          {
            "x": "8/15",
            "y": 113
          },
          {
            "x": "9/20",
            "y": 110
          },
          {
            "x": "当日",
            "y": 120
          }
        ]
      }
    ]

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
            <Segment style={{ height: "100%" }}>历史症状解读
              {this.state.loading ?
                <Table.Body>
                  <Dimmer active inverted>
                    <Loader size='medium'>正在搜索...</Loader>
                  </Dimmer>
                </Table.Body>
                :
                <div><List relaxed='very'>
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
                  
                  <div style={{ height: "200px" }}>
                    <ResponsiveLine
                      data={data2}
                      margin={{
                        "top": 50,
                        "right": 10,
                        "bottom": 50,
                        "left": 30
                      }}
                      xScale={{
                        "type": "point"
                      }}
                      yScale={{
                        "type": "linear",
                        "stacked": false,
                        "min": "auto",
                        "max": "auto"
                      }}
                      minY="auto"
                      maxY="auto"
                      stacked={false}
                      axisBottom={{
                        "orient": "bottom",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "legend": "",
                        "legendOffset": 36,
                        "legendPosition": "middle"
                      }}
                      axisLeft={{
                        "orient": "left",
                        "tickSize": 5,
                        "tickPadding": 5,
                        "tickRotation": 0,
                        "legend": "count",
                        "legendOffset": -40,
                        "legendPosition": "middle"
                      }}
                      dotSize={10}
                      dotColor="inherit:darker(0.3)"
                      dotBorderWidth={2}
                      dotBorderColor="#ffffff"
                      enableDotLabel={true}
                      dotLabel="y"
                      dotLabelYOffset={-12}
                      animate={true}
                      motionStiffness={90}
                      motionDamping={15}
                    />
                  </div>
                  <div style={{ height: "200px" }}>
                    <ResponsivePieCanvas
                      data={data}
                      margin={{
                        "top": 40,
                        "bottom": 40,
                      }}
                      pixelRatio={1}
                      innerRadius={0.5}
                      padAngle={0.7}
                      cornerRadius={3}
                      colors="paired"
                      colorBy="id"
                      borderColor="inherit:darker(0.6)"
                      radialLabelsSkipAngle={10}
                      radialLabelsTextXOffset={6}
                      radialLabelsTextColor="#333333"
                      radialLabelsLinkOffset={0}
                      radialLabelsLinkDiagonalLength={16}
                      radialLabelsLinkHorizontalLength={24}
                      radialLabelsLinkStrokeWidth={1}
                      radialLabelsLinkColor="inherit"
                      slicesLabelsSkipAngle={10}
                      slicesLabelsTextColor="#333333"
                      animate={true}
                      motionStiffness={90}
                      motionDamping={15}
                      defs={[
                        {
                          "id": "dots",
                          "type": "patternDots",
                          "background": "inherit",
                          "color": "rgba(255, 255, 255, 0.3)",
                          "size": 4,
                          "padding": 1,
                          "stagger": true
                        },
                        {
                          "id": "lines",
                          "type": "patternLines",
                          "background": "inherit",
                          "color": "rgba(255, 255, 255, 0.3)",
                          "rotation": -45,
                          "lineWidth": 6,
                          "spacing": 10
                        }
                      ]}
                      fill={[
                        {
                          "match": {
                            "id": "ruby"
                          },
                          "id": "dots"
                        },
                        {
                          "match": {
                            "id": "c"
                          },
                          "id": "dots"
                        },
                        {
                          "match": {
                            "id": "go"
                          },
                          "id": "dots"
                        },
                        {
                          "match": {
                            "id": "python"
                          },
                          "id": "dots"
                        },
                        {
                          "match": {
                            "id": "scala"
                          },
                          "id": "lines"
                        },
                        {
                          "match": {
                            "id": "lisp"
                          },
                          "id": "lines"
                        },
                        {
                          "match": {
                            "id": "elixir"
                          },
                          "id": "lines"
                        },
                        {
                          "match": {
                            "id": "javascript"
                          },
                          "id": "lines"
                        }
                      ]}

                    />
                  </div>                  
                </div>
              }
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
