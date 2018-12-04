import React, { Component } from 'react'
import { Menu, Dimmer, Table, Loader, Segment, Sidebar, Label, List } from 'semantic-ui-react'
import GridLayout from '../../containers/medical/GridLayout';

import { render } from 'react-dom'
import { ResponsivePie, Pie, ResponsivePieCanvas } from '@nivo/pie'
import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from '@nivo/bar'

export default class SideBar extends Component {
  state = { visible: false, loading: false, count: 0 }

  toggleSideBar = () => {
    if (!this.state.visible) {
      this.setState({ loading: true });

      if (this.state.count == 0) {
        //this.props.setLinkedData();
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
    let { isChecking } = false;
    if (this.props.activePatient && this.props.activePatient.status === 91) {
      isChecking = true;
    }

    let { afterCheck } = false;

    if (this.props.activePatient && this.props.activePatient.status === 3) {
      afterCheck = true;
    }

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

    const data3 = [
      {
        "diagnosis": "Pneumonia",
        "r1": 40,
        "r1Color": "hsl(350, 70%, 50%)",
      },
      {
        "diagnosis": "Pharyngitis",
        "r2": 63,
        "r2Color": "hsl(138, 70%, 50%)",
      },
      {
        "diagnosis": "Rhinitis",
        "r3": 58,
        "r3Color": "hsl(322, 70%, 50%)",
      },
      {
        "diagnosis": "Tracheitis",
        "r4": 45,
        "r4Color": "hsl(227, 70%, 50%)",
      }
    ]

    const data4 = [
      {
        "diagnosis": "Pneumonia",
        "r1": 35,
        "r1Color": "hsl(350, 70%, 50%)",
      },
      {
        "diagnosis": "Pharyngitis",
        "r2": 75,
        "r2Color": "hsl(138, 70%, 50%)",
      },
      {
        "diagnosis": "Rhinitis",
        "r3": 50,
        "r3Color": "hsl(322, 70%, 50%)",
      },
      {
        "diagnosis": "Tracheitis",
        "r4": 47,
        "r4Color": "hsl(227, 70%, 50%)",
      }
    ]

    let chartData = afterCheck ? data4 : data3;

    return (
      <div>

        <Sidebar.Pushable as={Segment} >
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='right'
            vertical
            width='wide'
            visible={visible}
          >
            <Segment style={{ height: "100%" }}><Label size="Huge" color="grey">Smart analysis</Label>
              {this.state.loading ?
                <Table.Body>
                  <Dimmer active inverted>
                    <Loader size='medium'>Loading...</Loader>
                  </Dimmer>
                </Table.Body>
                :
                <div style={{ height: "400px" }}>
                  {isChecking ? <Dimmer active inverted>
                    <Loader size='medium'>Loading...</Loader>
                  </Dimmer> : <span></span>}
                  <ResponsiveBar
                    data={chartData}
                    keys={[
                      "r1",
                      "r2",
                      "r3",
                      "r4",
                    ]}
                    indexBy="diagnosis"
                    margin={{
                      "top": 50,
                      "bottom": 50,
                      "left": 30,
                      "right": 10,
                    }}
                    padding={0.3}
                    colors="nivo"
                    colorBy="id"
                    defs={[
                      {
                        "id": "dots",
                        "type": "patternDots",
                        "background": "inherit",
                        "color": "#38bcb2",
                        "size": 4,
                        "padding": 1,
                        "stagger": true
                      },
                      {
                        "id": "lines",
                        "type": "patternLines",
                        "background": "inherit",
                        "color": "#eed312",
                        "rotation": -45,
                        "lineWidth": 6,
                        "spacing": 10
                      }
                    ]}
                    fill={[
                      {
                        "match": {
                          "id": "fries"
                        },
                        "id": "dots"
                      },
                      {
                        "match": {
                          "id": "sandwich"
                        },
                        "id": "lines"
                      }
                    ]}
                    borderColor="inherit:darker(1.6)"
                    axisBottom={{
                      "tickSize": 5,
                      "tickPadding": 5,
                      "tickRotation": 0,
                      "legend": "Type of disease",
                      "legendPosition": "middle",
                      "legendOffset": 32
                    }}
                    axisLeft={{
                      "tickSize": 5,
                      "tickPadding": 5,
                      "tickRotation": 0,
                      "legend": "Probability",
                      "legendPosition": "middle",
                      "legendOffset": -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor="inherit:darker(1.6)"
                    animate={true}
                    motionStiffness={80}
                    motionDamping={15}
                  // legends={[
                  //   {
                  //     "dataFrom": "keys",
                  //     "anchor": "bottom-right",
                  //     "direction": "row",
                  //     "justify": false,
                  //     "translateX": 120,
                  //     "translateY": 0,
                  //     "itemsSpacing": 2,
                  //     "itemWidth": 100,
                  //     "itemHeight": 20,
                  //     "itemDirection": "left-to-right",
                  //     "itemOpacity": 0.85,
                  //     "symbolSize": 20,
                  //     "effects": [
                  //       {
                  //         "on": "hover",
                  //         "style": {
                  //           "itemOpacity": 1
                  //         }
                  //       }
                  //     ]
                  //   }
                  // ]}
                  />
                  {afterCheck ?
                    <table border="0" cellpadding="5">
                      <tbody>
                        <tr>
                          <td style={{ paddingRight: 5 }}><div style={{ width: 20, height: 20, backgroundColor: "#e8c1a0" }}></div></td>
                          <td><div>35% Pneumonia - 58% of women between the ages of 30 and 40</div></td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td><div style={{ width: 20, height: 20, backgroundColor: "#f47560" }}></div></td>
                          <td><div> 75% Pharyngitis - 62% of women between the ages of 35 and 42</div></td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td><div style={{ width: 20, height: 20, backgroundColor: "#f1e15b" }}></div></td>
                          <td><div> 50% Rhinitis - 68% of women between the ages of 30 and 45</div></td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td><div style={{ width: 20, height: 20, backgroundColor: "#e8a838" }}></div></td>
                          <td><div> 47% Tracheitis - 55% of women between the ages of 28 and 38</div></td>
                        </tr>
                      </tbody>
                    </table>
                    :
                    <table border="0" cellpadding="5">
                      <tbody>
                        <tr>
                          <td style={{ paddingRight: 5 }}><div style={{ width: 20, height: 20, backgroundColor: "#e8c1a0" }}></div></td>
                          <td><div>40% Pneumonia - 58% of women between the ages of 30 and 40</div></td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td><div style={{ width: 20, height: 20, backgroundColor: "#f47560" }}></div></td>
                          <td><div> 63% Pharyngitis - 62% of women between the ages of 35 and 42</div></td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td><div style={{ width: 20, height: 20, backgroundColor: "#f1e15b" }}></div></td>
                          <td><div> 58% Rhinitis - 68% of women between the ages of 30 and 45</div></td>
                        </tr>
                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                        <tr>
                          <td><div style={{ width: 20, height: 20, backgroundColor: "#e8a838" }}></div></td>
                          <td><div> 45% Tracheitis - 55% of women between the ages of 28 and 38</div></td>
                        </tr>
                      </tbody>
                    </table>
                  }
                  {/* <div style={{ width: 20, height:20, backgroundColor:"#e8c1a0",float:"left", marginBottom:5 }}></div>
                  <div>40% pneumonia </div>
                  
                  <div style={{ width: 20, height:20, backgroundColor:"#f47560", float:"left" ,marginLeft:-20, marginTop:5 }}></div>
                  <div style={{paddingTop:5}}> 40% pneumonia - 60% of women between the ages of 30 and 40</div>
                  <div style={{ width: 20, height:20, backgroundColor:"#f1e15b", float:"left" ,marginLeft:-20, marginTop:5  }}></div>
                  <div style={{paddingTop:5}}> 40% pneumonia - 60% of women between the ages of 30 and 40</div>
                  <div style={{ width: 20, height:20, backgroundColor:"#e8a838", float:"left" ,marginLeft:-20, marginTop:5   }}></div>
                  <div style={{paddingTop:5}}> 40% pneumonia - 60% of women between the ages of 30 and 40</div> */}

                  {/* <List relaxed='very'>
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
                </List> */}

                  {/* <div style={{ height: "200px" }}>
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
                  { pieVisible ?
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
                  : <div></div>}                  */}
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
