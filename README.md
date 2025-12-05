# 🪨📄✂️ Rock Paper Scissors - Next.js

Una versión moderna y mejorada del clásico juego de Piedra, Papel o Tijera construida con Next.js 14, TypeScript, Tailwind CSS y Framer Motion.


Esta versión, traducida al español, está inspirada en la versión clásica del juego creada por supersimpledev, disponible en:
https://supersimple.dev/projects/rock-paper-scissors/

De su autor he aprendido los cimientos de JavaScript, y sus cursos han sido de gran ayuda para iniciarme en vanilla JS y poder evolucionar hasta crear esta versión avanzada del proyecto.

Si simplemente quieres probarla entra en este enlace: www.example.stackbp.es :)


## ✨ Características

### 🎮 Funcionalidades del Juego
- **Juego clásico**: Piedra, Papel o Tijera con lógica mejorada
- **Auto Play**: Modo automático para ver el juego en acción
- **Atajos de teclado**: Presiona `R`, `P` o `S` para jugar rápidamente
- **Persistencia**: Tu puntuación se guarda automáticamente en el navegador

### 📊 Estadísticas Avanzadas
- **Puntuación detallada**: Victorias, derrotas y empates
- **Porcentaje de victorias**: Calculado automáticamente
- **Rachas**: Seguimiento de rachas de victorias y derrotas
- **Historial completo**: Todas las partidas se guardan para análisis

### 🎨 Mejoras de UI/UX
- **Diseño moderno**: Interfaz limpia y atractiva con Tailwind CSS
- **Animaciones fluidas**: Transiciones suaves con Framer Motion
- **Responsive**: Optimizado para móviles, tablets y escritorio
- **Feedback visual**: Colores y animaciones que indican el resultado
- **Accesibilidad**: Soporte para lectores de pantalla y navegación por teclado

### 🚀 Tecnologías
- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático para mayor seguridad
- **Tailwind CSS**: Estilos modernos y responsivos
- **Framer Motion**: Animaciones fluidas y profesionales
- **React Hooks**: Lógica reutilizable y mantenible

## 🛠️ Instalación

1. **Instala las dependencias:**
```bash
npm install
```

2. **Ejecuta el servidor de desarrollo:**
```bash
npm run dev
```

3. **Abre tu navegador:**
Navega a [http://localhost:3000](http://localhost:3000)

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 🎯 Cómo Jugar

1. **Haz clic** en uno de los botones (Piedra, Papel o Tijera)
2. **O presiona** las teclas `R`, `P` o `S` en tu teclado
3. **Observa** el resultado y tu puntuación actualizada
4. **Activa Auto Play** para ver el juego automáticamente
5. **Reinicia** tu puntuación cuando quieras empezar de nuevo

## 📁 Estructura del Proyecto

```
├── app/              # App Router de Next.js
│   ├── layout.tsx    # Layout principal
│   ├── page.tsx      # Página principal
│   └── globals.css   # Estilos globales
├── components/        # Componentes React
│   ├── Game.tsx      # Componente principal del juego
│   ├── MoveButton.tsx
│   ├── ResultDisplay.tsx
│   ├── ScoreDisplay.tsx
│   └── GameControls.tsx
├── hooks/            # Custom hooks
│   └── useGame.ts    # Lógica del juego
├── types/            # Definiciones TypeScript
│   └── game.ts
└── public/           # Archivos estáticos
    └── images/       # Imágenes del juego
```

## 🔄 Migración desde la versión anterior

Este proyecto es una migración completa desde una aplicación HTML/CSS/JS vanilla a Next.js con las siguientes mejoras:

- ✅ Arquitectura moderna con componentes React
- ✅ TypeScript para type safety
- ✅ Mejor organización del código
- ✅ Estadísticas avanzadas
- ✅ Animaciones mejoradas
- ✅ Mejor experiencia de usuario
- ✅ Código más mantenible y escalable

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

---

¡Disfruta jugando! 🎮

