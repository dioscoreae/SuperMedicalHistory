import Header from "../../components/medical/Header"
import { getActivePatient } from '../../redux/modules/patients'
import { getLoginInfo, actions as loginInfoActions } from '../../redux/modules/logonInfo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


const mapStateToProps = (state, props) => {
    return {
        activePatient: getActivePatient(state),
        loginInfo: getLoginInfo(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(loginInfoActions, dispatch),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);