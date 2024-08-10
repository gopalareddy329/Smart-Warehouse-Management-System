import Card from '@/components/card/Card'
import DropDown from '@/components/dropDown/DropDown'
import TableHead from '@/components/table/TableHead'
import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const InfoTable = () => {
    const products = [
      { productid: "1234" },
      { productid: "4567" },
      { productid: "986886" }
  ];
    const [formData, setFormData] = useState([{
      productid: '',
      state: '',
    }]);
    

    const changeState = (index, val) => {
      setFormData(prevFormData => 
          prevFormData.map((item, i) =>
              i === index ? { ...item, state: val } : item
          )
      );
  };

  useEffect(() => {
    setFormData(products.map((product) => ({
        productid: product.productid,
        state: "--"
    })));
}, []);


    const handleSubmit = () => {
      const isValid = formData.every(item => item.state !== "--");
      if (isValid) {
        console.log('Form Data Submitted:');
      } else {
        alert("All states must be filled out");
    }
    };
    
  return (
    <div className='w-full border-collapse text-center '>
                <TableHead>
                            <Link to="/supervisor" className='w-fit cursor-pointer'><IoMdArrowRoundBack size={25}/></Link>
                            <h2 className='w-full'>Product Id</h2>
                            <h2 className='w-full'>State</h2>
                            
                </TableHead>
                <div>
                        {formData?.map((data,index)=>(
                            <div key={index} >
                              <div>
                                  <Card   index={index}>
                                          <input value={data?.productid} disabled className='w-full text-center ml-4' required/>
                                          <div className='w-full flex justify-center py-5' >
                                              <input value={data.state} className='hidden' readOnly required={true}/>
                                              <DropDown index={index} choice={data.state} changeState={changeState} data={["Good","Missing","Damage"]}/>
                                          </div>
                                   
                                  </Card>
                              </div>
                                
                            </div>
                        ))}
                        <button onClick={()=>{handleSubmit()}} className='bg-[var(--primary-btn)] text-[var(--text-secondary-color)]  m-5 py-3 px-6 rounded-md' type='none'>Submit</button>
                </div>
    </div>
  )
}

export default InfoTable