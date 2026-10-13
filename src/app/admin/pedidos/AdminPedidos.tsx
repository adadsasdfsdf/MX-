"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatMXN, formatFecha } from "@/lib/mexico";

interface PedidoAdmin {
  id: string;
  numero: string;
  nombreCliente: string;
  email: string;
  telefono: string;
  calle: string;
  colonia: string | null;
  codigoPostal: string;
  ciudad: string;
  estado: string;
  subtotalCentavos: number;
  envioCentavos: number;
  totalCentavos: number;
  metodoPago: string;
  estadoPago: string;
  estadoEnvio: string;
  marcaTarjeta: string | null;
  ultimos4: string | null;
  referenciaPago: string | null;
  requiereFactura: boolean;
  rfc: string | null;
  razonSocial: string | null;
  usoCfdi: string | null;
  creadoEn: string;
  items: { nombre: string; cantidad: number; precioCentavos: number }[];
}

export default function AdminPedidos({ pedidos }: { pedidos: PedidoAdmin[] }) {
  const router = useRouter();
  const [expandido, setExpandido] = useState<string | null>(null);

  const actualizar = async (
    id: string,
    campo: "estadoPago" | "estadoEnvio",
    valor: string,
  ) => {
    await fetch(`/api/admin/pedidos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [campo]: valor }),
    });
    router.refresh();
  };

  if (pedidos.length === 0) {
    return (
      <div className="rounded-xl bg-navidad-crema p-8 text-center text-gray-600">
        Todavía no hay pedidos.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Pedidos ({pedidos.length})
      </h2>
      <div className="space-y-3">
        {pedidos.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <button
                  onClick={() => setExpandido(expandido === p.id ? null : p.id)}
                  className="font-semibold text-gray-900 hover:text-navidad-verde"
                >
                  {expandido === p.id ? "▾ " : "▸ "}
                  {p.numero}
                </button>
                <p className="text-sm text-gray-500">
                  {p.nombreCliente} · {formatFecha(p.creadoEn)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-bold text-gray-900">
                  {formatMXN(p.totalCentavos / 100)}
                </span>
                <select
                  value={p.estadoPago}
                  onChange={(e) =>
                    actualizar(p.id, "estadoPago", e.target.value)
                  }
                  className="rounded-lg border border-gray-300 px-2 py-1 text-xs focus:border-navidad-verde focus:outline-none"
                >
                  <option value="pendiente">Pago pendiente</option>
                  <option value="pagado">Pagado</option>
                  <option value="fallido">Fallido</option>
                </select>
                <select
                  value={p.estadoEnvio}
                  onChange={(e) =>
                    actualizar(p.id, "estadoEnvio", e.target.value)
                  }
                  className="rounded-lg border border-gray-300 px-2 py-1 text-xs focus:border-navidad-verde focus:outline-none"
                >
                  <option value="procesando">Procesando</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>

            {expandido === p.id && (
              <div className="mt-4 grid gap-6 border-t border-gray-100 pt-4 text-sm md:grid-cols-3">
                {/* Contacto y envío */}
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">
                    Datos de contacto y envío
                  </h4>
                  <p className="text-gray-600">
                    {p.nombreCliente}
                    <br />
                    📧 {p.email}
                    <br />
                    📞 {p.telefono}
                    <br />
                    📍 {p.calle}
                    {p.colonia ? `, ${p.colonia}` : ""}
                    <br />
                    {p.ciudad}, {p.estado}, CP {p.codigoPostal}
                  </p>
                </div>

                {/* Pago */}
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">Pago</h4>
                  <p className="text-gray-600">
                    Método: Tarjeta
                    <br />
                    {p.marcaTarjeta || p.ultimos4 ? (
                      <>
                        Tarjeta: {p.marcaTarjeta ?? "—"}{" "}
                        {p.ultimos4 ? `•••• ${p.ultimos4}` : ""}
                        <br />
                      </>
                    ) : null}
                    Estado: <span className="font-medium">{p.estadoPago}</span>
                    {p.referenciaPago && (
                      <>
                        <br />
                        Ref: {p.referenciaPago}
                      </>
                    )}
                  </p>
                  <p className="mt-2 text-[11px] text-gray-400">
                    🔒 Por seguridad (PCI) no se almacena el número completo ni
                    el CVV.
                  </p>
                  {p.requiereFactura && (
                    <p className="mt-2 text-gray-600">
                      🧾 Factura: {p.rfc} · {p.razonSocial} · {p.usoCfdi}
                    </p>
                  )}
                </div>

                {/* Productos */}
                <div>
                  <h4 className="mb-1 font-semibold text-gray-900">
                    Productos
                  </h4>
                  <ul className="space-y-1">
                    {p.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between gap-2 text-gray-600"
                      >
                        <span>
                          {item.nombre} × {item.cantidad}
                        </span>
                        <span>
                          {formatMXN(
                            (item.precioCentavos * item.cantidad) / 100,
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 border-t border-gray-100 pt-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatMXN(p.subtotalCentavos / 100)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío</span>
                      <span>
                        {p.envioCentavos === 0
                          ? "Gratis"
                          : formatMXN(p.envioCentavos / 100)}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>Total</span>
                      <span>{formatMXN(p.totalCentavos / 100)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
