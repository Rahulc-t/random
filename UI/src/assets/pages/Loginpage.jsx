import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SignupFooter from '../components/SignupFooter';
import Login from '../components/Login';

function Loginpage() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Navbar /> */}
      <div className="h-[692px] flex flex-col justify-center items-center bg-gray-700">
        <Login />
      </div>
      <SignupFooter />
    </>
  );
}

export default Loginpage;
