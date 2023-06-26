import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const Spinners = ( {path="login"}) => {
  const navigate = useNavigate();
  const Location=useLocation()
  const [count,seCount]=useState(5)

  useEffect(() => {
    const interval=setInterval(()=>{
        seCount(count-1);


    },1000)

    count===0&& navigate(`/${path}`, {
        state:Location.pathname
    })
    return ()=>clearInterval(interval)
  }, [navigate,count,path]);

  return (
    <div>
      <div className="d-flex justify-content-center flex-column align-items-center" style={{ height: '100vh' }}>
      <h1 className='text-center'> Redirecting in {count}sec please wait.......</h1>
        <div className="spinner-border spinner-lg" role="status">
        
          <span className="sr-only"></span>
        </div>
      </div>
    </div>
  );
};

export default Spinners;