import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEMS_LOADING, CLEAR_ITEMS, UPDATE_ITEM } from '../actions/types'
  
  
  
const initialState = {
    items: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
            ...state, 
            items: action.payload,
            loading: false
        }
        case UPDATE_ITEM:
            const actionIndex = state.items.findIndex(e => e._id === action.payload._id)
            return {
                ...state,
                loading: false,
                items: state.items.map((item, index) => {
                    if (index !== actionIndex){
                        return item
                    }else{
                        return {
                            ...item,
                            ...action.payload
                        }
                    }
                })
            }
        case DELETE_ITEM:
            return {
                ...state, 
                items: state.items.filter(item => item._id !== action.payload)
            }
        case ADD_ITEM:
            return {
                ...state, 
                items: [...state.items, action.payload,]
            }
        case ITEMS_LOADING: 
            return {
                ...state,
                loading: true
            }
        case CLEAR_ITEMS:
            return{
                ...state,
                items: []
            }
        default:
             return state
    }
}