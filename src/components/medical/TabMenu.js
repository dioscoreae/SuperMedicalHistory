import React from 'react'
import { Tab } from 'semantic-ui-react'
import Diagnose from '../../containers/medical/Diagnose';
import Check from '../../containers/medical/Check';
import Prescription from '../../containers/medical/Prescription';
import History from '../../containers/medical/History';


const TabMenu = (props) => {

  const panes = [
    {
      menuItem: { key: 'medicalRecord', icon: 'medkit', content: '就诊记录' },
      render: () => <Tab.Pane attached={false}><Diagnose {...props}></Diagnose></Tab.Pane>
    },
    {
      menuItem: { key: 'medicalCheck', icon: 'balance scale', content: '检查化验' },
      render: () => <Tab.Pane attached={false}><Check></Check></Tab.Pane>
    },
    {
      menuItem: { key: 'medicalPrescription', icon: 'edit outline', content: '治疗处方' },
      render: () => <Tab.Pane attached={false}><Prescription/></Tab.Pane>
    },
    {
      menuItem: { key: 'medicalHistory', icon: 'address book outline', content: '医疗档案' },
      render: () => <Tab.Pane attached={false}><History/></Tab.Pane>
    },
  ]
  return (<Tab menu={{ pointing: true }} panes={panes} />)
}

export default TabMenu
