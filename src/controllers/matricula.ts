import { Request, Response } from "express";

import {prisma} from "../../config/prisma";
import prismaErrorCodes from "../../config/prismaErrorCodes.json";

import { Prisma } from "../../generated/prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/client";
import { connect } from "node:http2";
import cursos from "./cursos";

export default {
    update: async (request: Request, response: Response) => {

        // Create
        try {
            const { alunoId, cursoId } = request.body;
            const users = await prisma.alunos.update({
                where: {
                    id: alunoId
                },
                data: {
                    cursos: {
                        connect: {
                            id: cursoId
                        }
                    }
                }
            });
            
            return response.status(201).json(users);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof PrismaClientValidationError){
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
            };
            return response.status(500).json("Unkown error. try again later");
        };
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { alunoId, cursoId } = request.body;
            const users = await prisma.alunos.update({
                where: {
                    id: alunoId
                },
                data: {
                    cursos: {
                        disconnect: {
                            id: cursoId
                        }
                    }
                }
            });
            
            return response.status(201).json(users);
        } catch (e) {
            console.error(e)
            if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof PrismaClientValidationError){
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
            };
            return response.status(500).json("Unkown error. try again later");
        };
    },
}