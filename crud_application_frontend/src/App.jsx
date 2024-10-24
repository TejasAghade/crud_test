import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListStudents from './components/listStudents';


function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<ListStudents />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
