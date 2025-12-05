-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `faction` VARCHAR(191) NOT NULL,
    `character` VARCHAR(191) NOT NULL,
    `fact` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `video` VARCHAR(191) NULL,
    `dummy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
