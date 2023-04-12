import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.account.upsert({
    where: { id: 'f8df753c-3b58-43aa-8016-12aaa4f1ea3e' },
    update: {},
    create: {
      id: 'f8df753c-3b58-43aa-8016-12aaa4f1ea3e',
      balance: 0,
      name: 'John Doe',
    },
  });

  await prisma.account.upsert({
    where: { id: '0216ea38-524f-4e85-8743-d484a8f7538e' },
    update: {},
    create: {
      id: '0216ea38-524f-4e85-8743-d484a8f7538e',
      balance: 0,
      name: 'Jane Doe',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
