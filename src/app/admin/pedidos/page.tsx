import { getTodosLosPedidos } from "@/lib/pedidos-consulta";
import AdminPedidos from "./AdminPedidos";

export const dynamic = "force-dynamic";

export default async function AdminPedidosPage() {
  const pedidosDB = await getTodosLosPedidos();
  const pedidos = pedidosDB.map((p) => ({
    id: p.id,
    numero: p.numero,
    nombreCliente: p.nombreCliente,
    email: p.email,
    telefono: p.telefono,
    calle: p.calle,
    colonia: p.colonia,
    codigoPostal: p.codigoPostal,
    ciudad: p.ciudad,
    estado: p.estado,
    subtotalCentavos: p.subtotalCentavos,
    envioCentavos: p.envioCentavos,
    totalCentavos: p.totalCentavos,
    metodoPago: p.metodoPago,
    estadoPago: p.estadoPago,
    estadoEnvio: p.estadoEnvio,
    marcaTarjeta: p.marcaTarjeta,
    ultimos4: p.ultimos4,
    referenciaPago: p.referenciaPago,
    requiereFactura: p.requiereFactura,
    rfc: p.rfc,
    razonSocial: p.razonSocial,
    usoCfdi: p.usoCfdi,
    creadoEn: p.creadoEn.toISOString(),
    items: p.items.map((i) => ({
      nombre: i.nombre,
      cantidad: i.cantidad,
      precioCentavos: i.precioCentavos,
    })),
  }));
  return <AdminPedidos pedidos={pedidos} />;
}
