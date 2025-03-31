/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styles from "./DestinationSearch.module.css";
import TarjetaDestinos from "../../components/TarjetaDestinos/TarjetaDestinos";
import { useParams } from "react-router-dom";
import appFirebase from "../../../credenciales";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { IoIosSearch } from "react-icons/io";
import FiltroTags from "../../components/FiltroTags/FiltroTags";

const db = getFirestore(appFirebase);

export default function DestinationSearch() {
  const params = useParams();
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [noResults, setNoResults] = useState(false); // Estado para el mensaje de "sin resultados"

  async function getDestinations(tags) {
    if (tags.length === 0) {
      const querySnapshot = await getDocs(collection(db, "destinations"));
      const destinationsList = querySnapshot.docs.map((doc) => doc.data());
      setDestinations(destinationsList);
      setNoResults(destinationsList.length === 0); // Verificar si hay resultados
    } else {
      const destinationCollection = collection(db, "filtrospordestino");
      const queryCollection = query(destinationCollection, where("tag", "in", tags));
      const destinationSnapshot = await getDocs(queryCollection);

      const dests = destinationSnapshot.docs.map((doc) => doc.data().dest);
      if (dests.length === 0) {
        setDestinations([]);
        setNoResults(true); // Si no hay resultados, activamos el mensaje
        return;
      }

      const allDest = collection(db, "destinations");
      const queryDest = query(allDest, where("slug", "in", dests));
      const destSnapshot = await getDocs(queryDest);
      const destinationsList = destSnapshot.docs.map((doc) => doc.data());

      setDestinations(destinationsList);
      setNoResults(destinationsList.length === 0); // Si aún no hay resultados, mostrar mensaje
    }
  }

  useEffect(() => {
    getDestinations(selectedTags);
  }, [selectedTags]);

  useEffect(() => {
    const filtered = destinations.filter((dest) =>
      dest.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDestinations(filtered);
  }, [searchTerm, destinations]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          Descubre el <span className={styles.finalTitle}>Ávila</span>
        </h1>
        <hr className={styles.separator} />
        <h3 className={styles.subtitle}>
          Las maravillas del Orgullo Caraqueño
        </h3>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className={styles.searchBox}>
        <div className={styles.searchContainer}>
          <IoIosSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar un destino..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <FiltroTags
          options={[]} // Puedes cambiar esto si necesitas opciones precargadas
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </div>

      {/* Destinos */}
      <div className={styles.destinationContainer}>
        {noResults ? (
          <h2 className={styles.noResults}>No hay destinos disponibles para los filtros seleccionados.</h2>
        ) : filteredDestinations.length > 0 ? (
          filteredDestinations.map((dest, index) => (
            <TarjetaDestinos
              key={index}
              imagen={dest.images.bannerUrl}
              titulo={dest.destination}
              descripcion={dest.description}
              colorClase={index % 2 === 0 ? "darkgreen" : "lightgreen"}
              direccion={dest.slug}
            />
          ))
        ) : (
          <h2 className={styles.noResults}>No se han encontrado destinos con "{searchTerm}"</h2>
        )}
      </div>
    </div>
  );
}
