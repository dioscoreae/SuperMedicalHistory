import { combineReducers } from "redux";
import { get, put, post } from "../../utils/request";
import url from "../../utils/url";
import guid from "../../utils/Guid";
import dateUtil from "../../utils/date";
import { stat } from "fs";

const initialState = {
    activePatient: "",
    byId: {
        // "patientId":{
        //     "sequenceNo": "",
        //     "name":"",
        //     "gender": "",
        //     "ID": "",
        //     "status": 1,
        //     "hospitalKey":"",
        //     "doctorID":"",
        //     "medicalRecord":{
        //     },
        //     "medicalCheck":{},
        //     "medicalPrescription":{},
        //     "medicalHistory":{}
        // }
    },
    allIds: []
};

// action types
export const types = {
    GET_PATIENT_LIST: "GET_PATIENT_LIST",
    SEND_TO_CHECK: "SEND_TO_CHECK",
    FINISH_DIAGNOSE: "FINISH_DIAGNOSE",
    SET_DIAGNOSE_ITEM: "SET_DIAGNOSE_ITEM",
    SET_CHECK_ITEM: "SET_CHECK_ITEM",
    SET_MEDICINE_ITEM: "SET_MEDICINE_ITEM",
    SET_ACTIVE_PATIENT: "SET_ACTIVATE_PATIENT",
    GET_HISTORY: "GET_HISTORY",
};

// action creators
export const actions = {
    getPatientList: () => {
        return (dispatch, getState) => {
            if (shouldFetchAllPatients(getState())) {
                return get(url.getPatientList()).then(data => {
                    //dispatch(appActions.finishRequest());
                    if (!data.error) {
                        const { byId, allIds } = convertPatientsToPlain(data);
                        dispatch(fetchAllPatientsSuccess(byId, allIds));
                    } else {
                        //dispatch(appActions.setError(data.error));
                    }
                });
            }
        };
    },

    getHistory: () => {
        return (dispatch, getState) => {
            const activePatientId = getActivePatient(getState()).id;
            
            return get(url.getHistory(activePatientId)).then(data => {
                //dispatch(appActions.finishRequest());
                if (!data.error && data.success) {
                    return convertHistory(data);
                   // dispatch(fetchHistorySuccess(history));
                } else {
                    return [];
                    console.error("fail to get history")
                    //dispatch(appActions.setError(data.error));
                }
            });
        };
    },

    sendPatientToCheck: (medicalRecord) => {
        return (dispatch, getState) => {
            const state = getState();
            const params = {
            };
            //convertMedicalInfoToParams()
            return post(url.sendPatientToCheck(), params).then(data => {
                if (!data.error) {
                    dispatch(sendPatientToCheckSuccess(medicalRecord));
                } else {
                    //error
                }
            });
        };
    },
    finishDiagnose: (loginInfo) => {
        return (dispatch, getState) => {
            const uuid = guid();
            const timestamp = Date.now().toString();
            const caseData = convertToCase(loginInfo,timestamp,uuid,getState);
            return post(url.sendCase(), caseData).then(data => {
                if (!data.error) {
                    //enable below code once backen is ready
                    // const checkData = convertToCheck(uuid,getState);
                    // return post(url.sendCheck(), checkData).then(data=>{
                    //     if(!data.error){
                    //         const medicineData = convertToMedicine(uuid,getState);
                    //         return post(url.sendMedicine(), medicineData).then(data=>{
                    //             if(!data.error){
                    //                 dispatch(finishDiagnoseSuccess(medicalRecord));
                    //             }else{
                    //                 console.error("fail to send medicine");                
                    //             }
                    //         })
                    //     }else{
                    //         console.error("fail to send check");        
                    //     }
                    // });
                } else {
                    console.error("fail to send caee");
                }
            });
        };
    },
    setCheckItem: (itemId, name, result) => {
        return (dispatch, getState) => {
            dispatch(setCheckItemSuccess(itemId, name, result));
        };
    },

    setDiagnoseItem: (name, text) => {
        return (dispatch, getState) => {
            dispatch(setDiagnoseItemSuccess(name, text));
        }
    },

    setMedicineItem: (searchResult, itemId) => {
        return (dispatch, getState) => {
            dispatch(setMedicineItemSuccess(searchResult, itemId));
        };
    },

    setActivePatient: (patientId) => {
        return (dispatch, getState) => {
            dispatch(setActivePatientSuccess(patientId));
        };
    },

};



