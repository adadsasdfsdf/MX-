const ANUNCIOS = [
  "🎄 ¡Hasta 50% de descuento en productos seleccionados!",
  "🚚 Envío GRATIS en compras mayores a $799 MXN",
  "🎁 Todo el catálogo con 20% de descuento",
  "🦌 La magia de la Navidad, directo a tu puerta",
  "💳 Paga a meses sin intereses con Mercado Pago",
  "⭐ Miles de familias ya decoran con Navidalia",
];

export default function BarraPromo() {
  const items = [...ANUNCIOS, ...ANUNCIOS];
  return (
    <div className="marquee-pausa overflow-hidden bg-navidad-rojo text-white">
      <div className="flex w-max animate-marquee whitespace-nowrap py-2">
        {items.map((t, i) => (
          <span key={i} className="mx-6 text-sm font-medium">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
