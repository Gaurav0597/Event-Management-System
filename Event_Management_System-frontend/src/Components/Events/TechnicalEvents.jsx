import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TechEventDataFetch } from '../../Redux/Action'
import {Link} from "react-router-dom"
import EventComponent from './EventComponent'

const TechnicalEvents = () => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.Event.TechnicalEvent)
  console.log(data)

  useEffect(() => {
    dispatch(TechEventDataFetch())
  }, [dispatch])
  return (
   <div>
    <EventComponent data={data}/>
   </div>
  )
}

export default TechnicalEvents
