import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import appFirebase from "../../../credenciales";
import { getFirestore } from "firebase/firestore";
import styles from "./FiltroTags.module.css"; // Importa el módulo CSS

const db = getFirestore(appFirebase);

const FiltroTags = ({ options, selectedTags, setSelectedTags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const fetchData = async () => {
    const itemsRef = collection(db, "tags");
  
    try {
      const querySnapshot = await getDocs(itemsRef);
      const names = querySnapshot.docs.map((doc) => doc.data().nombre);
      
      setFilteredOptions(names); // Mostramos todos los filtros, sin excluir los seleccionados
    } catch (error) {
      console.error("Error al obtener documentos: ", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [selectedTags]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    const updatedTags = selectedTags.includes(option)
      ? selectedTags.filter(tag => tag !== option) // Si está seleccionado, se quita
      : [...selectedTags, option]; // Si no está, se agrega
  
    setSelectedTags(updatedTags);
  };
  

  return (
    <div className={styles.FiltroTags}>
      <button onClick={toggleDropdown} className={styles.FiltroTagsButton}>
        Filtrar categoria
      </button>
      {isOpen && (
        <ul className={styles.FiltroTagsMenu}>
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={selectedTags.includes(option) ? styles.selected : ""}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FiltroTags;
