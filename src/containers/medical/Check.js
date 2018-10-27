import Check from "../../components/medical/Check"
import { actions as patientActions, getCheckItems } from '../../redux/modules/patients'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";


const mapStateToProps = (state, props) => {
    return {
        medicalCheckItems: getCheckItems(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators(patientActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Check);