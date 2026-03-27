// Atualiza ou Deleta uma matricula de um curso

import { Request, Response } from "express";

import {prisma} from "../../config/prisma";
import prismaErrorCodes from "../../config/prismaErrorCodes.json";

import { Prisma } from "../../generated/prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import { handleErrors } from "../helpers/handleErrors";

export default {
    create: async (request: Request, response: Response) => {

        // Create
        try {
            const { alunoId, cursosId } = request.body;
            const student = await prisma.alunos.update({
                where: {
                    id: alunoId
                },
                data: {
                    cursos: {
                        connect: cursosId.map(( cursoId: number ) => ({ id: cursoId })),
                    },
                },
                include: {
                    cursos: true,
                },
            });
            return response.status(201).json(student);
        } catch (e) {
            return handleErrors(e, response);
        };
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { cursosId } = request.body;

            const student = await prisma.alunos.update({
                where: { id: +id },
                data: {
                    cursos: {
                        disconnect: cursosId.map((cursoId: number) => ({ id: cursoId }))
                    },
                },
                include: {
                    cursos: true,
                },
            });
            return response.status(200).json(student);
        } catch (e) {
            return handleErrors(e, response);
        };
    },
};