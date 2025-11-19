import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import AllBlogs from './views/AllBlogs.jsx'
import MyBlogs from './views/MyBlogs.jsx'
import NewBlog from './views/NewBlog.jsx'
import EditBlog from './views/EditBlog.jsx'
import ReadBlog from './views/ReadBlog.jsx'
import Login from './views/Login.jsx'
import Signup from './views/Signup.jsx'
import Navbar from './components/Navbar.jsx'





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
    <Route path='/' element={<AllBlogs/>}/>
    <Route path='/myBlogs' element={<MyBlogs/>}/>
    <Route path='/new' element={<NewBlog/>}/>
    <Route path='/edit/:id' element={<EditBlog/>}/>
    <Route path='/blog/:slug' element={<ReadBlog/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='*' element={<h1 className='text-center'>404 Not</h1>}/>

    
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
