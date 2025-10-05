import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const firstName = String(formData.get("firstName") || "");
  const lastName = String(formData.get("lastName") || "");
  const email = String(formData.get("email") || "");
  const phone = String(formData.get("phone") || "");
  const companyName = String(formData.get("companyName") || "");
  const address = String(formData.get("address") || "");

  if (!firstName || !lastName || !email || !companyName) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        phone,
        role: Role.SOCIETE,
        company: {
          create: {
            companyName,
            address,
          },
        },
      },
    });
    return NextResponse.redirect(new URL("/register/success", req.url));
  } catch (e: unknown) {
    return NextResponse.json({ error: "Impossible de créer la société" }, { status: 500 });
  }
}
