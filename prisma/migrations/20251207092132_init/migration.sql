/*
  Warnings:

  - You are about to drop the column `video` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fact]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `video`,
    ADD COLUMN `factionId` INTEGER NULL;

-- CreateTable
CREATE TABLE `faction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `faction_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `product_fact_key` ON `product`(`fact`);

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_factionId_fkey` FOREIGN KEY (`factionId`) REFERENCES `faction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
