-- CreateTable
CREATE TABLE "jwtTokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "jwtTokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "jwtTokens" ADD CONSTRAINT "jwtTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
