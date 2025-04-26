import {Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import HomePage from './components/HomePage'
import FoodItems from './components/FoodItems'

function App() {

  return (
    <>
    {/* <Navbar />   */}
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/foodItems/:id" element={<FoodItems />} />
    </Routes>
    </>
        // <Routes>
    //   <Navbar />
    //   <Route path="/dashboard" element={<Dashboard />} />
    //   <Route path="/home" element={<HomePage />} />
    // </Routes>
  )
}

export default App
