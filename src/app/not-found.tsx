import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="text-6xl">🦌</div>
      <h1 className="mt-4 font-display text-3xl font-bold text-gray-900">
        Página no encontrada
      </h1>
      <p className="mt-2 text-gray-600">
        Parece que este regalo se perdió en el trineo de Santa.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-navidad-verde px-6 py-3 font-semibold text-white hover:bg-navidad-verdeClaro"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
