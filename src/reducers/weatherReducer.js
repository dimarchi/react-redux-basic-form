import { GET_WEATHER, GET_ERROR } from '../actions';

const initialState = {
    type : '',
    graph : [],
    finished : false
}

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WEATHER :
            const result = {
                type : GET_WEATHER,
                graph : action.payload,
                finished : true
            }
            
            return result;
        case GET_ERROR :
            const errorResult = {
                type : GET_ERROR,
                graph : action.payload,
                finished : false
            }
            return errorResult;
        default : 
            return state;
    }
}

export default weatherReducer;