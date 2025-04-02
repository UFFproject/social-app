import { PrismaClient, Prisma } from '@prisma/client';

BigInt.prototype.toJSON = function () {
  return parseInt(this.toString());
};

declare global {
  interface BigInt {
    toJSON(): number;
  }
}

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
}).$extends({
  model: {
    $allModels: {
      getTableName<T>(this: T) {
        const context = Prisma.getExtensionContext(this) as any;
        return (prisma as any)._runtimeDataModel.models[context.name].dbName;
      },
    },
  },
});
