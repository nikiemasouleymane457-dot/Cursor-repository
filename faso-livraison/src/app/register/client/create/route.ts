import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const firstName = String(formData.get("firstName") || "");
  const lastName = String(formData.get("lastName") || "");
  const email = String(formData.get("email") || "");

  if (!firstName || !lastName || !email) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        role: Role.CLIENT,
      },
    });
    return NextResponse.redirect(new URL("/register/success", req.url));
  } catch (e: unknown) {
    return NextResponse.json({ error: "Impossible de créer l'utilisateur" }, { status: 500 });
  }
}
