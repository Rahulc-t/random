import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AboutmeIntro from '../components/AboutmeIntro';
import Footer from '../components/Footer';

function Aboutme() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Navbar /> */}
      <AboutmeIntro/>
      <Footer/>

    </>
  );
}

export default Aboutme ;
