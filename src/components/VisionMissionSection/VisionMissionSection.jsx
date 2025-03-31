import React from "react";
import styles from "./VisionMissionSection.module.css";
import InfoCard from "./InfoCard";

const VisionMissionSection = () => {
  const eyeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.06153 12.3481C1.97819 12.1236 1.97819 11.8766 2.06153 11.6521C2.87323 9.68397 4.25104 8.00116 6.0203 6.81701C7.78955 5.63287 9.87057 5.00073 11.9995 5.00073C14.1285 5.00073 16.2095 5.63287 17.9788 6.81701C19.748 8.00116 21.1258 9.68397 21.9375 11.6521C22.0209 11.8766 22.0209 12.1236 21.9375 12.3481C21.1258 14.3163 19.748 15.9991 17.9788 17.1832C16.2095 18.3674 14.1285 18.9995 11.9995 18.9995C9.87057 18.9995 7.78955 18.3674 6.0203 17.1832C4.25104 15.9991 2.87323 14.3163 2.06153 12.3481Z" stroke="#A3E96C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#A3E96C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

  const goalIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 13V2L20 6L12 10" stroke="#A3E96C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.5607 10.2219C21.0928 11.862 21.1426 13.6205 20.7041 15.2881C20.2656 16.9558 19.3573 18.4623 18.0872 19.6286C16.8172 20.7948 15.2388 21.5717 13.5399 21.8667C11.841 22.1617 10.0932 21.9625 8.50424 21.2928C6.91532 20.623 5.55224 19.5109 4.57717 18.0888C3.6021 16.6666 3.05609 14.9943 3.00409 13.2708C2.9521 11.5473 3.39631 9.8451 4.28388 8.36677C5.17145 6.88844 6.46502 5.6962 8.01068 4.93188" stroke="#A3E96C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.00141 9.99707C7.50031 10.6641 7.17409 11.4459 7.05245 12.2713C6.93082 13.0966 7.01764 13.9393 7.30501 14.7225C7.59238 15.5057 8.07116 16.2046 8.69774 16.7554C9.32431 17.3063 10.0788 17.6916 10.8923 17.8762C11.7059 18.0609 12.5528 18.039 13.3558 17.8127C14.1587 17.5863 14.8923 17.1626 15.4896 16.5802C16.0869 15.9977 16.529 15.2751 16.7756 14.4781C17.0222 13.6811 17.0655 12.8351 16.9014 12.0171" stroke="#A3E96C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

  return (
    <>
      <section className={styles.container}>
        <InfoCard
          title="Visión"
          icon={eyeIcon}
          content="El objetivo de desarrollar un sitio web accesible e interactivo para la gestión de las excursiones en el Parque Nacional El Ávila es crear un espacio funcional, el cual incentive la intervención y participación activa, de la comunidad estudiantil para llevar a cabo actividades al aire libre. Este sitio web se convertirá en el punto de encuentro favorito de los estudiantes, facilitando la interacción con expertos en el campo, difundiendo experiencias de los usuarios y facilitando la organización de excursiones."
        />
        <InfoCard
          title="Misión"
          icon={goalIcon}
          content="Se planea desarrollar una plataforma web que sea intuitiva y funcional, la cual gestione y promueva excursiones estudiantiles realizadas en el Parque Nacional El Ávila. De esta manera, se ha de fomentar la vida al aire libre y el contacto de los estudiantes con la naturaleza. Mediante esta plataforma, los estudiantes (principalmente de la Universidad Metropolitana) podrán acceder a información. Al poseer la mayor cantidad de detalles acerca de guías especializados, rutas y servicios adicionales, propiciará el crecimiento de una sociedad participativa e interesada en las exploraciones del entorno natural."
        />
      </section>
    </>
  );
};

export default VisionMissionSection;