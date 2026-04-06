// Lista, Cria, Atualiza, Deleta ou pega um curso pelo Id

import { Request, Response } from "express";
import {prisma} from "../../config/prisma";
import { Prisma } from "../../generated/prisma/client";
import { handleErrors } from "../helpers/handleErrors";

export default {
    list: async (request: Request, response: Response) => {
        try {
            const users = await prisma.cursos.findMany();
            
            return response.status(200).json(users);
        } catch (e) {
            return handleErrors(e, response);
        };
    },

    create: async (request: Request, response: Response) => {
        try {
            const { nome, professor, cargaHoraria, descricao } = request.body;

            if (!nome || !cargaHoraria || !descricao){
                return response.status(400).json("Dados do curso incompletos");
            }

            const users = await prisma.cursos.create({
                data: {
                    nome,
                    professor,
                    cargaHoraria,
                    descricao,
                },
            });
            return response.status(201).json(users);
        } catch (e) {
            return handleErrors(e, response);
        };
    },

    getById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const user = await prisma.cursos.findUnique({
                where: {
                    id: +id
                },
            });
            return response.status(200).json(user);
        } catch (e) {
            return handleErrors(e, response);
        };
    },

    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, professor, cargaHoraria, descricao } = request.body;
            
            const user = await prisma.cursos.update({
                data: {
                    nome,
                    professor,
                    cargaHoraria,
                    descricao ,
                },
                where: { id: +id },
            });

            return response.status(200).json(user);
        } catch (e) {
           return handleErrors(e, response);
        };
    },

    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            
            const user = await prisma.cursos.delete({
                where: {
                    id: +id
                }
            })
            
            return response.status(200).json(user);
        } catch (e) {
           return handleErrors(e, response);
        };
    }
}