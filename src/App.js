import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from "./components/Home";
import Protected from "./helper/privateRoute";
import Profile from './components/Profile';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route element={<Protected />}>
      <Route path="/dashboard" element={<Home/>}/>
      <Route path='/my-profile' element={<Profile/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
