import SideBar  from "../../components/medical/SideBar"
import { actions as patientActions, getActivePatient } from '../../redux/modules/patients'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";


const mapStateToProps = (state, props) => {
    return {
        activePatient: getActivePatient(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(patientActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);