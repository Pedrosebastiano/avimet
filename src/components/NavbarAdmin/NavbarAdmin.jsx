import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import appFirebase from "../../../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import styles from "./NavbarAdmin.module.css";
import global from "../../global.module.css";
import avimetLogo from "../../assets/avimet-logo.png";
import { IoIosSearch } from "react-icons/io";

import { MenuHamburguesa } from "./HamNavbarAdmin";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export default function Navbar() {
  const navigation = useNavigate();
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
            <Link to="/destinations-manage" className={styles.navbar_link}>
              Editar Rutas
            </Link>
          </li>
          <li>
            <Link to="/community" className={styles.navbar_link}>
              Comunidad
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
              <button className={global.btn3} onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          </li>
        </ul>
        <MenuHamburguesa />
      </nav>
      <Outlet />
    </>
  );
}
