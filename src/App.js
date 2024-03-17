import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './components/Home'
import Update from './components/Update'
import Read from './components/Read'
import Map from "./components/Map";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/update/:id" element={<Update />}/>
      <Route path="/read/:id" element={<Read />}/>
      <Route path="/Map/:id" element={<Map />}/>

    </Routes>
   </BrowserRouter>
  );
}

export default App;
