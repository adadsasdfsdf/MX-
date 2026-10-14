/* Navidalia · versión estática · lógica de la tienda (sin servidor) */

const IMG_FALLBACK = "https://picsum.photos/seed/navidalia-fallback/600/600";
const ENVIO_GRATIS = 799;
const ENVIO_COSTO = 99;

/* ---------- utilidades ---------- */
const money = (n) =>
  "MX$" +
  new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) +
  " MXN";

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const porProducto = (slug) => PRODUCTOS.find((p) => p.slug === slug);
const porCategoria = (id) => PRODUCTOS.filter((p) => p.categoria === id);

/* ---------- carrito (localStorage) ---------- */
const CART_KEY = "navidalia-estatico-carrito";
function getCarrito() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}
function setCarrito(c) {
  localStorage.setItem(CART_KEY, JSON.stringify(c));
  actualizarContador();
}
function agregarCarrito(slug, cant = 1) {
  const c = getCarrito();
  const item = c.find((i) => i.slug === slug);
  if (item) item.cantidad += cant;
  else c.push({ slug, cantidad: cant });
  setCarrito(c);
  actualizarContador(true);
}
function actualizarContador(animar) {
  const n = getCarrito().reduce((a, i) => a + i.cantidad, 0);
  const el = document.getElementById("contadorCarrito");
  el.textContent = n;
  el.style.display = n > 0 ? "flex" : "none";
}

/* ---------- estrellas (promedio fijo por producto para la demo) ---------- */
function promedioFalso(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return 4.3 + (h % 7) / 10; // entre 4.3 y 4.9
}
function totalResenasFalso(slug, gancho) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 17 + slug.charCodeAt(i)) >>> 0;
  return gancho ? 80 + (h % 70) : 30 + (h % 60);
}
function estrellasHTML(valor) {
  const pct = Math.max(0, Math.min(100, (valor / 5) * 100));
  return `<span class="estrellas"><span class="base">★★★★★</span><span class="fill" style="width:${pct}%">★★★★★</span></span>`;
}

const RESENAS_DEMO = [
  { a: "María G.", c: 5, t: "¡Quedó precioso en mi sala! Le dio un ambiente súper navideño a la casa." },
  { a: "José L.", c: 5, t: "Mejor de lo que esperaba por el precio. La calidad me sorprendió." },
  { a: "Fernanda S.", c: 5, t: "Mis hijos quedaron encantados. ¡Pura magia navideña! 🎄" },
  { a: "Carlos H.", c: 4, t: "Llegó rápido y bien empacado. Muy recomendable para la temporada." },
  { a: "Ana P.", c: 5, t: "Ideal para el intercambio navideño. Quedé como reina con el regalo. 🎁" },
  { a: "Miguel Á.", c: 4, t: "Buen producto, colores vivos. Lo volvería a comprar." },
  { a: "Paola N.", c: 3, t: "Bonito, aunque lo esperaba un poco más grande. Igual cumple." },
];

/* ---------- tarjeta de producto ---------- */
function cardProducto(p) {
  const desc = p.precioAnterior && p.precioAnterior > p.precio;
  const pct = desc ? Math.round(((p.precioAnterior - p.precio) / p.precioAnterior) * 100) : 0;
  let etq = "";
  if (p.gancho) etq = `<span class="prod__etq prod__etq--oferta">🔥 OFERTA -${pct}%</span>`;
  else if (desc) etq = `<span class="prod__etq prod__etq--desc">-${pct}%</span>`;
  return `
    <div class="prod">
      <a class="prod__img" href="#/producto/${p.slug}">
        ${etq}
        <img src="${esc(p.imagen)}" alt="${esc(p.nombre)}" loading="lazy"
             onerror="this.src='${IMG_FALLBACK}'" />
      </a>
      <div class="prod__cuerpo">
        <a href="#/producto/${p.slug}"><div class="prod__nom">${esc(p.nombre)}</div></a>
        <div class="prod__desc">${esc(p.descripcion)}</div>
        <div class="prod__precio">
          <span class="ahora">${money(p.precio)}</span>
          ${desc ? `<span class="antes">${money(p.precioAnterior)}</span>` : ""}
        </div>
        <button class="btn btn--verde prod__btn" onclick="agregarCarrito('${p.slug}')">Agregar al carrito</button>
      </div>
    </div>`;
}

