import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="max-w-xl mx-auto text-center space-y-3">
      <h1 className="text-2xl font-bold text-emerald-700">Inscription réussie</h1>
      <p className="text-gray-700">Votre compte a été créé avec succès.</p>
      <div className="mt-4">
        <Link href="/" className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-sm">Retour à l&apos;accueil</Link>
      </div>
    </div>
  );
}
