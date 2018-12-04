import React from 'react'
import { Button, Dimmer, Loader,Checkbox, Grid, Label, Dropdown, TextArea, Input, Icon } from 'semantic-ui-react'

const options = [
    { key: 'fr', text: 'Fever', value: 'fr' },
    { key: 'tt', text: 'Headache', value: 'tt' },
    { key: 'bs', text: 'Edema', value: 'bs' },
    { key: 'lt', text: 'Cough ', value: 'lt' },
    { key: 'ssy', text: 'Hemoptysis', value: 'ssy' },
    { key: 'yhqh', text: 'Palpitation', value: 'yhqh' },
    { key: 'js', text: 'Chest discomfort', value: 'js' },
    { key: 'yhcx', text: 'Diarrhea', value: 'yhcx' },
]

const options2 = [
    { key: 'zqgxc', text: 'Hoarseness', value: 'zqgxc' },
    { key: 'gxb', text: 'Hypertension', value: 'gxb' },
    { key: 'jk', text: 'Hyperlipidemia', value: 'jk' },
    { key: 'gxy', text: 'Hepatitis', value: 'gxy' },
    { key: 'gxz', text: 'Heart failure', value: 'gxz' },
    { key: 'sxs', text: 'Goiter', value: 'sxs' },
]

const options3 = [
    { key: 'qms', text: 'Penicillin', value: 'qms' },
    { key: 'lms', text: 'Streptomycin', value: 'lms' },
    { key: 'bbbt', text: 'Phenobarbital', value: 'bbbt' },
    { key: 'plky', text: 'Procaine', value: 'plky' },
    { key: 'cxha', text: 'Sulfonamide', value: 'cxha' },
]

const options4 = [
    { key: 'yy', text: 'Pharyngitis', value: 'yy' },
    { key: 'bdxgm', text: 'Viral influenza', value: 'bdxgm' },
    { key: 'by', text: 'Rhinitis', value: 'by' },
    { key: 'zqgy', text: 'Bronchitis', value: 'zqgy' },
]



const Diagnose = (props) => {

    const mainSymptom = props.diagnose.mainSymptom ? props.diagnose.mainSymptom.map(item=>item.value) : {};
    const bodyTemperature = props.diagnose.bodyTemperature ? props.diagnose.bodyTemperature : "";
    const sBloodPressure = props.diagnose.sBloodPressure ? props.diagnose.sBloodPressure : "";
    const dBloodPressure = props.diagnose.dBloodPressure ? props.diagnose.dBloodPressure : "";
    const pulse = props.diagnose.pulse ? props.diagnose.pulse : "";
    const pastMedicalHis = props.diagnose.pastMedicalHis ? props.diagnose.pastMedicalHis.map(item=>item.value) : {};
    const allergies = props.diagnose.allergies ? props.diagnose.allergies.map(item=>item.value) : {};
    const diagnosis = props.diagnose.diagnosis ? props.diagnose.diagnosis.map(item=>item.value) : {};
    const opinion = props.diagnose.opinion ? props.diagnose.opinion : "";
    

    const toggleSideBar = () => {
        props.toggleSideBar()
    }

    this.handleChange = ((event, data) => {
        let result = null;
        if(data.options){
            result = data.value.map(item=>{
                return  data.options.find(oItem => oItem.key === item);
            })
        }else{
            result = data.value;
        }
        props.setDiagnoseItem(data.name, result);
    }).bind(this);

    let { isLoading } = false;
    if (props.activePatient && props.activePatient.status === 92) {
        isLoading = true;
    }    

    return (
        <div>
        { isLoading ? 
            <Dimmer active inverted>
            <Loader size='medium'>Loading...</Loader>
          </Dimmer> : <span></span>                   
        }

   
        <Grid padded >

            <Grid.Row>
                <Grid.Column style={{ "width": "14%", "padding-left": 0 }}>
                    <Label size="large" color="teal">Chief Complaint</Label></Grid.Column>
                <Grid.Column style={{ "width": "70%", "padding-left": 0 }}>
                    <Dropdown value={mainSymptom}  name="mainSymptom" style={{ "width": "100%" , marginBottom: 3}} multiple search selection options={options} onChange={this.handleChange} />
                    <Button icon onClick={toggleSideBar}>
                        <Icon name='info' />
                        Smart Analysis
                    </Button>
                </Grid.Column>

            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ "padding-left": "0em" }}>
                    <Grid.Row>
                        <Label size="large" color="teal">Genernal Info&nbsp;&nbsp;</Label></Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <span style={{ "padding-right": "1em" }}><Label size="medium" color="teal">Temperature</Label>
                                <Input value={bodyTemperature} name="bodyTemperature" onChange={this.handleChange} style={{ "width": "4em" }} />&nbsp;degrees</span>
                            <span style={{ "padding-right": "1em" }}><Label size="medium" color="teal">Blood pressure</Label>
                                <Input value={sBloodPressure} name="sBloodPressure" onChange={this.handleChange} style={{ "width": "5em" }} placeholder="Low" />/
                                <Input value={dBloodPressure} name="dBloodPressure" onChange={this.handleChange} style={{ "width": "5em" }} placeholder="High" />&nbsp;mmHg </span>
                            <Label size="medium" color="teal">Pulse</Label>
                                <Input value={pulse} name="pulse" onChange={this.handleChange} style={{ "width": "5em" }} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid.Column>

            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ "width": "14%", "padding-left": 0 }}>
                    <Label size="large" color="teal">Illness History&nbsp;&nbsp;</Label></Grid.Column>
                <Grid.Column style={{ "width": "70%", "padding-left": 0 }}><Dropdown value={pastMedicalHis} onChange={this.handleChange} name="pastMedicalHis" style={{ "width": "100%" }} multiple search selection options={options2} /></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ "width": "14%", "padding-left": 0 }}>
                    <Label size="large" color="teal">Allergy History</Label></Grid.Column>
                <Grid.Column style={{ "width": "70%", "padding-left": 0 }}><Dropdown value={allergies} onChange={this.handleChange} name="allergies" style={{ "width": "100%" }} multiple search selection options={options3} /></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ "width": "14%", "padding-left": 0 }}>
                    <Label size="large" color="teal" >Diagnose&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Label></Grid.Column>
                <Grid.Column style={{ "width": "70%", "padding-left": 0 }}> <Dropdown value={diagnosis} onChange={this.handleChange} name="diagnosis" style={{ "width": "100%" }} multiple search selection options={options4} /></Grid.Column>
            </Grid.Row>
            <Grid.Row>

                <Grid.Column style={{ "padding-left": "0em" }}>
                    <Grid.Row><Label style={{ "marginBottom": 3 }} size="large" color="teal">Suggestion&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Label></Grid.Row>
                    <Grid.Row><TextArea value={opinion} name="opinion" onChange={this.handleChange} style={{ minHeight: 100, width: "82%" }} /></Grid.Row>
                </Grid.Column>

            </Grid.Row>

        </Grid>
        </div>
    )
}

export default Diagnose