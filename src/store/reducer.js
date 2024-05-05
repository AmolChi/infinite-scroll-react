const initState = {
    data : [],
    loading: false,
    error: null,
    offset:0
}

const reducer = (state=initState,action)=>{
    switch(action.type){
        case "FETCH_SUCCESS": 
        return{
            ...state,
            data:[...new Set([...state.data,...action.payload])],
            loading:false,
            error:null,
            offset:state.offset + action.payload.length,
        };
        case "FETCH_FAILURE": return{
            ...state,
            loading:false,
            error: action.error,
        }
        default: return state
    }
}

export default reducer;