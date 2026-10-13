# 🦌 Navidalia

> **La magia de la Navidad, a tu puerta.**

Tienda en línea **full-stack** de artículos navideños para el mercado mexicano, construida con **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Prisma**.

## ✨ Características

- 🎄 **Catálogo navideño**: ~50 productos en 7 categorías (árboles, esferas, luces, decoración, regalos, ropa, dulces)
- 🏷️ **Precios promocionales**: 10 productos "gancho" al **50% del mercado** y el resto al **80%** (20% de descuento). El precio de mercado se muestra tachado.
- 🎠 **Hero carrusel** con imágenes de fondo y mensajes que avanzan solos
- ❄️ **Efecto de nieve** y tema visual navideño (rojo, verde, oro)
- 🛒 Carrito persistente, checkout, pedidos y confirmación
- ⭐ **Reseñas** (10-30 por producto) con calificación y promedio
- 🔐 Usuarios (registro/login, roles cliente/admin), historial de pedidos
- 💳 Pagos con Mercado Pago (tarjeta, SPEI, meses sin intereses) — modo simulado por defecto
- ⚙️ **Panel de administración** (`/admin`): métricas, CRUD de productos, gestión de pedidos
- 🎅 **Chat de soporte** (elfo asistente) con respuestas automáticas
- 🔍 Buscador de productos
- 🇲🇽 Localización: MXN, IVA 16%, CFDI, 32 estados

## 🚀 Puesta en marcha (local)

> Requiere Node.js 18+ y una base de datos PostgreSQL (gratis en [Neon](https://neon.tech) o [Supabase](https://supabase.com)).

```bash
npm install
cp .env.example .env     # edita DATABASE_URL y DIRECT_URL
npm run setup            # crea tablas + siembra productos y reseñas
npm run dev
```

Abre **http://localhost:3000** 🎄

### 👤 Cuentas de prueba
| Rol | Correo | Contraseña |
|-----|--------|-----------|
| Admin | admin@navidalia.mx | admin123 |
| Cliente | cliente@ejemplo.mx | cliente123 |

Panel admin: **/admin** (inicia sesión como admin).

## 🌐 Desplegar
Mira **[DEPLOY.md](./DEPLOY.md)** para publicar en Vercel con base de datos en la nube.

## 💰 Reglas de precio
Definidas en `prisma/productos.ts`: cada producto tiene un `mercado` (precio de mercado). Los productos con `gancho: true` se venden al 50% y el resto al 80%. El precio de mercado se guarda como `precioAnterior` (tachado).
