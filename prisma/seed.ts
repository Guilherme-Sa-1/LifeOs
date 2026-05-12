import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Adicionando a configuração de SSL obrigatória para o Supabase
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: "guilhermecgsa7@gmail.com",
    },
    update: {},
    create: {
      email: "guilhermecgsa7@gmail.com",
      name: "Guilherme Sá",
    },
  });

  console.log("Usuário criado:", user.name);

  const areas = ["Financeiro", "Pessoal", "Trabalho", "Estudo"];

  for (const areaName of areas) {
    const existingArea = await prisma.area.findFirst({
      where: {
        name: areaName,
        userId: user.id,
      },
    });

    if (!existingArea) {
      await prisma.area.create({
        data: {
          name: areaName,
          userId: user.id,
        },
      });
    }
  }

  console.log("Áreas criadas/verificadas com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });