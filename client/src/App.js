// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import Signup from './component/signup';
import View from './component/view';
import Login from './component/login';
import Create from './component/create';
import Edit from './component/edit';
// import Navbar from './component/navbar';
import { Navigate } from "react-router-dom";
function App() {
  // const location = useLocation();



  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    return token ? children : <Navigate to="/login" />;
};

  return (
    <div>
        {/* {location.pathname !== '/signup' && 
        location.pathname !== '/login' && (
          <Navbar />
        )} */}
        <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/create" element={<PrivateRoute><Create/></PrivateRoute>}/>
          <Route path="/view" element={<PrivateRoute><View /></PrivateRoute>}/>
          <Route path="/view/:entryID" element={<PrivateRoute><Edit /></PrivateRoute>}/>
        </Routes>
      
    </div>
  );
}

export default App;
