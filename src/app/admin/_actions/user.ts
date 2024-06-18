"use server"

import { notFound } from "next/navigation"

import prisma from "@/core/db/db"


export async function deleteUser(id: string) {
  const user = await prisma.user.delete({
    where: { id },
  })

  if (user == null) return notFound()

  return user
}
