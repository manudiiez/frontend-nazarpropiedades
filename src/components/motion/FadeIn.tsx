// components/motion/FadeIn.tsx
"use client"; // Framer Motion usa hooks de cliente

import { motion, Variants } from "framer-motion";
import React from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Para escalonar animaciones
}

// 1. Definimos las "variantes" de la animación
const fadeInVariants: Variants = {
  // Estado inicial (oculto y movido)
  hidden: {
    opacity: 0,
    y: 20, // Mover 20px hacia abajo
  },
  // Estado final (visible y en posición)
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6, // Duración de la animación
      ease: "easeOut",
    },
  },
};

const FadeIn: React.FC<FadeInProps> = ({ children, className, delay = 0 }) => {
  return (
    // 2. Usamos el componente 'motion.div'
    <motion.div
      className={className}
      // 3. SEO-Friendly: Estado inicial definido en 'variants'
      variants={fadeInVariants}
      initial="hidden" // Estado inicial
      // 4. ¡La magia! Se activa cuando entra en la pantalla
      whileInView="visible"
      // 5. viewport: 'once' hace que se anime solo 1 vez
      // 'amount: 0.2' significa que se activa cuando el 20% es visible
      viewport={{ once: true, amount: 0.2 }}
      // 6. Aplicamos el delay (si existe)
      transition={{ delay: delay }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
