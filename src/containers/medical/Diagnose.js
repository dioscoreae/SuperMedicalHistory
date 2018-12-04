import Diagnose from "../../components/medical/Diagnose"
import { actions as patientActions, getDiagnose ,getActivePatient } from '../../redux/modules/patients'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";


const mapStateToProps = (state, props) => {
    return {
        diagnose: getDiagnose(state),
        activePatient: getActivePatient(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(patientActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Diagnose);