const convertToCheck = (uuid,getState) =>{
    const state = getState();
    const patient = state[state.activePatient];
    return {
        case_guid : uuid,
        type: JSON.stringify(patient.medicalCheck),
        result: ""
    }
}

const convertToMedicine = (uuid,getState) =>{
    const state = getState();
    const patient = state[state.activePatient];
    return {
        case_guid : uuid,
        medicine_name: JSON.stringify(patient.prescription),
        quantity:"",
        advice:""
    }
}

const convertToCase = (loginInfo,timestamp,uuid,getState) =>{
    const state = getState();
    const patient = state[state.activePatient];
    return {
        case_guid : uuid,
        user_id: patient.id,
        hospital_id: loginInfo.hostipalName,
        timestamp: timestamp,
        department: "内科",
        doctor:loginInfo.doctorName,
        symptom: JSON.stringify(patient.diagnose)
    }
}

const setActivePatientSuccess = (patientId) => ({
    type: types.SET_ACTIVE_PATIENT,
    patientId,
})

const setCheckItemSuccess = (itemId, name, result) => ({
    type: types.SET_CHECK_ITEM,
    itemId,
    name,
    result
})

const setDiagnoseItemSuccess = (name, text) => ({
    type: types.SET_DIAGNOSE_ITEM,
    name,
    text,
})

const setMedicineItemSuccess = (searchResult, itemId) => ({
    type: types.SET_MEDICINE_ITEM,
    searchResult,
    itemId
})

const fetchAllPatientsSuccess = (patients, patientIds) => ({
    type: types.GET_PATIENT_LIST,
    patients,
    patientIds
});

const fetchHistorySuccess = (history) => ({
    type: types.GET_HISTORY,
    history
});

const sendPatientToCheckSuccess = (medicalRecord) => ({
    type: types.SEND_TO_CHECK,
    medicalRecord,
});

const finishDiagnoseSuccess = (medicalRecord) => ({
    type: types.FINISH_DIAGNOSE,
    medicalRecord,
});


// reducers
const allIds = (state = initialState.allIds, action) => {
    switch (action.type) {
        case types.GET_PATIENT_LIST:
            return action.patientIds;
        default:
            return state;
    }
};


