import { prisma } from "@/lib/prisma";

export default async function CouriersPage({ searchParams }: { searchParams?: { city?: string; available?: string } }) {
  const city = searchParams?.city ?? "";
  const available = searchParams?.available === "1";

  const couriers = await prisma.courierProfile.findMany({
    include: { user: true },
    where: {
      ...(city ? { city: { contains: city } } : {}),
      ...(available ? { isAvailable: true } : {}),
    },
    orderBy: { lastActiveAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-emerald-700">Livreurs</h1>

      <form className="grid sm:grid-cols-3 gap-3" method="get">
        <input name="city" placeholder="Ville (ex: Ouagadougou)" defaultValue={city} className="border rounded px-3 py-2" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="available" value="1" defaultChecked={available} />
          Seulement disponibles maintenant
        </label>
        <button className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-sm">Rechercher</button>
      </form>

      <ul className="space-y-4">
        {couriers.map((c) => (
          <li key={c.id} className="border rounded p-4">
            <div className="font-semibold">{c.user.firstName} {c.user.lastName}</div>
            <div className="text-sm text-gray-600">
              {c.city ? c.city : "Ville non renseignée"}
              {" · "}
              {c.isAvailable ? <span className="text-emerald-700">Disponible</span> : <span className="text-gray-500">Indisponible</span>}
            </div>
            {c.user.phone && <div className="text-sm mt-1">Tél: {c.user.phone}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
