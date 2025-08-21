// src/app/api/calcular/route.js

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req) {
  const { ingresos, tipoActividad, tiempoNegocio } = await req.json();

  if (!ingresos || !tipoActividad || !tiempoNegocio) {
    return new Response(JSON.stringify({ error: "Faltan datos para calcular" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let tarifa = 1.0;
  switch (tipoActividad) {
    case "venta-productos":
      tarifa = 1.5;
      break;
    case "servicios-personales":
      tarifa = 2.0;
      break;
    case "venta-ambulante":
      tarifa = 1.0;
      break;
    case "otro":
      tarifa = 1.2;
      break;
  }

  let factorTiempo = 1;
  if (tiempoNegocio === "menos-1-ano") factorTiempo = 0.5;
  if (tiempoNegocio === "1-3-anos") factorTiempo = 0.8;
  if (tiempoNegocio === "3-5-anos") factorTiempo = 1;
  if (tiempoNegocio === "mas-5-anos") factorTiempo = 1.2;

  const impuestoMensual = (ingresos * tarifa * factorTiempo) / 100;

  return new Response(
    JSON.stringify({
      ingresosMensuales: ingresos,
      impuestoMensual,
      tarifa,
      tipoActividad,
      tiempoNegocio,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
