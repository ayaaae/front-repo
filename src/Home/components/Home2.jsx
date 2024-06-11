import React from 'react';
import "../../css/style.css"
import Menu from "./Menu";
import Home from "./Home";
import Infos from './Infos';
import Opinions from './Opinions';
import BtnScroll from './BtnScroll';
import Footer from './Footer'



function Home2() {
  return (
    <div>
      <main className='main' id="top">
      <div className='content' >
        
        <Menu/>
        <Home/>
        {/* <Infos/> */}
        {/* <Opinions/> */}
        {/* <BtnScroll/> */}
        <Footer/>
      </div>
    </main>
    </div>
  )
}

export default Home2
