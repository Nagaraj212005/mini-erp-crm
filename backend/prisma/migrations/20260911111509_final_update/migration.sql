-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "address" TEXT,
ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "customerType" TEXT DEFAULT 'Retail',
ADD COLUMN     "followUpDate" TIMESTAMP(3),
ADD COLUMN     "gst" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'Active';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" TEXT,
ADD COLUMN     "minStock" INTEGER DEFAULT 0,
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "warehouse" TEXT;

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Confirmed';
