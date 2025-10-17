import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-emerald-700">Faso livraison</h1>
        <p className="mt-2 text-gray-700 max-w-2xl">
          Trouvez un livreur disponible 24/7 partout au Burkina Faso: Ouagadougou et toutes les provinces.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link href="/register" className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-sm">S&apos;inscrire</Link>
          <Link href="/couriers" className="px-4 py-2 rounded border text-emerald-700 border-emerald-600 hover:bg-emerald-50 text-sm">Voir les livreurs</Link>
          <Link href="/companies" className="px-4 py-2 rounded border text-emerald-700 border-emerald-600 hover:bg-emerald-50 text-sm">Sociétés de transport</Link>
        </div>
      </section>

      <section className="grid sm:grid-cols-3 gap-6">
        <div className="rounded border p-4">
          <h3 className="font-semibold">Clients</h3>
          <p className="text-sm text-gray-600">Inscription simple: nom, prénom, e‑mail.</p>
        </div>
        <div className="rounded border p-4">
          <h3 className="font-semibold">Livreurs</h3>
          <p className="text-sm text-gray-600">Ajoutez téléphone, pièce d&apos;identité, contact familial, ville.</p>
        </div>
        <div className="rounded border p-4">
          <h3 className="font-semibold">Sociétés de transport</h3>
          <p className="text-sm text-gray-600">Publiez vos lignes et horaires pour les voyageurs.</p>
        </div>
      </section>
    </div>
  );
}