const byIdAndActivePatient = (state = { activePatient: initialState.activePatient, byId: initialState.byId }, action) => {
    switch (action.type) {
        case types.GET_PATIENT_LIST:
            return action.patients;
        case types.SEND_TO_CHECK:
            action.medicalRecord.status = 1;
            return {
                ...state,
                [action.patient.id]: action.medicalRecord
            };
        case types.FINISH_DIAGNOSE:
            action.medicalRecord.status = 4;
            return {
                ...state,
                [state.activePatient]: {
                    ...state[state.activePatient],
                    status: 4
                }
            };
        case types.SET_ACTIVE_PATIENT:
            return {
                ...state,
                activePatient: action.patientId,
                [action.patientId]: {
                    ...state[action.patientId],
                    status: 2
                }
            }
        case types.SET_DIAGNOSE_ITEM:
            let diagnose = state[state.activePatient].diagnose;
            if (!diagnose) {
                state[state.activePatient].diagnose = {};
            }
            return {
                ...state,
                [state.activePatient]: {
                    ...state[state.activePatient],
                    diagnose: { ...diagnose, [action.name]: action.text }
                }
            };
        case types.SET_CHECK_ITEM:
            let medicalCheck = state[state.activePatient].medicalCheck;
            if (!medicalCheck) {
                state[state.activePatient].medicalCheck = medicalCheck = [];
            }


            const medicalCheckItem = medicalCheck.find(item => item.itemId === action.itemId);
            if (medicalCheckItem) {
                // medicalCheckItem.itemId = action.itemId;
                // medicalCheckItem.name = action.searchResult.title;
                // medicalCheck.description = action.searchResult.description;
                medicalCheck = medicalCheck.map(item => {
                    if (item.itemId === action.itemId) {
                        switch (action.name) {
                            case "checkItem":
                                //item.itemId = action.itemId;
                                item.name = action.result.title;
                                item.description = action.result.description;
                                item.type = action.result.resultType;
                                item.result = action.result.checkResult;
                                break;
                            case "checkPart":
                                item.checkPart = action.result;
                                break;
                            case "checkPurpose":
                                item.checkPurpose = action.result;
                                break;
                            default:
                            // throw error;
                        }
                    }
                    return item;
                });



            } else {
                let itemId = medicalCheck.length;
                itemId++;
                medicalCheck.push({
                    itemId: itemId.toString(),
                    name: action.result.title,
                    description: action.result.description,
                    checkPart: "",
                    checkPurpose: ""
                })
            }

            //let oldState = state[state.activePatient];
            //const newState = { ...oldState };

            return {
                ...state,
                [state.activePatient]: {
                    ...state[state.activePatient],
                    medicalCheck: [...medicalCheck]
                }
            };
        case types.SET_MEDICINE_ITEM:
            let prescription = state[state.activePatient].prescription;
            if (!prescription) {
                prescription = prescription = [];
            }
            const medicienItem = prescription.find(item => item.itemId === action.itemId);
            if (medicienItem) {
                medicienItem.itemId = action.itemId;
                medicienItem.name = action.searchResult.title;
                medicienItem.description = action.searchResult.description;
            } else {
                let itemId = prescription.length;
                itemId++;
                const descNorm = action.searchResult.description.split("-")
                prescription.push({
                    itemId: itemId.toString(),
                    name: action.searchResult.title,
                    description: descNorm[0],
                    norm: descNorm[1],
                    howtouser: "",
                    frequence: "",
                    days: 0,
                    total: 0,
                    unit: ""
                })
            }

            return {
                ...state,
                [state.activePatient]: {
                    ...state[state.activePatient],
                    prescription: [...prescription]
                }
            }

        default:
            return state;
    }
};

// const activePatient = (state = initialState.activePatient, action) => {
//     switch (action.type) {
//         case types.SET_ACTIVE_PATIENT:
//             return action.patientId;
//         default:
//             return state;
//     }
// };

const reducer = combineReducers({
    // activePatient,
    byIdAndActivePatient,
    allIds
});

export default reducer;

const shouldFetchAllPatients = state => {
    return !state.patients || !state.patients.allIds || state.patients.allIds.length === 0;
};


const convertPatientsToPlain = patients => patients;

const convertHistory = history => {
    
    return history.result.map(item=>{
        return {
            date: dateUtil.getFormatDate(item.timestamp),
            hostipal: item.hospitalid,
            department: item.department,
            symptom: item.symptom,
            //checkRecord: item.check,
            patientId:item.item.userid
        }
    })
};


// selectors
export const getPatientsIds = state => state.patients.allIds;

export const getPatientList = state => {
    return state.patients.allIds.map(patientId => {
        return state.patients.byIdAndActivePatient[patientId];
    })
}

export const getActivePatient = (state) => {
    const _state = state.patients.byIdAndActivePatient;
    if (_state.activePatient == "") {
        return {};
    } else {
        return _state[_state.activePatient];
    }

}

export const getCheckItems = (state) => {
    const _state = state.patients.byIdAndActivePatient;
    let medicalCheck = _state[_state.activePatient].medicalCheck;
    return medicalCheck ? medicalCheck : [];
}


export const getPrescription = (state) => {
    const _state = state.patients.byIdAndActivePatient;
    let prescription = _state[_state.activePatient].prescription;
    return prescription ? prescription : [];
}

export const getDiagnose = state => {
    const _state = state.patients.byIdAndActivePatient;
    if (_state && _state[_state.activePatient]) {
        let diagnose = _state[_state.activePatient].diagnose;
        return diagnose ? diagnose : {};
    } else {
        return {};
    }

}