import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from "react";


import styles from './ProductCarousel.module.css';

function ProductCarousel( {images = [], className = "" } ) {
    var productos = []
    if (className == 'mediumCarousel') {
        productos = [
            { id: 1, name: 'xx', image: images[0]?images[0]:""},
            { id: 2, name: 'xx', image: images[1]?images[1]:"" },
            { id: 3, name: 'xx', image: images[2]?images[2]:"" },
            { id: 4, name: 'xx', image: images[3]?images[3]:"" },
        ];  
    } else {
        productos = [
        { id: 1, name: 'xx', image: images[0]?images[0]:""},
        { id: 2, name: 'xx', image: images[1]?images[1]:"" },
        { id: 3, name: 'xx', image: images[2]?images[2]:"" },
        { id: 4, name: 'xx', image: images[3]?images[3]:"" },
        { id: 5, name: 'xx', image: images[4]?images[4]:"" },
        { id: 6, name: 'xx', image: images[5]?images[5]:"" },
        { id: 7, name: 'xx', image: images[6]?images[6]:"" },
        { id: 8, name: 'xx', image: images[7]?images[7]:"" },
    ];
    }


    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        lazyLoad: true,
        slidesToShow: className == "mediumCarousel" ? 4 : 8,
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 2500,
        sEase: "linear", 
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: className == "mediumCarousel" ? 2 : 5,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: className == "mediumCarousel" ? 1 : 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: className == "mediumCarousel" ? 1 : 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className={styles.contenedorCarrusel}>
            <div className={styles.tarjetaCarrusel}>
                <Slider {...settings}>
                    {productos.map((d, index) => (
                        <div className={styles.contenedor} key={d.id}>
                            <div className={styles.contenedorImagen}>
                                <img
                                    className={`${styles.imagen} ${styles?.[className]} ${index % 2 === 0 ? styles.imagenPar : styles.imagenImpar}`}
                                    src={d.image}
                                />
                            </div>
                            <div className={styles.descripcion}>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ProductCarousel;
