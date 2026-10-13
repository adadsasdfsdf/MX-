"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCarrito } from "@/context/CarritoContext";
import { useAuth } from "@/context/AuthContext";
import { CATEGORIAS } from "@/lib/data";
import { Logo } from "@/components/Logo";
import BuscadorHeader from "@/components/BuscadorHeader";
import CategoriaIcono from "@/components/CategoriaIcono";
import BarraPromo from "@/components/BarraPromo";
import { IconoUsuario, IconoCarrito, IconoChevron } from "@/components/Iconos";

export default function Header() {
  const { totalItems } = useCarrito();
  const { usuario, logout } = useAuth();
  const router = useRouter();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuAbierto(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <BarraPromo />

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
        <Link href="/" className="flex-shrink-0">
          <Logo />
        </Link>

        <BuscadorHeader />

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setMenuAbierto((v) => !v)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-navidad-verde"
            >
              <IconoUsuario className="h-5 w-5" />
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-[11px] font-normal text-gray-400">
                  {usuario ? "Hola," : "Bienvenido"}
                </span>
                <span className="block font-semibold">
                  {usuario ? usuario.nombre.split(" ")[0] : "Mi cuenta"}
                </span>
              </span>
              <IconoChevron className="hidden h-3.5 w-3.5 text-gray-400 sm:block" />
            </button>

            {menuAbierto && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuAbierto(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-1 w-52 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                  {usuario ? (
                    <>
                      <div className="border-b border-gray-100 px-4 py-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {usuario.nombre}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {usuario.email}
                        </p>
                      </div>
                      <Link
                        href="/mi-cuenta"
                        onClick={() => setMenuAbierto(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-navidad-crema"
                      >
                        Mi cuenta y pedidos
                      </Link>
                      {usuario.rol === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setMenuAbierto(false)}
                          className="block px-4 py-2 text-sm font-medium text-navidad-verde hover:bg-navidad-crema"
                        >
                          ⚙️ Panel de administración
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-navidad-rojo hover:bg-navidad-crema"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMenuAbierto(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-navidad-crema"
                      >
                        Iniciar sesión
                      </Link>
                      <Link
                        href="/registro"
                        onClick={() => setMenuAbierto(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-navidad-crema"
                      >
                        Crear cuenta
                      </Link>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          <Link
            href="/carrito"
            className="relative flex items-center gap-2 rounded-lg bg-navidad-verde px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navidad-verdeClaro"
          >
            <IconoCarrito className="h-5 w-5" />
            <span className="hidden sm:inline">Carrito</span>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-navidad-rojo text-xs font-bold text-white ring-2 ring-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-4 py-2.5 text-sm">
          <Link
            href="/ofertas"
            className="flex flex-shrink-0 items-center gap-1 whitespace-nowrap font-bold text-navidad-rojo hover:text-navidad-rojoOscuro"
          >
            🔥 Ofertas
          </Link>
          {CATEGORIAS.map((c) => (
            <Link
              key={c.id}
              href={`/categoria/${c.id}`}
              className="flex flex-shrink-0 items-center gap-1.5 whitespace-nowrap font-medium text-gray-600 transition-colors hover:text-navidad-verde"
            >
              <CategoriaIcono categoria={c.id} className="h-4 w-4" />
              {c.nombre}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
