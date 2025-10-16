import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowerRouter, Routes, Route} from 'react-router'
import AllBlogs from './views/AllBlogs.jsx';
import MyBlogs from './views/MyBlogs.jsx';
import NewBlog from './views/NewBlog.jsx';
import EditBlog from './views/EditBlog.jsx';
import ReadBlog from './views/ReadBlog.jsx';




createRoot(document.getElementById('root')).render(
  <BrowerRouter>
  <Routes>
    <Route path='/' element={<AllBlogs/>}/>
    <Route path='/myBlogs' element={<MyBlogs/>}/>
    <Route path='/new' element={<NewBlog/>}/>
    <Route path='/edit/:id' element={<EditBlog/>}/>
    <Route path='/blog/:slug' element={<ReadBlog/>}/>
    <Route path='*' element={<h1 className='text-center'>404 Not</h1>}/>

    
  </Routes>

  </BrowerRouter>
)
