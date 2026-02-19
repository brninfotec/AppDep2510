
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Leaves from './components/Leaves';
import TopNavigation from './components/TopNavigation';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
       <Route path='/tasks' element={<Tasks/>}></Route>
        <Route path='/leaves' element={<Leaves/>}></Route>
         <Route path='/editProfile' element={<EditProfile/>}></Route>
         <Route path='/topNavigation' element={<TopNavigation/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
