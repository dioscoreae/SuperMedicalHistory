import React from 'react'
import { Label, Grid, Button } from 'semantic-ui-react'

const Header = (props) => {

    const { name, gender, age, id } = props.activePatient ? props.activePatient : {};

    const { hostipalName, doctorName } = props.loginInfo ? props.loginInfo : {};

    this.handlLogout= (() => {
        props.logout();
    }).bind(this)

    return (
        <Grid style={{ "padding-top": "1em" }} textAlign='left'>
            <Grid.Row>
                <Grid.Column>
                    <Label size="medium" pointing="right">姓名</Label>
                    <Label size="large" as="a" basic>{name}</Label>

                    <Label size="medium" pointing="right">性别</Label>
                    <Label size="medium" as="a" basic>{gender == 1 ? "女" : "男"}</Label>

                    <Label size="medium" pointing="right">年龄</Label>
                    <Label size="medium" as="a" basic>{age}</Label>

                    <Label size="medium" pointing="right">医保号码</Label>
                    <Label size="medium" as="a" basic>{id}</Label>

                    <Label size="medium" pointing="right">医院</Label>
                    <Label size="medium" as="a" basic>{hostipalName}</Label>

                    <Label size="medium" pointing="right">医生</Label>
                    <Label size="medium" as="a" basic>{doctorName}</Label>
                    <Button onClick={this.handlLogout}>退出</Button>
                </Grid.Column>

            </Grid.Row>
        </Grid>


    )
}

export default Header