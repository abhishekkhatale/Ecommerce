import React from 'react'


import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Details from './components/Details';
import Create from './components/Create';
import Edit from './components/Edit';

function App() {
  return (
    
    <div className="flex h-screen bg-[#ffffff]" >

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/details/:id' element={<Details/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
    </Routes>
   
    </div>

   
    
    
  )
}

export default App