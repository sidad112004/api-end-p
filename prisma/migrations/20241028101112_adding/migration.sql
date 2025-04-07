-- CreateTable
CREATE TABLE "Customapi" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "fields" JSONB NOT NULL,
    "sampleSize" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customapi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Customapi" ADD CONSTRAINT "Customapi_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
