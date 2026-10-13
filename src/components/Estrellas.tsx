/** Calificación de 0 a 5 con estrellas (técnica de dos capas, soporta medias). */
export default function Estrellas({
  valor,
  size = "text-base",
}: {
  valor: number;
  size?: string;
}) {
  const porcentaje = Math.max(0, Math.min(100, (valor / 5) * 100));
  return (
    <span
      className={`relative inline-block ${size} leading-none`}
      aria-label={`${valor} de 5 estrellas`}
    >
      <span className="text-gray-300">★★★★★</span>
      <span
        className="absolute left-0 top-0 overflow-hidden text-navidad-oro"
        style={{ width: `${porcentaje}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}
