# 🚀 Desplegar Navidalia en Vercel

Guía rápida para publicar la tienda con base de datos en la nube (gratis).

## 1. Base de datos (Neon)
1. Entra a **https://neon.tech** y regístrate (puedes usar GitHub).
2. Crea un proyecto y copia la **connection string** (`postgresql://...`).

## 2. Importar en Vercel
1. Entra a **https://vercel.com** y conéctate con GitHub.
2. **Add New → Project** e importa el repositorio.
3. Agrega estas **Environment Variables** (tipo Config, no Secret):

| Nombre | Valor |
|--------|-------|
| `DATABASE_URL` | la connection string de Neon |
| `DIRECT_URL` | la misma connection string |
| `AUTH_SECRET` | una cadena larga aleatoria |
| `SEED_TOKEN` | un token secreto que elijas |
| `MP_MOCK` | `true` |

4. Clic en **Deploy**.

## 3. Sembrar datos (una vez)
Tras el despliegue, visita en el navegador:
```
https://tu-proyecto.vercel.app/api/seed?token=EL_SEED_TOKEN
```
Verás un mensaje con los productos y reseñas sembrados.

Cuentas: admin@navidalia.mx / admin123

## 4. (Opcional) Google Analytics
Agrega la variable `NEXT_PUBLIC_GA_ID` con tu ID de medición (G-XXXXXXXXXX) y vuelve a desplegar.

## 5. (Opcional) Pagos reales
`MP_MOCK=false` + `MP_ACCESS_TOKEN=tu-token` de Mercado Pago.

## 6. Subir imágenes desde el panel admin (Vercel Blob)
Para poder subir imágenes de producto desde tu computadora en `/admin`:
1. En Vercel, abre tu proyecto → pestaña **Storage** → **Create Database** → elige **Blob**.
2. Dale un nombre y conéctalo al proyecto. Vercel añade automáticamente la
   variable `BLOB_READ_WRITE_TOKEN`.
3. Haz **Redeploy** del proyecto.
4. Listo: en `/admin → Productos → Editar` aparece el botón **📁 Subir imagen**.
