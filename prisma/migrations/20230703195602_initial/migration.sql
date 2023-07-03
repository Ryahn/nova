-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL,
    "global_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "discriminator" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "banner" TEXT NOT NULL,
    "banner_color" TEXT NOT NULL,
    "accent_color" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "mfa_enabled" BOOLEAN NOT NULL,
    "premium_type" TEXT NOT NULL,
    "public_flags" TEXT NOT NULL,
    "remember_token" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "is_staff" BOOLEAN NOT NULL,
    "is_support" BOOLEAN NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "token_expires" TIMESTAMP(3) NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guilds" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "icon_hash" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "vanity_url_code" TEXT NOT NULL,
    "nsfw_level" INTEGER NOT NULL,

    CONSTRAINT "Guilds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserGuilds" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_global_name_key" ON "Users"("global_name");

-- CreateIndex
CREATE UNIQUE INDEX "_UserGuilds_AB_unique" ON "_UserGuilds"("A", "B");

-- CreateIndex
CREATE INDEX "_UserGuilds_B_index" ON "_UserGuilds"("B");

-- AddForeignKey
ALTER TABLE "_UserGuilds" ADD CONSTRAINT "_UserGuilds_A_fkey" FOREIGN KEY ("A") REFERENCES "Guilds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGuilds" ADD CONSTRAINT "_UserGuilds_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
