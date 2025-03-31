import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import styles from './CarruselConsejos.module.css';

// Importa las imágenes que vas a usar
import imagen1 from '../../assets/ImagenConsejo1.png';
import imagen2 from '../../assets/ImagenConsejo2.png';
import imagen3 from '../../assets/ImagenConsejo3.png';



const consejos = [
  {
    id: 1,
    titulo: "Planificación",
    descripcion: "Investiga la ruta que planeas tomar y asegúrate de que se ajuste a tu nivel de experiencia y condición física. Intenta comenzar temprano en la mañana para evitar el sol más fuerte y tener tiempo suficiente para disfrutar del camino y regresar con luz del día.",
    imagen: imagen1
  },
  {
    id: 2,
    titulo: "Respeta tu entorno",
    descripcion: "El Ávila es un parque nacional, así que respeta la naturaleza. No dejes basura y sigue los senderos designados para no dañar la flora y fauna locales. Lleva contigo una bolsa para recoger tus desechos y haz todo lo posible por mantener el área limpia y preservada.",
    imagen: imagen2
  },
  {
    id: 3,
    titulo: "Prepárate apropiadamente",
    descripcion: "Lleva ropa cómoda y adecuada para la caminata, zapatos deportivos con buen agarre, y una mochila con agua, snacks energéticos (como frutas y nueces), y protector solar. El clima puede variar, así que lleva una chaqueta ligera.",
    imagen: imagen3
  },
  {
    id: 4,
    titulo: "Organiza tu itinerario",
    descripcion: "Antes de salir, revisa el pronóstico del tiempo para evitar sorpresas. Planea el tiempo que dedicarás a la caminata, descansos y regreso. Comienza temprano, así disfrutarás del recorrido con tranquilidad y evitarás caminar de noche.",
    imagen: imagen1
  },
  {
    id: 5,
    titulo: "Cuida la fauna y flora",
    descripcion: "Recuerda que estás en un espacio protegido. Evita tocar o alimentar a los animales, y no recolectes plantas o flores. Mantente siempre en los caminos marcados para minimizar el impacto ambiental y ayuda a conservar el ecosistema del parque.",
    imagen: imagen2
  },
  {
    id: 6,
    titulo: "Equipo esencial",
    descripcion: "Además de agua y alimentos, lleva un pequeño botiquín de primeros auxilios, linterna con baterías extra y un silbato para emergencias. Usa ropa transpirable, gorra o sombrero, y protector solar para protegerte de los cambios climáticos.",
    imagen: imagen3
  }
];

function CarruselConsejos() {
  return (
    <div className={styles.carruselConsejos}>
      <Swiper
        modules={[Navigation, EffectCoverflow, Autoplay]}
        navigation
        effect={'coverflow'}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000, 
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            slidesToShow: 1,
          },
          481: {
            slidesPerView: 2,
            slidesToShow: 2,
          },
          801: {
            slidesPerView: 3,
            slidesToShow: 3,
          },
        }}
        className={styles.swiper}
      >
        {consejos.map((consejo) => (
          <SwiperSlide
            key={consejo.id}
            className={`${styles.swiperSlide} ${
              consejo.id % 2 === 0 ? styles.evenSlide : styles.oddSlide
            }`}
          >
            <div className={styles.tarjetaConsejo}>
              <img src={consejo.imagen} alt={consejo.titulo} className={styles.imagenConsejo} />
              <h3 className={styles.tituloConsejo}>{consejo.titulo}</h3>
              <p className={styles.descripcionConsejo}>{consejo.descripcion}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CarruselConsejos;