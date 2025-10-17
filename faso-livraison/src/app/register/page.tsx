"use client";

import { useState } from "react";

type Role = "CLIENT" | "LIVREUR" | "SOCIETE";

export default function RegisterPage() {
  const [role, setRole] = useState<Role>("CLIENT");

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-emerald-700">Inscription</h1>
        <p className="text-sm text-gray-600">Choisissez votre rôle pour commencer</p>
      </header>

      <div className="flex gap-3 text-sm">
        {(["CLIENT", "LIVREUR", "SOCIETE"] as Role[]).map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-3 py-1.5 rounded border ${
              role === r ? "bg-emerald-600 text-white border-emerald-600" : "border-gray-300"
            }`}
          >
            {r === "CLIENT" && "Client"}
            {r === "LIVREUR" && "Livreur"}
            {r === "SOCIETE" && "Société"}
          </button>
        ))}
      </div>

      <form action={`/register/${role.toLowerCase()}/create`} method="post" className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Prénom</label>
            <input name="firstName" required className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm">Nom</label>
            <input name="lastName" required className="mt-1 w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">E‑mail</label>
            <input name="email" type="email" required className="mt-1 w-full border rounded px-3 py-2" />
          </div>
          {role !== "CLIENT" && (
            <div>
              <label className="block text-sm">Téléphone</label>
              <input name="phone" className="mt-1 w-full border rounded px-3 py-2" />
            </div>
          )}
        </div>

        {role === "LIVREUR" && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Numéro d&apos;identité</label>
              <input name="identityNumber" className="mt-1 w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm">Ville</label>
              <input name="city" className="mt-1 w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm">Contact familial (nom)</label>
              <input name="familyContactName" className="mt-1 w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm">Contact familial (tél.)</label>
              <input name="familyContactPhone" className="mt-1 w-full border rounded px-3 py-2" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm">Adresse du membre de famille</label>
              <input name="familyContactAddress" className="mt-1 w-full border rounded px-3 py-2" />
            </div>
          </div>
        )}

        {role === "SOCIETE" && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm">Nom de la société</label>
              <input name="companyName" required className="mt-1 w-full border rounded px-3 py-2" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm">Adresse</label>
              <input name="address" className="mt-1 w-full border rounded px-3 py-2" />
            </div>
          </div>
        )}

        <button type="submit" className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-sm">
          Créer le compte
        </button>
      </form>
    </div>
  );
}
