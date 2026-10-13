"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatMXN } from "@/lib/mexico";
import { CATEGORIAS } from "@/lib/data";
import type { Producto } from "@/lib/types";

type ProductoAdmin = Producto & { activo: boolean };

const CATEGORIAS_IDS = CATEGORIAS.map((c) => c.id);

const FORM_VACIO = {
  nombre: "",
  slug: "",
  descripcion: "",
  precio: "",
  precioAnterior: "",
  categoria: "arboles",
  imagen: "",
  stock: "",
  gancho: false,
  destacado: false,
};

export default function AdminProductos({
  productosIniciales,
}: {
  productosIniciales: ProductoAdmin[];
}) {
  const router = useRouter();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [form, setForm] = useState<typeof FORM_VACIO>(FORM_VACIO);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [subiendo, setSubiendo] = useState(false);

  const subirImagen = async (archivo: File) => {
    setError("");
    setSubiendo(true);
    try {
      const fd = new FormData();
      fd.append("archivo", archivo);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al subir la imagen");
      setForm((f) => ({ ...f, imagen: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      setSubiendo(false);
    }
  };

  const abrirNuevo = () => {
    setForm(FORM_VACIO);
    setEditandoId(null);
    setError("");
    setMostrarForm(true);
  };
  const abrirEditar = (p: ProductoAdmin) => {
    setForm({
      nombre: p.nombre,
      slug: p.slug,
      descripcion: p.descripcion,
      precio: String(p.precio),
      precioAnterior: p.precioAnterior ? String(p.precioAnterior) : "",
      categoria: p.categoria,
      imagen: p.imagen,
      stock: String(p.stock),
      gancho: p.gancho ?? false,
      destacado: p.destacado ?? false,
    });
    setEditandoId(p.id);
    setError("");
    setMostrarForm(true);
  };

  const generarSlug = (nombre: string) =>
    nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setGuardando(true);
    const payload = {
      nombre: form.nombre,
      slug: form.slug || generarSlug(form.nombre),
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      precioAnterior: form.precioAnterior
        ? parseFloat(form.precioAnterior)
        : null,
      categoria: form.categoria,
      imagen: form.imagen,
      stock: parseInt(form.stock, 10),
      gancho: form.gancho,
      destacado: form.destacado,
    };
    try {
      const url = editandoId
        ? `/api/admin/productos/${editandoId}`
        : "/api/admin/productos";
      const method = editandoId ? "PATCH" : "POST";
      const bodyObj = editandoId ? { ...payload, slug: undefined } : payload;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyObj),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al guardar");
      setMostrarForm(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  const eliminar = async (id: string, nombre: string) => {
    if (!confirm(`¿Desactivar "${nombre}"?`)) return;
    await fetch(`/api/admin/productos/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-navidad-verde focus:outline-none";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Productos</h2>
        <button
          onClick={abrirNuevo}
          className="rounded-lg bg-navidad-verde px-4 py-2 text-sm font-semibold text-white hover:bg-navidad-verdeClaro"
        >
          + Nuevo producto
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {productosIniciales.map((p) => (
              <tr key={p.id} className={p.activo ? "" : "opacity-50"}>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {p.nombre}
                  {p.gancho && <span title="Gancho"> 🔥</span>}
                  {p.destacado && <span title="Destacado"> ⭐</span>}
                </td>
                <td className="px-4 py-3 capitalize text-gray-600">
                  {p.categoria}
                </td>
                <td className="px-4 py-3">{formatMXN(p.precio)}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      p.stock <= 10 ? "font-semibold text-navidad-rojo" : ""
                    }
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {p.activo ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                      Activo
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => abrirEditar(p)}
                    className="mr-2 text-navidad-verde hover:underline"
                  >
                    Editar
                  </button>
                  {p.activo && (
                    <button
                      onClick={() => eliminar(p.id, p.nombre)}
                      className="text-navidad-rojo hover:underline"
                    >
                      Desactivar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              {editandoId ? "Editar producto" : "Nuevo producto"}
            </h3>
            {error && (
              <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-navidad-rojo">
                {error}
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className={inputClass}
              />
              {!editandoId && (
                <input
                  placeholder="Slug (automático si lo dejas vacío)"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className={inputClass}
                />
              )}
              <textarea
                required
                placeholder="Descripción"
                value={form.descripcion}
                onChange={(e) =>
                  setForm({ ...form, descripcion: e.target.value })
                }
                className={inputClass}
                rows={3}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="number"
                  step="0.01"
                  placeholder="Precio de venta (MXN)"
                  value={form.precio}
                  onChange={(e) => setForm({ ...form, precio: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Precio de mercado (tachado)"
                  value={form.precioAnterior}
                  onChange={(e) =>
                    setForm({ ...form, precioAnterior: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={form.categoria}
                  onChange={(e) =>
                    setForm({ ...form, categoria: e.target.value })
                  }
                  className={inputClass}
                >
                  {CATEGORIAS_IDS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  required
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Imagen del producto
                </label>
                <div className="flex items-center gap-3">
                  {form.imagen && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={form.imagen}
                      alt="Vista previa"
                      className="h-16 w-16 rounded-lg border border-gray-200 object-cover"
                    />
                  )}
                  <label className="cursor-pointer rounded-lg border border-navidad-verde px-4 py-2 text-sm font-medium text-navidad-verde transition-colors hover:bg-navidad-verde hover:text-white">
                    {subiendo ? "Subiendo..." : "📁 Subir imagen"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={subiendo}
                      onChange={(e) => {
                        const archivo = e.target.files?.[0];
                        if (archivo) subirImagen(archivo);
                      }}
                    />
                  </label>
                </div>
                <input
                  required
                  type="url"
                  placeholder="…o pega la URL de una imagen"
                  value={form.imagen}
                  onChange={(e) => setForm({ ...form, imagen: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.gancho}
                    onChange={(e) =>
                      setForm({ ...form, gancho: e.target.checked })
                    }
                  />{" "}
                  Oferta gancho (50%)
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.destacado}
                    onChange={(e) =>
                      setForm({ ...form, destacado: e.target.checked })
                    }
                  />{" "}
                  Destacado
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={guardando}
                  className="flex-1 rounded-lg bg-navidad-verde py-2 font-semibold text-white hover:bg-navidad-verdeClaro disabled:bg-gray-300"
                >
                  {guardando ? "Guardando..." : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={() => setMostrarForm(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
