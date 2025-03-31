import React, { useContext, useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import appFirebase from "../../../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import styles from "./Navbar.module.css";
import global from "../../global.module.css";
import avimetLogo from "../../assets/avimet-logo.png";
import profilePhoto from "../../assets/foto-predeterminada.png";
import { IoIosSearch } from "react-icons/io";

import { MenuHamburguesa } from "./HamNavbar";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export default function Navbar() {
  const navigation = useNavigate();
  const { logged, profile } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDestinations(data);
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDestinations([]);
    } else {
      const filtered = destinations.filter((dest) =>
        dest.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDestinations(filtered);
    }
  }, [searchTerm, destinations]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;

    const matchedDestination = destinations.find(
      (dest) => dest.destination.toLowerCase() === searchTerm.toLowerCase()
    );

    if (matchedDestination) {
      navigation(
        `/destinations/${matchedDestination.destination
          .replace(/\s+/g, "-")
          .toLowerCase()}`
      );
    } else {
      navigation(`/busqueda?q=${searchTerm.replace(/\s+/g, "-")}`);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navbar_list}>
          <li className={styles.logo}>
            <Link to="/">
              <img src={avimetLogo} alt="Avimet" />
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.navbar_link}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/destinations" className={styles.navbar_link}>
              Destinos
            </Link>
          </li>
          <li>
            <Link to="/Forum" className={styles.navbar_link}>
              Foro
            </Link>
          </li>
          <li>
            <Link to="/contact" className={styles.navbar_link}>
              Contáctanos
            </Link>
          </li>
          <li className={styles.search_container}>
            <div className={styles.search_box}>
              <IoIosSearch
                className={styles.search_icon}
                onClick={handleSearch}
              />
              <input
                type="text"
                placeholder="Buscar un destino..."
                className={styles.search_input}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredDestinations.length > 0 && (
                <ul className={styles.suggestions_list}>
                  {filteredDestinations.map((dest) => (
                    <li
                      key={dest.id}
                      className={styles.suggestion_item}
                      onClick={() => navigation(`/destinations/${dest.slug}`)}
                    >
                      {dest.destination}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <li>
            <div className={styles.auth_container}>
              {logged ? (
                <>
                  <Link to="/profile">
                    <img
                      className={styles.user_info}
                      src={
                        profile?.profilePicture
                          ? profile.profilePicture
                          : profilePhoto
                      }
                      alt={profile?.email || "User Profile"}
                    />
                  </Link>
                  <button className={global.btn3} onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <button
                  className={global.btn3}
                  onClick={() => navigation("/login")}
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </li>
        </ul>
        <MenuHamburguesa />
      </nav>
      <Outlet />
    </>
  );
}
