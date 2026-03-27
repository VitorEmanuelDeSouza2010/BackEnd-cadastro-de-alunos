import { response, Router } from "express";

import alunosController from "./controllers/alunos";
import cursosController from "./controllers/cursos";
import matriController from "./controllers/matricula";
import funciController from "./controllers/funcionarios";

const routes = Router();

routes.get("/", (request, response) => response.status(200).json({ success: true }));


// Rotas de alunos
routes.get("/alunos", alunosController.list);
//routes.get("/", (request, response) => 
//alunosController.list(request, response),
//);
routes.get("/alunos/:id", alunosController.getById);
routes.post("/alunos", alunosController.create);
//routes.post("/", (request, response) => 
//alunosController.create(request, response),
//);
routes.put("/alunos/:id", alunosController.update);
routes.delete("/alunos/:id", alunosController.delete);


// Rotas de cursos
routes.get("/cursos", cursosController.list);
//routes.get("/", (request, response) => 
//cursosController.list(request, response),
//);
routes.get("/cursos/:id", cursosController.getById);
routes.post("/cursos", cursosController.create);
//routes.post("/", (request, response) => 
//cursosController.create(request, response),
//);
routes.put("/cursos/:id", cursosController.update);
routes.delete("/cursos/:id", cursosController.delete);


// Fazer e desfazer matriculas
routes.post("/matricula/:id", matriController.create);
// matricula
routes.delete("/matricula/:id", matriController.delete);
// des-matricula


routes.get("/funcionarios", funciController.list);
//routes.get("/", (request, response) => 
//funcionariosController.list(request, response),
//);
routes.get("/funcionarios/:id", funciController.getById);
routes.post("/funcionarios", funciController.create);
//routes.post("/", (request, response) => 
//funcionariosController.create(request, response),
//);
routes.put("/funcionarios/:id", funciController.update);
routes.delete("/funcionarios/:id", funciController.delete);

export default routes;
