import { response, Router } from "express";

import alunosController from "./controllers/alunos";
import cursosController from "./controllers/cursos";
import matriController from "./controllers/matricula";

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

// matricula
routes.put("/matricula/:id", matriController.update);

// des-matricula
routes.delete("/matricula/:id", matriController.delete);

export default routes;
