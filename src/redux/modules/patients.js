import { combineReducers } from "redux";
import { get, put, post } from "../../utils/request";
import url from "../../utils/url";
import guid from "../../utils/Guid";
import getFormatDate from "../../utils/date";

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
    SET_LINKED_DATA: "SET_LINKED_DATA",
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
                    return convertHistory(data, getState);
                   // dispatch(fetchHistorySuccess(history));
                } else {
                    return [];
                    console.error("fail to get history")
                    //dispatch(appActions.setError(data.error));
                }
            });
        };
    },

    sendToCheck: () => {
        return (dispatch, getState) => {
            const state = getState();
            const params = {
            };
            dispatch(sendPatientToCheckSuccess());
            // //convertMedicalInfoToParams()
            // return post(url.sendPatientToCheck(), params).then(data => {
            //     if (!data.error) {
            //         dispatch(sendPatientToCheckSuccess());
            //     } else {
            //         //error
            //     }
            // });
        };
    },
    finishDiagnose: (loginInfo) => {
        return (dispatch, getState) => {
            const uuid = guid();
            const timestamp = Date.now().toString();
            const caseData = convertToCase(loginInfo,timestamp,uuid,getState);
            const checkData_tmp = convertToCheck(uuid,getState);
            const medicineData_tmp = convertToMedicine(uuid,getState);
            console.log("caseData:");
            console.log(JSON.stringify(caseData));
            console.log("checkData_tmp:");
            console.log(JSON.stringify(checkData_tmp));
            console.log("medicineData_tmp:")
            console.log(JSON.stringify(medicineData_tmp));
            return post(url.sendCase(), caseData).then(data => {
                if (!data.error) {
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
                    console.error("send case successfully");
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

    // sendToCheck: () => {
    //     return (dispatch, getState) => {
    //         dispatch(sendToCheckSuccess());
    //     }
    // },    

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

    setLinkedData:() => {
        return (dispatch, getState) => {
            dispatch(setLinkedDataSuccess());
        };        
    }

};



const convertToCheck = (uuid,getState) =>{
    const state = getState();
    const patient = getActivePatient(state);
    return{
        "agrs":[patient.id,uuid,"",JSON.stringify(patient.medicalCheck)]
    }
}

const convertToMedicine = (uuid,getState) =>{
    const state = getState();
    const patient = getActivePatient(state);
    return{
        "agrs":[patient.id,uuid,JSON.stringify(patient.prescription),1,""]
    }
}

const convertToCase = (loginInfo,timestamp,uuid,getState) =>{
    const state = getState();
    const patient = getActivePatient(state);
    return {
        "args":[patient.id, uuid, patient.id, loginInfo.hostipalName,patient.id,timestamp,"内科",loginInfo.doctorName,JSON.stringify(patient.diagnose)]
    }
    // return {

    //     case_guid : uuid,
    //     user_id: patient.id,
    //     hospital_id: loginInfo.hostipalName,
    //     timestamp: timestamp,
    //     department: "内科",
    //     doctor:loginInfo.doctorName,
    //     symptom: JSON.stringify(patient.diagnose)
    // }
}

const setLinkedDataSuccess = () => ({
    type: types.SET_LINKED_DATA,
})

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
            //action.medicalRecord.status = 1;
            return {
                ...state,
                [state.activePatient]: {
                    ...state[state.activePatient],
                    status: 3
                }
            };            
            // return {
            //     ...state,
            //     //[action.patient.id]: action.medicalRecord
            //     [action.activePatient]: action.medicalRecord
            // };
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
                    result: action.result.checkResult,
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

        case types.SET_LINKED_DATA:
            const linkedData = {"id":"0971236045","sequenceNo":"23487asdfqe1","name":"王梅美","gender":"1","age":38,"status":2,"hospitalKey":"","doctorID":"","diagnose":{"mainSymptom":[{"key":"fr","text":"发热","value":"fr"},{"key":"tt","text":"头痛","value":"tt"}],"bodyTemperature":"38.5","sBloodPressure":"93","dBloodPressure":"120","pulse":"85","pastMedicalHis":[{"key":"zqgxc","text":"支气管哮喘","value":"zqgxc"},{"key":"gxb","text":"冠心病","value":"gxb"},{"key":"jk","text":"甲亢","value":"jk"}],"allergies":[{"key":"qms","text":"青霉素","value":"qms"},{"key":"lms","text":"链霉素","value":"lms"}],"diagnosis":[{"key":"yy","text":"咽炎","value":"yy"}],"opinion":""},"medicalCheck":[{"itemId":"1","name":"A10001","description":"X片","checkPart":{"key":"fb","text":"腹部","value":"fb"},"checkPurpose":"是否肺炎"},{"itemId":"2","name":"B10001","description":"血常规","checkPart":{"key":"wu","text":"无","value":""},"checkPurpose":"是否炎症"}],"prescription":[{"itemId":"1","name":"A10001","description":"阿奇霉素片","norm":"0.25g(25万U)","howtouser":"口服","frequence":"每天一次","days":3,"total":3,"unit":"h"}]};
            return {
                ...state,
                "0971236045": linkedData
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

const convertHistory = (history,getState) => {
    const checkRecord1 = [{ name: "B超", result: "右下回声不均匀，左侧也不均匀", type: 1 }, { name: "血常规", result: [["白细胞", "4.9"], ["血红蛋白", "8.9"],["淋巴细胞", "89"]], type: 2 }];
    const checkRecord2 = [{ name: "CT", result: "边缘清晰可见，无明显阴影", type: 1 }, { name: "血常规", result: [["白细胞", "5.9"], ["血红蛋白", "8.5"],["淋巴细胞", "405"]], type: 2 }];
    const checkRecords = [checkRecord1, checkRecord2, checkRecord1, checkRecord2];

    const medicine1 = [{name:"阿奇霉素片"},{name:"阿诺奇灵片"}];
    const medicine2 = [{name:"阿司匹林"},{name:"加硝酸钠片"}];
    const medicines = [medicine1, medicine2,medicine1, medicine2];

    const resutl1 = ["胆结石可能"];
    const resutl2 = ["肺炎"];
    const resutls = [resutl1,resutl2,resutl1,resutl2];

    const currentRecord = getCurrentAsHistory(getState);

    let historyResult =  history.result.map((item,index)=>{
        
        const useCurrent = history.result.length === index + 1 && index > 1;
        return {
            date: getFormatDate(item.Timestamp),
            hostipal: item.Record.hospitalid,
            department: item.Record.department,
            symptom: JSON.parse(item.Record.symptom).mainSymptom,
            checkRecord: useCurrent ? currentRecord.checkRecord: checkRecords[index], //TODO,fake data
            patientId:item.Record.userid,
            result: useCurrent ? currentRecord.result : resutls[index], //TODO 诊断结果
            prescriptions: useCurrent ? currentRecord.prescriptions: medicines[index] //TODO, fake data
        }
    });
    
    return historyResult;
};

const getCurrentAsHistory = (getState)=>{
    const state = getState();
    const patient = getActivePatient(state);
    const checkItem = getCheckItems(state);
    let checkRecord = [];
    if(checkItem){
        checkRecord = checkItem.map(item=>(
            {
                name:item.description,
                result: item.checkResult? item.checkResult : "",
                type: item.type? item.type : 1 
            }
        ));
    }
    const prescriptions = getPrescription(state);
    let prescriptionItems = [];
    if(prescriptions){
        prescriptionItems = prescriptions.map(item=>(
            {
                name:item.description
            }
        ));
    }
    const diagnose = getDiagnose(state);
    let symptomItem = [];
    if(diagnose.mainSymptom){
        symptomItem = diagnose.mainSymptom;
    }
    return {
        date: getFormatDate(new Date().getTime()),
        hostipal: "",//getLoginInfo().hostipalName,
        department: "内科",
        symptom: symptomItem,
        checkRecord: checkRecord, //TODO,fake data
        patientId: patient.id,
        result: diagnose.opinion, //TODO 诊断结果
        prescriptions: prescriptionItems //TODO, fake data
    }    
}


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