# 🥣 Cucharita — Cocina, descubre y disfruta

<p align="center">
  <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80" alt="Cucharita Logo" width="120" style="border-radius: 28px;" />
</p>

<p align="center">
  <b>App móvil y web de recetas saludables, gastronomía guatemalteca, presupuestos en Quetzales y modo seguro.</b>
</p>

<p align="center">
  <a href="https://github.com/AndrehhX/cucharita/releases/latest/download/cucharita.apk">
    <img src="https://img.shields.io/badge/Descargar%20APK-Android%20v1.0.0-EF705D?style=for-the-badge&logo=android&logoColor=white" alt="Descargar APK para Android" />
  </a>
  &nbsp;
  <a href="https://github.com/AndrehhX/cucharita/releases">
    <img src="https://img.shields.io/badge/Ver%20Releases-GitHub-292B35?style=for-the-badge&logo=github&logoColor=white" alt="Ver Releases" />
  </a>
</p>

---

## 📲 Descargar e Instalar en Android (APK)

Puedes descargar e instalar **Cucharita** directamente en tu celular Android sin pasar por tiendas:

1. **[Descargar Cucharita APK (v1.0.0)](https://github.com/AndrehhX/cucharita/releases/latest/download/cucharita.apk)** desde tu celular.
2. Al descargar, Android te solicitará permiso para **"Instalar aplicaciones de fuentes desconocidas"** en tu navegador (Chrome). Actívalo.
3. Abre el archivo descargado y presiona **Instalar**.
4. ¡Abre la app y disfruta cocinando!

> 🔄 **Actualizaciones automáticas:** La aplicación cuenta con un detector inteligente que se conecta a GitHub Releases. Cuando subas una nueva versión al repositorio, la app le avisará a tu hermana con una ventana emergente para descargar la actualización con un solo clic.

---

## ✨ Características Principales

* **🥣 Catálogo Amplio y Auténtico (48 Recetas Curadas):**
  - **17 Recetas Tradicionales Guatemaltecas:** Pepián de pollo, Kak'ik de pavo de Cobán, Jocón verde, Hilachas, Caldo de res con verduras, Chuchitos de pollo, Enchiladas, Rellenitos de plátano, Plátanos en mole, Dobladas de papa, Torrejas en miel de panela, Pan de banano chapín, Atol de elote, Fresco de rosa de Jamaica y Horchata artesanal.
  - **Platos Familiares y Latinoamericanos:** Tacos de pollo, Chilaquiles, Enmoladas, Arepas con queso, Empanadas al horno, Sopa de tortilla azteca, Ceviche refrescante de palmito.
  - **Pastas y Desayunos Favoritos:** Pasta Alfredo, Waffles crujientes, Mac & Cheese casero, Panqueques, Omelette esponjoso con espinacas, Tostadas de aguacate con huevo, Pizza casera, Nuggets de pollo horneados.
* **🌐 Recetas en Tiempo Real (TheMealDB API):** Conexión en vivo con APIs gastronómicas abiertas para explorar cientos de recetas internacionales adicionales en tiempo real con conexión a internet.
* **🇬🇹 Presupuestos Reales en Quetzales (GTQ):** Desglose detallado por ingrediente calculando el costo proporcional de lo consumido frente al paquete comercial completo en mercados y abarrotes de Guatemala.
* **⏱️ Cronómetros Incrustados:** Temporizadores en cada paso de preparación que se pueden iniciar y pausar directamente en la receta o en el modo cocina a pantalla completa.
* **🔊 Audio Recetas (Lectura por Voz):** Narración en español mediante *Speech Synthesis* para que los niños puedan cocinar escuchando cada indicación sin tocar la pantalla con las manos enharinadas.
* **🔍 Filtro de Pocos o Muchos Ingredientes:** Encuentra recetas rápidas con **≤ 5 ingredientes** o platos completos familiares con **> 5 ingredientes**.
* **🍲 Búsqueda por Despensa (`/ingredientes`):** Marca lo que tienes en casa (huevos, tomate, cebolla, etc.) y descubre qué puedes preparar de inmediato.
* **📁 Guardar y Carpetas:** Guarda tus recetas favoritas y organízalas en carpetas personalizadas.
* **🛡️ Espacio Seguro y Privado:** Sin publicidad, sin rastreo y sin registro obligatorio; diseñado pensando en la seguridad de menores de edad.

---

## 🛠️ Tecnologías

- **Frontend:** React 19, TypeScript strict, Vite 8, Tailwind CSS 3
- **Animaciones:** Motion (`motion/react`) fluidas y respetuosas con `prefers-reduced-motion`
- **Móvil:** Capacitor 8 (`@capacitor/core`, `@capacitor/android`, `@capacitor/splash-screen`, `@capacitor/app`)
- **Estado y Persistencia:** Zustand con almacenamiento local persistente
- **Íconos:** Lucide React
- **Pruebas:** Vitest (36 pruebas unitarias verificadas)

---

## 💻 Desarrollo Local

Para correr el proyecto en tu computadora:

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar pruebas unitarias
npm test

# Compilar para producción
npm run build
```

---

## 🤖 Compilación de APK con Capacitor (Android)

El proyecto ya cuenta con la plataforma Android configurada:

```bash
# Compilar web y sincronizar con Android
npm run build
npx cap sync android

# Abrir en Android Studio (si está instalado)
npx cap open android
```

Además, el repositorio incluye un flujo automatizado de **GitHub Actions** en `.github/workflows/build-apk.yml` que compila el APK automáticamente en la nube en cada versión y lo publica listo para descargar.
