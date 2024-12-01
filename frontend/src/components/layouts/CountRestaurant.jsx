import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurants } from '../../actions/restaurantAction';

const CountRestaurant = () => {
  const disptach=useDispatch();

  const {loading,error,count,pureVegRestaurantCount,showVegOnly }=useSelector((state)=>state.restaurants);
  useEffect(()=>{
    disptach(getRestaurants());
  },[disptach]);


  return (
    <div>
      {loading?(
      <p>Loading Restaurant count...</p>
      ):error?(
      <p>Error:{error}</p>
      ):(<p className='NumOfRestro'>
            {showVegOnly?pureVegRestaurantCount:count} <span className='Restro'> {showVegOnly?pureVegRestaurantCount===1?"Restaurant":"Restaurants":count===1?"Restaurant":"Restaurants"}</span>
        </p>)}
        <br/>
    </div>
  )
}

export default CountRestaurant
