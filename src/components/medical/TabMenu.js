import React from 'react'
import { Tab } from 'semantic-ui-react'
import Diagnose from '../../containers/medical/Diagnose';
import Check from '../../containers/medical/Check';
import Prescription from '../../containers/medical/Prescription';
import History from '../../containers/medical/History';


const TabMenu = (props) => {

  const panes = [
    {
      menuItem: { key: 'medicalRecord', icon: 'medkit', content: 'Medical Record' },
      render: () => <Tab.Pane attached={false}><Diagnose {...props}></Diagnose></Tab.Pane>
    },
    {
      menuItem: { key: 'medicalCheck', icon: 'balance scale', content: 'Medical Check' },
      render: () => <Tab.Pane attached={false}><Check></Check></Tab.Pane>
    },
    {
      menuItem: { key: 'medicalPrescription', icon: 'edit outline', content: 'Prescription' },
      render: () => <Tab.Pane attached={false}><Prescription/></Tab.Pane>
    },
    {
      menuItem: { key: 'medicalHistory', icon: 'address book outline', content: 'Medical History' },
      render: () => <Tab.Pane attached={false}><History/></Tab.Pane>
    },
  ]
  return (<Tab menu={{ pointing: true }} panes={panes} />)
}

export default TabMenu
