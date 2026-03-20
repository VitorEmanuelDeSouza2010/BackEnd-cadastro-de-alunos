-- CreateTable
CREATE TABLE "cursosOnAlunos" (
    "alunosId" INTEGER NOT NULL,
    "cursosId" INTEGER NOT NULL,

    PRIMARY KEY ("alunosId", "cursosId"),
    CONSTRAINT "cursosOnAlunos_alunosId_fkey" FOREIGN KEY ("alunosId") REFERENCES "Alunos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "cursosOnAlunos_cursosId_fkey" FOREIGN KEY ("cursosId") REFERENCES "Cursos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
