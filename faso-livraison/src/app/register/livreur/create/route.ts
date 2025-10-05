import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const firstName = String(formData.get("firstName") || "");
  const lastName = String(formData.get("lastName") || "");
  const email = String(formData.get("email") || "");
  const phone = String(formData.get("phone") || "");
  const identityNumber = String(formData.get("identityNumber") || "");
  const familyContactName = String(formData.get("familyContactName") || "");
  const familyContactPhone = String(formData.get("familyContactPhone") || "");
  const familyContactAddress = String(formData.get("familyContactAddress") || "");
  const city = String(formData.get("city") || "");

  if (!firstName || !lastName || !email) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        phone,
        role: Role.LIVREUR,
        courier: {
          create: {
            identityNumber,
            familyContactName,
            familyContactPhone,
            familyContactAddress,
            city,
          },
        },
      },
    });
    return NextResponse.redirect(new URL("/register/success", req.url));
  } catch (e: unknown) {
    return NextResponse.json({ error: "Impossible de créer le livreur" }, { status: 500 });
  }
}
