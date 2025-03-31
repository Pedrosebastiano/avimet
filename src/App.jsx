import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// Importando los componentes
import Login from "./pages/auth/Login";
import Home from "./pages/Home/Home";
import SignUp from "./pages/auth/SignUp";
import Profile from "./pages/Profile/Profile";
import NotFound from './pages/NotFound/Notfound';
import TipsNews from './pages/TipsNews/TipsNews';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import PasswordRecovery from './pages/auth/PasswordRecovery';
import Destination from "./pages/Destination";
import BookingPage from './components/booking/BookingPage';
import Factura from "./components/Factura/Factura";
import Community from './pages/Community/Community';
import DestinationSearch from "./pages/DestinationSearch/DestinationSearch";
import DestinationManage from "./pages/admin/DestinationManage/DestinationManage";
import DestinationCreate from "./pages/admin/destinationCreate/DestinationCreate";
import DestinationEdit from "./pages/admin/destinationEdit/DestinationEdit";
import NavbarAdmin from "./components/NavbarAdmin/NavbarAdmin";
import FooterAdmin from "./components/FooterAdmin/FooterAdmin";
import Contact from "./pages/Contact/Contact";
import Forum from "./pages/Forum/Forum"


// Importando Firebase
import appFirebase from "../credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

function App() {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserType(userSnap.data().userType);
          } else {
            setUserType("user"); // Si no existe, se asume usuario normal
          }
        } else {
          setUserType(null);
        }
        setLoading(false);
      });
    };

    checkUserStatus();
  }, []);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route element={userType === "admin" ? <FooterAdmin /> : <Footer />}>
          <Route element={userType === "admin" ? <NavbarAdmin /> : <Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/destinations/:slug" element={<Destination />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/factura" element={<Factura />} />
            <Route path="/tips-news" element={<TipsNews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/destinations" element={<DestinationSearch />} />
            <Route path="/create-new-destination" element={<DestinationCreate/>} />
            <Route path="/edit-destination/:slug" element={<DestinationEdit/>}/>
            <Route path="/Forum" element={<Forum />}/>
            <Route path="*" element={<NotFound />} />
            <Route path="/community" element={userType === "admin" ? <Community /> : <Navigate to="/" />} />
            <Route path="/destinations-manage" element={userType === "admin" ? <DestinationManage /> : <Navigate to="/" />} />
          </Route>
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
      </Routes>
    </Router>
  );
}

export default App;

