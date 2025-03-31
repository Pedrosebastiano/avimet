import React, { useState } from 'react';
import styles from './Calendario.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const diasSemana = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

const obtenerDiasDelMes = (anio, mes) => {
  return new Date(anio, mes + 1, 0).getDate();
};

const obtenerDiaDeInicio = (anio, mes) => {
  let dia = new Date(anio, mes, 1).getDay();
  return dia === 0 ? 6 : dia - 1;
};

export default function Calendario({ onSelectDate, markedDates }) {
  const fechaActual = new Date();
  const [mesActual, setMesActual] = useState(fechaActual.getMonth());
  const [anioActual, setAnioActual] = useState(fechaActual.getFullYear());
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

  const cambiarMes = (direccion) => {
    let nuevoMes = mesActual + direccion;
    let nuevoAno = anioActual;

    if (nuevoMes < 0) {
      nuevoMes = 11;
      nuevoAno -= 1;
    } else if (nuevoMes > 11) {
      nuevoMes = 0;
      nuevoAno += 1;
    }

    setMesActual(nuevoMes);
    setAnioActual(nuevoAno);
    setDiaSeleccionado(null); 
  };

  const seleccionarDia = (dia) => {
    const mesNombre = meses[mesActual];
    const diaEspecial = `${mesNombre} ${dia}`;

    if (!markedDates.includes(diaEspecial)) {
      return; 
    }

    if (diaSeleccionado === diaEspecial) {
      setDiaSeleccionado(null); 
      onSelectDate(null);
    } else {
      setDiaSeleccionado(diaEspecial);
      onSelectDate(diaEspecial);
    }
  };

  const esDiaEspecial = (mes, dia) => {
    const diaString = String(dia).padStart(2, '0'); 
    return markedDates.includes(`${mes} ${diaString}`);
  };

  const totalDias = obtenerDiasDelMes(anioActual, mesActual);
  const diaInicio = obtenerDiaDeInicio(anioActual, mesActual);
  const dias = Array(diaInicio).fill(null);

  for (let i = 1; i <= totalDias; i++) {
    dias.push(i);
  }

  return (
    <div className={styles.contenedorCalendario}>
      <div className={styles.encabezado}>
        <button className={styles.flecha} onClick={() => cambiarMes(-1)}>
          <FaChevronLeft />
        </button>
        <div className={styles.mesAnio}>
          {meses[mesActual]} {anioActual}
        </div>
        <button className={styles.flecha} onClick={() => cambiarMes(1)}>
          <FaChevronRight />
        </button>
      </div>

      <div className={styles.semana}>
        {diasSemana.map((dia) => (
          <div key={dia} className={styles.diaSemana}>
            {dia}
          </div>
        ))}
      </div>

      <div className={styles.dias}>
        {dias.map((dia, index) => {
          const mesNombre = meses[mesActual];
          const esEspecial = esDiaEspecial(mesNombre, dia);
          const esSeleccionado = diaSeleccionado === `${mesNombre} ${dia}`;

          return (
            <div
              key={index}
              className={`${styles.dia} ${esEspecial ? styles.especial : ''} ${
                esSeleccionado ? styles.seleccionado : ''
              }`}
              onClick={() => dia && seleccionarDia(dia)}
            >
              {dia}
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        {diaSeleccionado && (
          <div className={styles.seleccionTexto}>
            Día seleccionado: {diaSeleccionado}
          </div>
        )}
      </div>
    </div>
  );
}