/* ---------- páginas ---------- */
function vistaInicio() {
  const destacados = PRODUCTOS.filter((p) => p.destacado).slice(0, 10);
  const gancho = PRODUCTOS.filter((p) => p.gancho).slice(0, 5);
  return `
    <section class="hero">
      <div class="contenedor hero__caja">
        <span class="hero__etq">🎄 Temporada Navideña</span>
        <h1>La magia de la Navidad, <b>a tu puerta</b></h1>
        <p>Árboles, esferas, luces, regalos y todo para decorar y celebrar las fiestas. Envíos a toda la República Mexicana.</p>
        <div class="hero__btns">
          <a class="btn btn--blanco" href="#/categoria/arboles">Explorar productos</a>
          <a class="btn btn--linea" href="#/ofertas">Ver ofertas 🔥</a>
        </div>
      </div>
    </section>

    <section class="seccion">
      <div class="contenedor">
        <div class="seccion__tit"><h2>Explora por categoría</h2><p>Todo para una Navidad mágica 🎄</p></div>
        <div class="cats-grid">
          ${CATEGORIAS.map((c) => `
            <a class="cat-card" href="#/categoria/${c.id}">
              <span class="emoji">${c.emoji}</span>
              <span class="n">${esc(c.nombre)}</span>
            </a>`).join("")}
        </div>
      </div>
    </section>

    <section class="seccion" style="background:var(--crema)">
      <div class="contenedor">
        <div class="seccion__tit"><h2 style="color:var(--rojo)">🔥 Ofertas de temporada</h2><p>¡Hasta 50% de descuento!</p></div>
        <div class="prod-grid">${gancho.map(cardProducto).join("")}</div>
      </div>
    </section>

    <section class="seccion">
      <div class="contenedor">
        <div class="seccion__tit"><h2>Favoritos de la temporada ⭐</h2></div>
        <div class="prod-grid">${destacados.map(cardProducto).join("")}</div>
      </div>
    </section>`;
}

function vistaCategoria(id) {
  const cat = CATEGORIAS.find((c) => c.id === id);
  if (!cat) return vistaInicio();
  const prods = porCategoria(id);
  return `
    <section class="seccion"><div class="contenedor">
      <div class="seccion__tit"><h2>${cat.emoji} ${esc(cat.nombre)}</h2></div>
      <div class="prod-grid">${prods.map(cardProducto).join("")}</div>
    </div></section>`;
}

function vistaOfertas() {
  const gancho = PRODUCTOS.filter((p) => p.gancho);
  const resto = PRODUCTOS.filter((p) => !p.gancho && p.precioAnterior > p.precio);
  return `
    <section class="hero"><div class="contenedor hero__caja" style="text-align:center;margin:0 auto">
      <span class="hero__etq">🎄 Ofertas de temporada</span>
      <h1>¡Hasta <b>50% de descuento</b>!</h1>
      <p style="margin:0 auto">Las mejores ofertas gancho y 20% en todo el catálogo. ¡Decora tu Navidad por menos!</p>
    </div></section>
    <section class="seccion"><div class="contenedor">
      <div class="seccion__tit"><h2 style="color:var(--rojo)">🔥 Ofertas gancho (50% off)</h2></div>
      <div class="prod-grid">${gancho.map(cardProducto).join("")}</div>
    </div></section>
    <section class="seccion"><div class="contenedor">
      <div class="seccion__tit"><h2>Más ofertas (20% off)</h2></div>
      <div class="prod-grid">${resto.map(cardProducto).join("")}</div>
    </div></section>`;
}

function vistaBuscar(q) {
  const t = (q || "").toLowerCase();
  const res = PRODUCTOS.filter(
    (p) => p.nombre.toLowerCase().includes(t) || p.descripcion.toLowerCase().includes(t),
  );
  return `
    <section class="seccion"><div class="contenedor">
      <div class="seccion__tit"><h2>Resultados para "${esc(q)}"</h2><p>${res.length} producto(s)</p></div>
      <div class="prod-grid">${res.map(cardProducto).join("") || '<p style="text-align:center;color:var(--gris)">Sin resultados.</p>'}</div>
    </div></section>`;
}

