import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./FooterAdmin.module.css";
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
            <Link to="/destinations-manage" className={styles.footer_link}>
              Editar rutas
            </Link>
          </li>
          <li>
            <Link to="/community" className={styles.footer_link}>
              Comunidad
            </Link>
          </li>
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
