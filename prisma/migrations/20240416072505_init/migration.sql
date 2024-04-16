-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'DELIVERY');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PREPARING', 'UNASSIGNED', 'COLLECTED', 'DELIVERED');

-- CreateEnum
CREATE TYPE "notifyStatus" AS ENUM ('READ', 'UNREAD');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortDescr" TEXT NOT NULL,
    "longDescr" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "sellingPrice" DOUBLE PRECISION,
    "image" TEXT NOT NULL,
    "prepType" TEXT[],
    "onPromo" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "cart" JSONB[],
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryTime" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPhone" TEXT NOT NULL,
    "paymentToken" TEXT,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "deliveryAddress" TEXT NOT NULL,
    "deliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 4,
    "serviceFee" DOUBLE PRECISION NOT NULL DEFAULT 3,
    "status" "OrderStatus" NOT NULL DEFAULT 'PREPARING',
    "note" TEXT,
    "discount" DOUBLE PRECISION,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "menu" TEXT[],

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT DEFAULT '27 DrickField, Darwin, Australia',
    "openTimes" JSONB[],
    "deliveryFee" DOUBLE PRECISION NOT NULL DEFAULT 4,
    "serviceFee" DOUBLE PRECISION NOT NULL DEFAULT 3,
    "bannerImg" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 4.5,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "notifyStatus" NOT NULL DEFAULT 'UNREAD',

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userEmail_key" ON "Favorite"("userEmail");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
