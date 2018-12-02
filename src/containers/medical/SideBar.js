import SideBar  from "../../components/medical/SideBar"
import { actions as patientActions, getDiagnose } from '../../redux/modules/patients'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";


const mapStateToProps = (state, props) => {
    return {
        diagnose: getDiagnose(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(patientActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);