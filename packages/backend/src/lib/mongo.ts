import "dotenv/config";
import { PrismaClient as MongoClient } from '@prisma/mongodb-client';

const mongoPrisma = new MongoClient();

export { mongoPrisma };
