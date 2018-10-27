import PatientList from "../../components/medical/PatientList"
import { actions as patientActions, getPatientList, getActivePatient } from '../../redux/modules/patients'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";


const mapStateToProps = (state, props) => {
    return {
        patientList: getPatientList(state),
        activePatient: getActivePatient(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(patientActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);