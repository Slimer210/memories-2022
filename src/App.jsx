import { useState, useEffect, useRef } from 'react'
import { Howl, Howler } from 'howler';
import { TypeAnimation } from 'react-type-animation';
import {
  BrowserRouter, Routes, Route, useNavigate, 
} from 'react-router-dom';
import { Icon } from '@iconify/react';
import './App.css'
import 'animate.css';

import Year2022 from './routes/2022';





function MainPage() {
  Howler.stop();
  Howler.volume(1);
  const navigate = useNavigate()
  // const history = useHistory()
  const mainElement = useRef(null);
  const navigateLink = () => {
    const currentElement = mainElement.current
    currentElement.classList.add('animate__animated', 'animate__fadeOut');
    console.log('The link was clicked.');
    setTimeout(() => { navigate("/2022") }, 3000);

  }

  return (
    <div className="App">
      <div className='bg-black w-screen h-screen flex flex-col items-center justify-center' ref={mainElement}>
        <div className='border-y border-y-slate-300 w-auto h-auto p-12 animate__animated animate__fadeIn'>
          <h1 className='text-4xl whitespace-pre text-center text-white'>{`MEMORIES\n2022`}</h1>
        </div>
        <div className='p-16 tracking-widest'>
          <TypeAnimation
            sequence={[
              1000,
              '献给你们的一封信',
            ]}
            wrapper="p"
            cursor={true}
            repeat={false}
            speed={300}
          />
        </div>
        <div onClick={() => navigateLink()} className='text-slate-300 flex flex-row gap-x-2 justify-center items-center px-8 py-4 rounded-sm border-slate-300 border transition duration-300 hover:bg-slate-300 hover:text-black select-none'>
          <p>点此阅读</p>
          <Icon icon="ic:baseline-keyboard-double-arrow-right" />
        </div>

      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="2022" element={<Year2022 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
