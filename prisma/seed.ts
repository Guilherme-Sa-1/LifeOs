import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criação do usuário inicial
  const user = await prisma.user.upsert({
    where: { email: 'guilherme@cnx.com' },
    update: {},
    create: {
      email: 'guilherme@cnx.com',
      name: 'Guilherme Sá',
    },
  });

  console.log('Usuário criado:', user.name);

  // Criação das Áreas base
  const areas = ['Financeiro', 'Pessoal', 'Trabalho', 'Estudo'];
  
  for (const areaName of areas) {
    // Evita duplicar áreas se o seed rodar mais de uma vez
    const existingArea = await prisma.area.findFirst({
      where: { name: areaName, userId: user.id }
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

  console.log('Áreas iniciais criadas/verificadas com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });