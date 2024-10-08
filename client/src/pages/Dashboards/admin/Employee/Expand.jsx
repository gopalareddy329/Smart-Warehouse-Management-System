import React from 'react'
import ExpandRow from '../../../../components/table/ExpandRow'
const Expand = ({employee}) => {
  return (
    <ExpandRow>
            <div className='flex justify-between  md:justify-center items-center mx-auto gap-5 md:gap-20 w-[90%] md:w-[60%]  '>
                        <div className='w-full  whitespace-nowrap'>
                            <h2 >Name</h2>
                            <h2 >Email</h2>
                            <h2>Mobile</h2>
                            <h2>EmploymentType</h2>
                            <h2>HeavyMachinery</h2>
                            <h2>Experience</h2>
                            <h2>Gender</h2>
                        
                        </div>
                        <div className='w-full whitespace-nowrap max-md:text-right'>
                            <h6 className=''>{employee.name}</h6>
                            <h6>{employee?.employee?.email}</h6>
                            <h6 className=''>{employee?.employee.mobile}</h6>
                            <h6 className=''>{employee?.role}</h6>
                            <h6 className=''>{employee?.employee.heavy_machinery ? ("Yes"):("No")}</h6>
                            <h6 className=''>{employee?.employee.experience}</h6>
                            <h6 className=''>{employee?.employee.gender}</h6>
                           
                        </div>
            </div>
           
    </ExpandRow>
    
  )
}

export default Expand