import React from 'react'
import { Button, Checkbox, Grid, Label, Dropdown, TextArea, Input, Icon } from 'semantic-ui-react'

const options = [
    { key: 'fr', text: '发热', value: 'fr' },
    { key: 'tt', text: '头痛', value: 'tt' },
    { key: 'bs', text: '鼻塞', value: 'bs' },
    { key: 'lt', text: '流涕', value: 'lt' },
    { key: 'ssy', text: '声嘶哑', value: 'ssy' },
    { key: 'yhqh', text: '咽喉轻红', value: 'yhqh' },
    { key: 'js', text: '咳嗽', value: 'js' },
    { key: 'yhcx', text: '咽喉充血', value: 'yhcx' },
]

const options2 = [
    { key: 'zqgxc', text: '支气管哮喘', value: 'zqgxc' },
    { key: 'gxb', text: '冠心病', value: 'gxb' },
    { key: 'jk', text: '甲亢', value: 'jk' },
    { key: 'gxy', text: '高血压', value: 'gxy' },
    { key: 'gxz', text: '高血脂', value: 'gxz' },
    { key: 'sxs', text: '输血史', value: 'sxs' },
]

const options3 = [
    { key: 'qms', text: '青霉素', value: 'qms' },
    { key: 'lms', text: '链霉素', value: 'lms' },
    { key: 'bbbt', text: '苯巴比妥', value: 'bbbt' },
    { key: 'plky', text: '普鲁卡因', value: 'plky' },
    { key: 'cxha', text: '畅销磺胺', value: 'cxha' },
]

const options4 = [
    { key: 'yy', text: '咽炎', value: 'yy' },
    { key: 'bdxgm', text: '病毒性感冒', value: 'bdxgm' },
    { key: 'by', text: '鼻炎', value: 'by' },
    { key: 'zqgy', text: '支气管炎', value: 'zqgy' },
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

    return (
        
        <Grid padded >

            <Grid.Row>
                <Grid.Column style={{ "width": "12%", "padding-left": 0 }}>
                    <Label size="large" color="teal">病人主诉</Label></Grid.Column>
                <Grid.Column style={{ "width": "70%", "padding-left": 0 }}>
                    <Dropdown value={mainSymptom}  name="mainSymptom" style={{ "width": "100%" }} multiple search selection options={options} onChange={this.handleChange} />
                    <Button icon onClick={toggleSideBar}>
                        <Icon name='info' />
                        历史症状解读
                    </Button>
                </Grid.Column>

            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ "padding-left": "0em" }}>
                    <Grid.Row>
                        <Label size="large" color="teal">基本检查</Label></Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <span style={{ "padding-right": "1em" }}><Label size="medium" color="teal">体温</Label>
                                <Input value={bodyTemperature} name="bodyTemperature" onChange={this.handleChange} style={{ "width": "4em" }} />度</span>
                            <span style={{ "padding-right": "1em" }}><Label size="medium" color="teal">血压</Label>
                                <Input value={sBloodPressure} name="sBloodPressure" onChange={this.handleChange} style={{ "width": "5em" }} placeholder="收缩压" />/
                                <Input value={dBloodPressure} name="dBloodPressure" onChange={this.handleChange} style={{ "width": "5em" }} placeholder="舒张压" />mmHg </span>
                            <Label size="medium" color="teal">脉搏</Label>bpm
                                <Input value={pulse} name="pulse" onChange={this.handleChange} style={{ "width": "5em" }} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid.Column>

            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ "width": "12%", "padding-left": 0 }}>
                    <Label size="large" color="teal">既往病史</Label></Grid.Column>
                <Grid.Column style={{ "width": "70%", "padding-left": 0 }}><Dropdown value={pastMedicalHis} onChange={this.handleChange} name="pastMedicalHis" style={{ "width": "100%" }} multiple search selection options={options2} /></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ "width": "12%", "padding-left": 0 }}>
                    <Label size="large" color="teal">过敏史</Label></Grid.Column>
                <Grid.Column style={{ "width": "70%", "padding-left": 0 }}><Dropdown value={allergies} onChange={this.handleChange} name="allergies" style={{ "width": "100%" }} multiple search selection options={options3} /></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{ "width": "12%", "padding-left": 0 }}>
                    <Label size="large" color="teal" >诊断</Label></Grid.Column>
                <Grid.Column style={{ "width": "70%", "padding-left": 0 }}> <Dropdown value={diagnosis} onChange={this.handleChange} name="diagnosis" style={{ "width": "100%" }} multiple search selection options={options4} /></Grid.Column>
            </Grid.Row>
            <Grid.Row>

                <Grid.Column style={{ "padding-left": "0em" }}>
                    <Grid.Row><Label size="large" color="teal">处理意见</Label></Grid.Row>
                    <Grid.Row><TextArea value={opinion} name="opinion" onChange={this.handleChange} style={{ minHeight: 100, width: "82%" }} /></Grid.Row>
                </Grid.Column>

            </Grid.Row>

        </Grid>
    )
}

export default Diagnose