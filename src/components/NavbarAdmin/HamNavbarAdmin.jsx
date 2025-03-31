import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import appFirebase from "../../../credenciales";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import styles from "./NavbarAdmin.module.css";
import global from "../../global.module.css";
import avimetLogo from "../../assets/avimet-logo.png";
import { IoIosSearch } from "react-icons/io";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export const MenuHamburguesa = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    <div className={styles.menuContainer}>
      <div className={styles.mobileHeader}>
        <Link to="/">
          <img src={avimetLogo} alt="Avimet" className={styles.logoMobile} />
        </Link>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          ☰
        </div>
      </div>

      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
        <div className={styles.menuHeader}>
          <span className={styles.closeIcon} onClick={toggleMenu}>
            ✖
          </span>
        </div>

        <ul className={styles.menuList}>
          <li>
            <Link to="/" className={styles.navbar_link} onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/destinations-manage"
              className={styles.navbar_link}
              onClick={toggleMenu}
            >
              Editar Destinos
            </Link>
          </li>
          <li>
            <Link
              to="/community"
              className={styles.navbar_link}
              onClick={toggleMenu}
            >
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
      </div>
    </div>
  );
};
