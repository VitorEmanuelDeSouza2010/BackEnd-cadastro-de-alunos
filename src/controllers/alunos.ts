import { Request, Response } from "express";

import {prisma} from "../../config/prisma";
import prismaErrorCodes from "../../config/prismaErrorCodes.json";

import { Prisma } from "../../generated/prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/client";

export default {
    list: async (request: Request, response: Response) => {
        try {
            const users = await prisma.alunos.findMany({
                include: { cursos: true },
            });
            
            return response.status(200).json(users);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof PrismaClientValidationError){
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
            };
            return response.status(500).json("Unkown error. try again later");
        };
    },

    create: async (request: Request, response: Response) => {
        try {
            const { nome, idade, cpf, email } = request.body;
            const users = await prisma.alunos.create({
                data: {
                    nome,
                    idade,
                    cpf,
                    email,
                },
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

    getById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const user = await prisma.alunos.findUnique({
                where: {
                    id: +id,
                },
                include: { cursos: true },
            });
            return response.status(200).json(user);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof PrismaClientValidationError){
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
            };
            return response.status(500).json("Unkown error. try again later");
        };
    },

    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, idade, cpf, email } = request.body;
            
            const user = await prisma.alunos.update({
                data: {
                    nome,
                    idade,
                    email,
                    cpf
                },
                where: { id: +id },
            });

            return response.status(200).json(user);
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
            const { id } = request.params;
            
            const user = await prisma.alunos.delete({
                where: {
                    id: +id
                }
            })
            
            return response.status(200).json(user);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError || e instanceof PrismaClientValidationError){
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message);
            };
            return response.status(500).json("Unkown error. try again later");
        };
    }
};