import React, {  useCallback, useContext, useEffect, useState } from 'react'
import './index.css'
import { CiDeliveryTruck } from "react-icons/ci";
import SlideBar from '../../../components/sideBar/SideBar'
import { VscHistory } from "react-icons/vsc";
import Progress from '../../../components/progress/Progress';
import useFetch from '../../../hooks/useFetch';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Trucks from './trucks/Trucks';
import History from './history/History';
import { SlPeople } from "react-icons/sl";
import Crew from './crew/Crew';
import AuthContext from '@/context/AuthContext';

const ManagerDashboard = () => {
  const {user} = useContext(AuthContext);
  let  navigate= useNavigate();


  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[])


  const {page}=useParams()
  const activePage = page || '';


  

  

  
  
  
    const sideBarData={
      "children":[
        {
          "title":"Trucks",
          "label":<CiDeliveryTruck size={30}/>,
          "path":""
        },
        {
          "title":"Crew",
          "label":<SlPeople size={25}/>,
          "path":"crew"
        },
        {
          "title":"History",
          "label":<VscHistory size={25}/>,
          "path":"history"
        },
        
      ],
    }


  return (
    <div className=' flex  h-fit' style={{"fontSize":"var(--text-font-size)"}} >
      <SlideBar sideBarData={sideBarData}  activePage={activePage}/>
      <section className='w-full  flex md:justify-between max-md:flex-col'>
         
        
          <div className='w-full h-fit max-md:order-2'>
            {activePage==='' && (<Trucks />)}
            {activePage==='history' && (<History />)}
            {activePage==='crew' && (<Crew />)}
          </div>
            
                        
            
            <div className='max-md:order-1'>
              <Progress/>
            </div>
        </section>
        
    </div>
  )
}


export default ManagerDashboard