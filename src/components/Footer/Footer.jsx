import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Footer.module.css";
import ig from "../../assets/ig.png";
import email from "../../assets/email.png";
import tel from "../../assets/tel.png";

export default function Footer() {

  return (
    <>
      <Outlet />
      <div className={styles.footer}>
        <ul className={styles.footer_list}>
          <li>
            <Link to="/" className={styles.footer_link}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/destinations" className={styles.footer_link}>
              Destinos
            </Link>
          </li>
          <li>
              <Link to="/Forum" className={styles.footer_link}>
                Foro
              </Link>
              
          </li>
          <li>
              <Link to="/contact" className={styles.footer_link}>
                Contáctanos
              </Link>
          </li>

          {/* Redes sociales */}
          <li className={styles.social_container}>
            <a
              className={styles.links}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className={styles.social_icon} src={ig} alt="Instagram" />
              <span>@avimet</span>
            </a>
            <a className={styles.links} href="mailto:avimet@gmail.com">
              <img className={styles.social_icon} src={email} alt="Correo" />
              <span>avimet@gmail.com</span>
            </a>
            <a className={styles.links} href="tel:+584125936487">
              <img className={styles.social_icon} src={tel} alt="Teléfono" />
              <span>+58 412 5936487</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
