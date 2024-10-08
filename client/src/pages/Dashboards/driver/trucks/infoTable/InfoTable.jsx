import React, { useContext, useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { startOfDay, endOfDay, setHours, setMinutes } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import AuthContext from '@/context/AuthContext';
import TableHead from '@/components/table/TableHead';
import BASE_URL from '@/utils/baseApi';
import DropDown from '@/components/dropDown/DropDown';

const InfoTable = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const info = searchParams.get('info');
  const { authToken } = useContext(AuthContext);

  const changeState = (index, val) => {
    setChoice(val)
};

  const [choice,setChoice]=useState(1)
  
  const [time, setTime] = useState(null);
  const [file, setFile] = useState(null);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minTime = setHours(setMinutes(startOfDay(tomorrow), 0), 8); 
  const maxTime = setHours(setMinutes(endOfDay(tomorrow), 0), 22); 

  const filterTime = (time) => {
    return time >= minTime && time <= maxTime;
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {


    try {
      const response = await fetch(BASE_URL + `createinvoice/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timedate:time,
          truck_id:info

        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      alert("Submitted");
      navigate("/driver");

    } catch (err) {
      alert("Something went wrong..");
      console.log(err);
    }
  };

  useEffect(() => {
    setTime(tomorrow);
  }, []);

  return (
    <div className='w-full border-collapse text-center'>
      <TableHead>
        <Link to="/driver" className='w-fit cursor-pointer'>
          <IoMdArrowRoundBack size={25}/>
        </Link>
        <h2 className='w-full'>Invoice</h2>          
      </TableHead>
      <form>
        <div className="relative flex gap-2 items-center justify-center">
          <div className="flex items-center ps-3.5 pointer-events-none">
            <svg className="w-5 h-10 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
          </div>
          <DatePicker
            selected={time}
            onChange={(date) => {setTime(date)}}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, h:mm aa"
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            minDate={tomorrow}
            maxDate={tomorrow}
            filterTime={filterTime}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 text-center block w-[150px]"
          />
        </div>
        <div className='mx-auto flex justify-center p-5 items-center gap-5'>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Priority</label>
            <DropDown index={1} choice={choice} changeState={changeState}  data={[1,2,3,4,5]}/>
        </div>

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Upload</label>
        <input 
          className="block w-[200px] text-sm text-gray-900 border mx-auto border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
          id="multiple_files"
          type="file"
          onChange={handleFileChange}
        />
      </form>
      <div>
        <button onClick={handleSubmit} className='bg-[var(--primary-btn)] text-[var(--text-secondary-color)]  m-5 py-3 px-6 rounded-md'>
          Submit
        </button>
      </div>
    </div>
  );
}

export default InfoTable;
