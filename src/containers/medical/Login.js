import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { actions as loginActions, getLoginInfo } from '../../redux/modules/logonInfo';
import { Container, Modal, Button, Header, Icon, Input, List } from 'semantic-ui-react';


class Login extends Component {
    constructor(props) {
        super(props);
        //this.state = { modalOpen:  this.props.currentLoginInfo.hostipalName === ""  };
        this.inputValue = { hostipalName: '', doctorName: '' };
    }

    componentWillMount() {
        this.setState({...this.state, modalOpen: this.props.currentLoginInfo.hostipalName === "" });
    }


    handleClose = (() => {
        this.props.setLogonInfo(this.inputValue.hostipalName, this.inputValue.doctorName);
        this.setState({ modalOpen: false })
    }).bind(this);

    handleChange = ((event, data) => {
        this.inputValue[data.name] = data.value;
    }).bind(this);


    render() {

        return (
            <Container>
                <Modal
                    open={this.props.currentLoginInfo.hostipalName === ""}
                    //onClose={this.handleClose}
                    // basic
                    size='medium'
                >
                    <Header icon='browser' content='医院诊疗信息系统登录' />
                    <Modal.Content>
                        <List>
                            <List.Item>
                                <Input label='医院' name="hostipalName" placeholder='请输入登录医院' onChange={this.handleChange} />
                            </List.Item>
                            <List.Item>
                                <Input label='医生' name="doctorName" placeholder='请输入登录医生' onChange={this.handleChange} />
                            </List.Item>
                        </List>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={this.handleClose} inverted>
                            <Icon name='checkmark' /> 确定
                            </Button>
                    </Modal.Actions>
                </Modal>
            </Container>
        );

    }
}

const mapStateToProps = (state, props) => {
    return {
        currentLoginInfo: getLoginInfo(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(loginActions, dispatch),
        
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);