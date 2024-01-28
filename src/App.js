import './App.css';
import Admin from './components/Admin/Admin';
import { Routes, Route } from "react-router-dom"
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Form />} ></Route>
        <Route path='/admin' element={<Admin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
