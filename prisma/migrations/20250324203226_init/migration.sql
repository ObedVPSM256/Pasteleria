-- CreateTable
CREATE TABLE `USER` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL DEFAULT 'user',
    `createdDT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `profilePicture` VARCHAR(191) NOT NULL DEFAULT '/images/userDefault.png',

    UNIQUE INDEX `USER_email_key`(`email`),
    UNIQUE INDEX `USER_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
