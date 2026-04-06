// Lista, Cria, Atualiza, Deleta ou pega um aluno pelo Id

import { Request, Response } from "express";

import {prisma} from "../../config/prisma";

import bcrypt from "bcrypt";
import { handleErrors } from "../helpers/handleErrors";
import jwt from "jsonwebtoken";

export default {
    login: async (request: Request, response: Response) => {
        try {
            const {email, senha} = request.body;

            const employee = await prisma.funcionarios.findUnique({
                where: {
                    email,
                },
            });

            if (!employee || !bcrypt.compareSync(senha, employee.senha)) {
                return response.status(404).json("Email e/ou senha inválidos");
            }

            const token = jwt.sign(employee, process.env.JWT_SECRET!, {
                expiresIn: "1d",
            });

            return response.status(200).json({access_token: token });
        } catch (e) {
            return handleErrors(e, response);
        }
    },

    list: async (request: Request, response: Response) => {
        try {
            const employees = await prisma.funcionarios.findMany();
            return response.status(200).json(employees);
        } catch (e) {
            return handleErrors(e, response);
            }
        },
        
        create: async (request: Request, response: Response) => {
            try {
            const { nome, senha, admin, email, user } = request.body;

            if(!user.admin) {
                return response.status(403).json("Não autorizado");
            };

            if(!nome || !email || !senha) {
                return response.status(400).json("Dados do funcionário incompletos");
            };

            const employee = await prisma.funcionarios.create({
                data: {
                    nome,
                    email,
                    senha: bcrypt.hashSync(senha, +process.env.BCRYPT_ROUNDS!),
                    admin,
                },
            });

            return response.status(201).json(employee);
        } catch (e) {
            return handleErrors(e, response);
        };
    },
    
    getById: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const employee = await prisma.funcionarios.findUnique({
                where: {
                    id: +id,
                },
            });
            return response.status(200).json(employee);
        } catch (e) {
            return handleErrors(e, response);
        };
    },
    
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, admin, email, user} = request.body;

            if(!user.admin && user.id !== +id) {
                return response.status(403).json("Não autorizado");
            }
            
            const employee = await prisma.funcionarios.update({
                data: {
                    nome,
                    email,
                    admin: user.admin ? admin : false,
                },
                where: {
                    id: +id
                },
            });
            
            return response.status(200).json(employee);
        } catch (e) {
            return handleErrors(e, response);
        };
    },
    
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { user } = request.body;

            if(!user.admin) {
                return response.status(403).json("Não autorizado");
            };
            
            const employee = await prisma.funcionarios.delete({
                where: {
                    id: +id
                },
            });
            
            return response.status(200).json(employee);
        } catch (e) {
            return handleErrors(e, response);
        };
    }
};