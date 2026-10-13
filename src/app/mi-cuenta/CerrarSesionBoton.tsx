"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function CerrarSesionBoton() {
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };
  return (
    <button
      onClick={handleLogout}
      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-navidad-rojo hover:text-navidad-rojo"
    >
      Cerrar sesión
    </button>
  );
}
