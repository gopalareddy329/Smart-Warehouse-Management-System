import React, { useContext, useState } from 'react'
import TableHead from '../../../../components/table/TableHead'
import TableOutLet from '../../../../components/table/TableOutLet'
import Card from '../../../../components/card/Card'
import Expand from './Expand'
import useFetch from '../../../../hooks/useFetch'
import AuthContext from '../../../../context/AuthContext'

const Employee = () => {

  const {authToken}=useContext(AuthContext)
  const {data,loading,error}=useFetch("user/all",authToken.access_token)
  console.log(data)

  const [showDetails,setShowDetails]=useState(null)


  const changeDetails = (index)=>{
        if(showDetails===index){
            setShowDetails(null);
        }
        else{
            setShowDetails(index);
        }
    }
 

  return (
    <div className='w-full max-md:mt-10'>
    
        <TableOutLet>
                
                <div className='w-full border-collapse text-center '>
                <TableHead>
                            <h2 className='w-full'>Name</h2>
                            <h2 className='w-full max-lg:hidden'>Email</h2>
                            <h2 className="w-full">Role</h2>
                            <h2 className='w-full'>Gender</h2>
                            
                </TableHead>
                        {data?.map((employee,index)=>(
                            <div key={index} className=''>
                              <div onClick={()=>changeDetails(index)}>
                                  <Card   index={index}>
                                          <h6 className='w-full'>{employee?.name}</h6>
                                          <h6 className='flex text-center max-lg:hidden  w-full justify-center items-center' >{employee?.employee.email}</h6>
                                          <h6 className=' text-center  w-full'>{employee?.role}</h6>
                                          <h6 className=' w-full text-center '>{employee?.employee?.gender}</h6>
                                         
                                  </Card>
                              </div>
                                {showDetails === index && (
                                        <Expand employee={employee}/>
                                        
                                )}
                            </div>
                        ))}
                    </div>
        </TableOutLet>
      </div>

  )
}

export default Employee