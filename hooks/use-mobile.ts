import { useState, useEffect } from 'react';

/**
 * Define el punto de interrupción para dispositivos móviles.
 * 768px es el punto de interrupción `md` (medium) estándar de Tailwind CSS.
 * Por debajo de esto, consideraremos que es "móvil".
 */
const MOBILE_BREAKPOINT: number = 768;

/**
 * @name useIsMobile
 * @description Un hook de React personalizado que detecta si el dispositivo
 * actual está por debajo del punto de interrupción de tamaño móvil (768px).
 * Se actualiza automáticamente cuando la ventana cambia de tamaño.
 *
 * @returns {boolean} `true` si el ancho de la ventana es menor que
 * MOBILE_BREAKPOINT, de lo contrario `false`.
 */
export const useIsMobile = (): boolean => {
  // Estado para almacenar si estamos en vista móvil o no.
  // Usamos una función para obtener el valor inicial para que
  // solo se ejecute en el cliente, donde `window` está disponible.
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // Comprobación inicial (solo se ejecutará en el cliente)
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return false; // Valor por defecto en el servidor (SSR)
  });

  useEffect(() => {
    // Asegurarse de que `window` esté definido (evita errores en SSR).
    if (typeof window === 'undefined') {
      return;
    }

    // Función que se ejecuta cada vez que la ventana cambia de tamaño.
    const handleResize = (): void => {
      // Actualiza el estado 'isMobile' basado en el ancho actual.
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // 1. Añade el event listener para 'resize'.
    window.addEventListener('resize', handleResize);

    // 2. Función de limpieza (cleanup).
    // Esto es crucial para evitar fugas de memoria.
    // Se ejecuta cuando el componente que usa el hook se "desmonta".
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // El array vacío `[]` asegura que este efecto solo se ejecute
          // una vez (al montar) y la limpieza una vez (al desmontar).

  return isMobile;
};