import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { AuthProvider } from "./Context/authContext";
import HomeComponents from "./Components/HomeComponents/HomeComponents";
import { ProtectedRouter } from "./Components/ProtectedRouter";
import { PublicationProvider } from "./Context/contextPublication";
import { RateProvider } from "./Context/contextRateUser";
import CardPublication from "./Components/CardPublication/CardPublication";
import ProfileUser from "./Components/ProfileUser/ProfileUser";



function App() {


  return (
    <div className="container-app">
      
      <AuthProvider>
      <PublicationProvider>
        <RateProvider>
        <Routes>
        

       


          {/*Section Components*/}

          <Route
            path="/HomeComponents"
            element={
              <ProtectedRouter>
                
                <HomeComponents />
              </ProtectedRouter>
            }
          ></Route>
             <Route
                path="/ProfileUser/:userId"
                element={
                  <ProtectedRouter>
                    <ProfileUser />
                  </ProtectedRouter>
                }
              ></Route>


              
          {/*Section Pages*/}

          <Route path="/" element={<Home />} />
         
        
         
        </Routes>
        </RateProvider>
        </PublicationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
