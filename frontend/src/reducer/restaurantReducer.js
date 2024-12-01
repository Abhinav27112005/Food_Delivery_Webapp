// setup for store


import {ALL_RESTAURANT_FAIL, ALL_RESTAURANT_REQUEST, ALL_RESTAURANT_SUCCESS, CLEAR_ERROR, SORT_BY_RATINGS, SORT_BY_REVIEWS, TOGGLE_VEG_ONLY} from "../constants/restaurantConstant";

const initialState={
    restaurants:[],
};

export const restaurantReducer=(state=initialState,action)=>{
    switch (action.type) {
        case  ALL_RESTAURANT_REQUEST:
            return{
                ...state,
                loading:true,
                error:null,
            };
        case ALL_RESTAURANT_SUCCESS:
            return{
                ...state,
                loading:false,
                count:action.payload.count,
                restaurants:action.payload.restaurants,
            }
        case ALL_RESTAURANT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
        case SORT_BY_RATINGS:
            return{
                ...state,
                restaurants:[...state.restaurants].sort((a,b)=>b.ratings-a.ratings)
            }
        case SORT_BY_REVIEWS:
            return{
                ...state,
                restaurants:[...state.restaurants].sort((a,b)=>b.numOfReviews-a.numOfReviews),
            };
        case TOGGLE_VEG_ONLY:
            return{
                ...state,
                showVegOnly:!state.showVegOnly,
                pureVegRestaurantsCount:calculatePureVegCount(state.restaurants,!state.showVegOnly),
            }
        
            case CLEAR_ERROR:
                return{
                    ...state,
                    error:null,
                }
        default:
            return state; 
    }
}


//Acts as a Middleware
const calculatePureVegCount=(restaurant,showVegOnly)=>{
    if(!showVegOnly) return restaurant.length;
    else{
        return restaurant.filter((restaurant)=>restaurant.isVeg).length;
    }
}