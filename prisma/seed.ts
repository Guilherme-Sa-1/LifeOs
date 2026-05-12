import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

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
    await prisma.area.upsert({
      where: {
        name_userId: {
          name: areaName,
          userId: user.id,
        },
      },
      update: {},
      create: {
        name: areaName,
        userId: user.id,
      },
    });
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