function vistaProducto(slug) {
  const p = porProducto(slug);
  if (!p) return vistaInicio();
  const desc = p.precioAnterior && p.precioAnterior > p.precio;
  const prom = promedioFalso(p.slug);
  const totR = totalResenasFalso(p.slug, p.gancho);
  const resenas = RESENAS_DEMO.slice(0, 5)
    .map((r) => `
      <div class="resena">
        <div class="resena__top">
          <div>
            <strong>${r.a}</strong><span class="verif">✓ Compra verificada</span>
            <div>${estrellasHTML(r.c)}</div>
          </div>
        </div>
        <p style="margin-top:8px;font-size:14px;color:#374151">${esc(r.t)}</p>
      </div>`).join("");
  return `
    <div class="contenedor">
      <div class="detalle">
        <div class="detalle__img">
          <img src="${esc(p.imagen)}" alt="${esc(p.nombre)}" onerror="this.src='${IMG_FALLBACK}'" />
        </div>
        <div>
          <h1>${esc(p.nombre)}</h1>
          <div style="margin-top:8px">${estrellasHTML(prom)} <span style="color:var(--gris);font-size:14px">${prom.toFixed(1)} · ${totR} opiniones</span></div>
          <div class="precio-grande">
            ${desc ? `<span class="antes-grande">${money(p.precioAnterior)}</span>` : ""}${money(p.precio)}
          </div>
          <p style="margin-top:18px;color:#374151">${esc(p.descripcion)}</p>
          <div style="margin-top:20px">
            <button class="btn btn--verde" onclick="agregarCarrito('${p.slug}')">Agregar al carrito</button>
          </div>
          <div class="ventajas">
            <p>🚚 Envío gratis en compras mayores a $799 MXN</p>
            <p>💳 Paga con tarjeta de crédito o débito</p>
            <p>🧾 Facturación CFDI disponible</p>
          </div>
        </div>
      </div>
      <div style="padding:0 0 48px">
        <h2 style="font-size:24px;font-weight:800;margin-bottom:4px">Opiniones de clientes</h2>
        <div style="margin-bottom:8px">${estrellasHTML(prom)} <strong>${prom.toFixed(1)}</strong> · ${totR} opiniones</div>
        ${resenas}
      </div>
    </div>`;
}

function vistaCarrito() {
  const carrito = getCarrito().map((i) => ({ ...i, p: porProducto(i.slug) })).filter((i) => i.p);
  if (carrito.length === 0) {
    return `<div class="contenedor" style="text-align:center;padding:80px 0">
      <div style="font-size:56px">🛒</div>
      <h1 style="font-size:24px;font-weight:800;margin-top:12px">Tu carrito está vacío</h1>
      <p style="color:var(--gris);margin-top:6px">¡Llena tu carrito de magia navideña! 🎄</p>
      <a class="btn btn--verde" style="margin-top:20px" href="#/">Seguir comprando</a>
    </div>`;
  }
  const subtotal = carrito.reduce((a, i) => a + i.p.precio * i.cantidad, 0);
  const envio = subtotal >= ENVIO_GRATIS ? 0 : ENVIO_COSTO;
  const items = carrito.map((i) => `
    <div class="carrito-item">
      <img src="${esc(i.p.imagen)}" onerror="this.src='${IMG_FALLBACK}'" alt="" />
      <div style="flex:1">
        <strong>${esc(i.p.nombre)}</strong>
        <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center">
          <span class="cantidad">
            <button onclick="cambiarCant('${i.slug}',-1)">−</button>
            <span style="padding:0 8px">${i.cantidad}</span>
            <button onclick="cambiarCant('${i.slug}',1)">+</button>
          </span>
          <strong>${money(i.p.precio * i.cantidad)}</strong>
        </div>
        <button onclick="quitarCarrito('${i.slug}')" style="border:none;background:none;color:var(--gris);font-size:13px;cursor:pointer;margin-top:6px">✕ Quitar</button>
      </div>
    </div>`).join("");
  return `
    <section class="seccion"><div class="contenedor">
      <h1 style="font-size:28px;font-weight:800;margin-bottom:20px">Tu carrito</h1>
      <div style="display:grid;gap:28px;grid-template-columns:1fr">
        <div>${items}</div>
        <div class="resumen">
          <h2 style="font-size:18px;font-weight:800;margin-bottom:12px">Resumen</h2>
          <div class="linea"><span>Subtotal</span><span>${money(subtotal)}</span></div>
          <div class="linea"><span>Envío</span><span>${envio === 0 ? "Gratis" : money(envio)}</span></div>
          <div class="linea total"><span>Total</span><span>${money(subtotal + envio)}</span></div>
          <button class="btn btn--verde" style="width:100%;margin-top:16px" onclick="demoCheckout()">Proceder al pago</button>
          <p class="aviso" style="margin-top:12px">🔒 Versión de demostración: no se procesan pagos reales.</p>
        </div>
      </div>
    </div></section>`;
}

/* ---------- acciones carrito ---------- */
function cambiarCant(slug, delta) {
  const c = getCarrito();
  const item = c.find((i) => i.slug === slug);
  if (!item) return;
  item.cantidad += delta;
  const nuevo = c.filter((i) => i.cantidad > 0);
  setCarrito(nuevo);
  render();
}
function quitarCarrito(slug) {
  setCarrito(getCarrito().filter((i) => i.slug !== slug));
  render();
}
function demoCheckout() {
  alert("🎄 ¡Gracias por tu interés!\n\nEsta es una versión de demostración, no se procesan pagos reales.");
}

/* ---------- buscar / chat ---------- */
function buscar(e) {
  e.preventDefault();
  const q = document.getElementById("inputBuscar").value.trim();
  if (q) location.hash = "#/buscar/" + encodeURIComponent(q);
}
function toggleChat() {
  document.getElementById("chatCaja").classList.toggle("abierto");
}

/* ---------- router ---------- */
function render() {
  const h = location.hash.replace(/^#\/?/, "");
  const [ruta, arg] = h.split("/");
  let html;
  if (!ruta) html = vistaInicio();
  else if (ruta === "categoria") html = vistaCategoria(arg);
  else if (ruta === "producto") html = vistaProducto(arg);
  else if (ruta === "ofertas") html = vistaOfertas();
  else if (ruta === "carrito") html = vistaCarrito();
  else if (ruta === "buscar") html = vistaBuscar(decodeURIComponent(arg || ""));
  else html = vistaInicio();
  document.getElementById("app").innerHTML = html;
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", render);

/* ---------- inicialización ---------- */
function init() {
  // Nav de categorías
  document.getElementById("navCats").innerHTML =
    `<a class="ofertas" href="#/ofertas">🔥 Ofertas</a>` +
    CATEGORIAS.map((c) => `<a href="#/categoria/${c.id}">${c.emoji} ${esc(c.nombre)}</a>`).join("");
  // Footer categorías
  document.getElementById("footerCats").innerHTML = CATEGORIAS.map(
    (c) => `<li><a href="#/categoria/${c.id}">${esc(c.nombre)}</a></li>`,
  ).join("");
  // Promo marquee (duplicado para bucle continuo)
  const anuncios = [
    "🎄 ¡Hasta 50% de descuento en productos seleccionados!",
    "🚚 Envío GRATIS en compras mayores a $799 MXN",
    "🎁 Todo el catálogo con 20% de descuento",
    "🦌 La magia de la Navidad, directo a tu puerta",
    "💳 Paga con tarjeta a meses sin intereses",
  ];
  document.getElementById("promoPista").innerHTML =
    [...anuncios, ...anuncios].map((a) => `<span>${a}</span>`).join("");
  // Año
  document.getElementById("anio").textContent = new Date().getFullYear();
  // Nieve
  const nieve = document.getElementById("nieve");
  let copos = "";
  for (let i = 0; i < 18; i++) {
    const left = Math.random() * 100;
    const dur = 6 + Math.random() * 8;
    const delay = Math.random() * 8;
    const size = 8 + Math.random() * 14;
    copos += `<span class="copo" style="left:${left}%;font-size:${size}px;animation-duration:${dur}s;animation-delay:${delay}s">❄</span>`;
  }
  nieve.innerHTML = copos;

  actualizarContador();
  render();
}
init();
