import React, { Component } from 'react'
import { Container, Divider} from 'semantic-ui-react'
//import GridLayout from './components/medical/GridLayout';
import Headers from "./containers/medical/Header";
import SideBar from './containers/medical/SideBar';
import Login from './containers/medical/Login';


class AppStart extends Component {
    state = { modalOpen: true }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false })

    render() {
        return (
            <Container>
                <Login></Login>
                <Headers></Headers>
                <Divider></Divider>
                <SideBar></SideBar>
            </Container>
        );
    }
}

export default AppStart