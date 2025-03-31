import React, { useState, useEffect } from "react";
import styles from "./DestinationManage.module.css";
import DestinationEdit from "../../../components/DestinationEdit/DestinationEdit";
import { useParams } from "react-router-dom";
import appFirebase from "../../../../credenciales";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io"; // Icono para eliminar filtros

const db = getFirestore(appFirebase);

export default function DestinationSearch() {
  const params = useParams();
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filters, setFilters] = useState([]); // Lista de filtros desde Firebase
  const [showForm, setShowForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    getDestinations();
    getTags(); // Cargar filtros desde Firebase
  }, [params]);

  async function getDestinations() {
    const querySnapshot = await getDocs(collection(db, "destinations"));
    const destinationsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setDestinations(destinationsList);
  }

  async function getTags() {
    const querySnapshot = await getDocs(collection(db, "tags"));
    const tagsList = querySnapshot.docs.map((doc) => ({
      id: doc.id, // ID del documento en Firebase
      ...doc.data(),
    }));
    setFilters(tagsList);
  }

  useEffect(() => {
    const filtered = destinations.filter((dest) =>
      dest.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDestinations(filtered);
  }, [searchTerm, destinations]);

  const handleRemoveFilter = async (filterId) => {
    try {
      await deleteDoc(doc(db, "tags", filterId));
      setFilters(filters.filter((filter) => filter.id !== filterId)); // Actualizar UI
    } catch (error) {
      console.error("Error eliminando el filtro:", error);
    }
  };

  const handleCreateCategory = () => {
    setShowForm(!showForm);
    setStatusMessage("");
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim() || !categoryDescription.trim()) {
      setStatusMessage("Debes completar ambos campos");
      return;
    }
    try {
      setStatusMessage("Creando nueva categoría...");
      const tagsCollection = collection(db, "tags");
      const querySnapshot = await getDocs(tagsCollection);
      const newId = querySnapshot.size + 1;
      await setDoc(doc(db, "tags", newId.toString()), {
        nombre: categoryName,
        descrip: categoryDescription,
      });
      setStatusMessage("Categoría agregada con éxito");

      // Actualizar la lista de filtros sin recargar
      setFilters([...filters, { id: newId.toString(), nombre: categoryName, descrip: categoryDescription }]);

      setTimeout(() => {
        setCategoryName("");
        setCategoryDescription("");
        setShowForm(false);
        setStatusMessage("");
      }, 2000);
    } catch (error) {
      setStatusMessage("Error: Ha ocurrido un error inesperado");
      console.error("Error al agregar la categoría:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          Manejo de <span className={styles.finalTitle}>Destinos</span>
        </h1>
        <hr className={styles.separator} />
      </div>

      {/* Caja de Búsqueda */}
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
      </div>

      <div className={styles.filterContainer}>
        <button
          className={styles.filterButton}
          onClick={() => setShowFilterMenu(!showFilterMenu)}
        >
          Eliminar Filtros ▼
        </button>

        {showFilterMenu && (
          <div className={styles.filterDropdown}>
            {filters.length > 0 ? (
              filters.map((filter) => (
                <div key={filter.id} className={styles.filterItem}>
                  <span>{filter.nombre}</span>
                  <IoMdClose
                    className={styles.removeFilterIcon}
                    onClick={() => handleRemoveFilter(filter.id)}
                  />
                </div>
              ))
            ) : (
              <p className={styles.noFilters}>No hay filtros disponibles</p>
            )}
          </div>
        )}
      </div>

      <div className={styles.createContainer}>
        <button className={styles.createTag} onClick={handleCreateCategory}>
          Crear nueva categoría
        </button>
      </div>

      {/* Formulario para agregar categoría */}
      <div className={`${styles.formContainer} ${showForm ? styles.show : ""}`}>
        <input
          type="text"
          placeholder="Nombre de la categoría"
          className={styles.inputName}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          maxLength={30}
        />
        <textarea
          type="text"
          placeholder="Descripción"
          className={styles.textareaField}
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
          maxLength={250}
        />

        <button className={styles.addButton} onClick={handleAddCategory}>
          Agregar
        </button>
        <p className={styles.statusMessage}>{statusMessage}</p>
      </div>

      {/* Contenedor de destinos */}
      <div className={styles.destinationContainer}>
        <DestinationEdit
          titulo={"Nueva excursión"}
          direccion={"/create-new-destination"}
          new={true}
        />
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((dest, index) => (
            <DestinationEdit
              key={index}
              id={dest.id}
              imagen={dest.images.bannerUrl}
              titulo={dest.destination}
              direccion={"/edit-destination/"+dest.slug}
              new={false}
            />
          ))
        ) : (
          <h2 className={styles.noResults}>
            No se han encontrado destinos con "{searchTerm}"
          </h2>
        )}
      </div>
    </div>
  );
}
