-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "code" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Click" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "country" TEXT,
    "referer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IpRateLimit" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "lastHit" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IpRateLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Url_code_key" ON "Url"("code");

-- CreateIndex
CREATE INDEX "Url_code_idx" ON "Url"("code");

-- CreateIndex
CREATE INDEX "Url_userId_idx" ON "Url"("userId");

-- CreateIndex
CREATE INDEX "Url_createdAt_idx" ON "Url"("createdAt");

-- CreateIndex
CREATE INDEX "Click_urlId_idx" ON "Click"("urlId");

-- CreateIndex
CREATE INDEX "Click_createdAt_idx" ON "Click"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "IpRateLimit_ip_key" ON "IpRateLimit"("ip");

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
