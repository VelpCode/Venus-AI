import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './page';

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/" className='flex'>
        <h1 className='t text-2xl font-extrabold'>V</h1>
        <h1 className='t text-sm font-light'>enus</h1>
      </Link>
      <Link to="/create-post" className="font-inter font-medium bg-[#333333] text-white px-4 py-2 rounded-md">Post</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
