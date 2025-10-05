import { prisma } from "@/lib/prisma";

export default async function CompaniesPage({ searchParams }: { searchParams?: { from?: string; to?: string } }) {
  const from = searchParams?.from ?? "";
  const to = searchParams?.to ?? "";

  const companies = await prisma.companyProfile.findMany({
    include: { user: true, routes: true },
    where: {
      routes: from || to ? {
        some: {
          ...(from ? { fromCity: { contains: from } } : {}),
          ...(to ? { toCity: { contains: to } } : {}),
        },
      } : undefined,
    },
    orderBy: { companyName: "asc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-emerald-700">Sociétés de transport</h1>

      <form className="grid sm:grid-cols-3 gap-3" method="get">
        <input name="from" placeholder="Ville de départ" defaultValue={from} className="border rounded px-3 py-2" />
        <input name="to" placeholder="Ville d'arrivée" defaultValue={to} className="border rounded px-3 py-2" />
        <button className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-sm">Rechercher</button>
      </form>

      <ul className="space-y-4">
        {companies.map((c) => (
          <li key={c.id} className="border rounded p-4">
            <div className="font-semibold">{c.companyName}</div>
            {c.address && <div className="text-sm text-gray-600">{c.address}</div>}
            <div className="mt-2 text-sm">
              <strong>Lignes:</strong>
              <ul className="list-disc ml-5 mt-1 space-y-1">
                {c.routes.length === 0 && <li className="list-none text-gray-500">Aucune ligne renseignée</li>}
                {c.routes.map((r) => (
                  <li key={r.id}>
                    {r.fromCity} → {r.toCity}
                    {r.departure && `, départ: ${r.departure}`}
                    {r.days && `, jours: ${r.days}`}
                    {typeof r.priceFca === "number" && `, prix: ${r.priceFca} FCFA`}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
