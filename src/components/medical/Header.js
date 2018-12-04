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
                    <Label size="medium" pointing="right">Name</Label>
                    <Label size="large" as="a" basic>{name}</Label>

                    <Label size="medium" pointing="right">Gender</Label>
                    <Label size="medium" as="a" basic>{gender == 1 ? "Female" : "Male"}</Label>

                    <Label size="medium" pointing="right">Age</Label>
                    <Label size="medium" as="a" basic>{age}</Label>

                    <Label size="medium" pointing="right">ID number</Label>
                    <Label size="medium" as="a" basic>{id}</Label>

                    <Label size="medium" pointing="right">Hospital</Label>
                    <Label size="medium" as="a" basic>Huashan Hospital</Label>

                    <Label size="medium" pointing="right">Doctor</Label>
                    {/* <Label size="medium" as="a" basic>{doctorName}</Label> */}
                    <Label size="medium" as="a" basic>Mike Chen</Label>
                    {/* <Button onClick={this.handlLogout}>退出</Button> */}
                </Grid.Column>

            </Grid.Row>
        </Grid>


    )
}

export default Header