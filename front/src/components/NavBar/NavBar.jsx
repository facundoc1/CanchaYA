import React from 'react'
import style from './Navbar.module.css';
import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ handleSearchChange }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home"

  return (
    <div className={style.homeContainer}>
      <div className={style.navbar}>
        <div className={style.logo}>
          <Link to={"/home"} style={{ font: '28px Poppins, sans-serif' }}>Canchas Ya</Link>
        </div>
        <div className={style.search}>
          <input
            type="search"
            placeholder="Buscar cancha por nombre" 
            onChange={handleSearchChange}
          />
        </div>
        <div className={style.btnContainer}>
          <Link to={'/form'}><button className={style.btn}>Agregar Cancha</button></Link>
        </div>
      </div>
      <div className={style.text}>
        <div className={style.texto}>
          <h1 className={style.verde}>NO TE QUEDES SIN JUGAR</h1>
          <h1 className={style.blanco}>ENCUENTRA LA CANCHA MAS CERCANA A TI</h1>
        </div>
      </div>
    </div>
  )
}

export default NavBar