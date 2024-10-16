-- CreateTable
CREATE TABLE "Favorite" (
    "movieId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_movieId_key" ON "Favorite"("movieId");
