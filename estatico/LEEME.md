# 🦌 Navidalia — Versión estática (HTML)

Versión **100% estática** de la tienda Navidalia. No necesita servidor ni base
de datos: son solo archivos HTML/CSS/JS que se abren en cualquier navegador y
se pueden subir a cualquier hosting (incluso uno que solo soporte HTML).

## 📂 Archivos

| Archivo | Qué es |
|---------|--------|
| `index.html` | La página (estructura: header, footer, chat, nieve) |
| `estilos.css` | Todos los estilos (tema navideño) |
| `app.js` | Lógica: navegación, catálogo, carrito, búsqueda |
| `datos.js` | Los 53 productos y las categorías (datos incrustados) |

## ▶️ Cómo usarla

- **Verla en tu computadora**: abre `index.html` con doble clic.
- **Publicarla**: sube los 4 archivos a tu hosting (misma carpeta). Funciona en
  hosting estático, GitHub Pages, Netlify, un servidor web común, etc.

## ✅ Qué funciona (sin servidor)

- Página de inicio con hero, categorías y productos destacados
- Navegación por categorías
- Página de detalle de cada producto (con reseñas de ejemplo)
- Búsqueda de productos
- Carrito de compras (guardado en el navegador, calcula subtotal, envío y total)
- Página de ofertas, efecto de nieve, barra promocional, botón de soporte

## ❌ Qué NO incluye (requiere servidor/base de datos)

- Pedidos reales / pago (el botón "Proceder al pago" solo muestra un aviso)
- Registro e inicio de sesión
- Panel de administración
- Reseñas reales guardadas (se muestran reseñas de ejemplo)
- Subida de imágenes

> Las imágenes de producto se cargan desde internet (Lorem Picsum). Si publicas
> el sitio sin conexión, las imágenes no se verán; para 100% offline habría que
> descargar las imágenes y referenciarlas localmente.

Esta versión es ideal como **escaparate/demostración**. Para una tienda que
venda de verdad, usa la versión completa (Next.js) desplegada en Vercel.
