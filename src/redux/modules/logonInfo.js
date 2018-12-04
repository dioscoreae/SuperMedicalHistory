
const initialState = {
  hostipalName: "",
  doctorName: ""
};

// action types
export const types = {
  //GET_LOGON_INFO :"GET_LOGON_INFO",
  SET_LOGON_INFO: "SET_LOGON_INFO",
  LOGOUT: "LOGOUT",
};

// action creators
export const actions = {
  // getLogonInfo: () => ({
  //   type: types.GET_LOGON_INFO
  // }),
  setLogonInfo: (hostipalName, doctorName) => ({
    type: types.SET_LOGON_INFO,
    hostipalName,
    doctorName
  }),
  logout: () => ({ type: types.LOGOUT })
};

// reducers
const reducer = (state = { hostipalName: "Huashan Hostipal", doctorName: "Mike Chen" }, action) => {
  switch (action.type) {
    case types.SET_LOGON_INFO:
      return { ...state, hostipalName: action.hostipalName, doctorName: action.doctorName };
    case types.LOGOUT:
      return {
        ...state, hostipalName: "", doctorName: ""
      }
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getLoginInfo = state => {
  return state.logonInfo;
};