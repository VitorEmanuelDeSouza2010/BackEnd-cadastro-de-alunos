import { response, Router } from "express";
import  {authentication} from "./middlewares/authentication";

import alunosController from "./controllers/alunos";
import cursosController from "./controllers/cursos";
import matriController from "./controllers/matricula";
import funciController from "./controllers/funcionarios";

const routes = Router();

routes.get("/", (request, response) => response.status(200).json({ success: true }));


// Rotas de alunos
routes.get("/alunos", authentication, alunosController.list);
//routes.get("/", (request, response) => 
//alunosController.list(request, response),
//);
routes.get("/alunos/:id", authentication, alunosController.getById);
routes.post("/alunos", authentication, alunosController.create);
//routes.post("/", (request, response) => 
//alunosController.create(request, response),
//);
routes.put("/alunos/:id", authentication, alunosController.update);
routes.delete("/alunos/:id", authentication, alunosController.delete);


// Rotas de cursos
routes.get("/cursos", authentication, cursosController.list);
//routes.get("/", (request, response) => 
//cursosController.list(request, response),
//);
routes.get("/cursos/:id", authentication, cursosController.getById);
routes.post("/cursos", authentication, cursosController.create);
//routes.post("/", (request, response) => 
//cursosController.create(request, response),
//);
routes.put("/cursos/:id", authentication, cursosController.update);
routes.delete("/cursos/:id", authentication, cursosController.delete);


// Fazer e desfazer matriculas
routes.post("/matricula/:id", authentication, matriController.create);
// matricula
routes.delete("/matricula/:id", authentication, matriController.delete);
// des-matricula

routes.post("/funcionarios/login", funciController.login);
routes.get("/funcionarios", authentication, funciController.list);
//routes.get("/", (request, response) => 
//funcionariosController.list(request, response),
//);
routes.get("/funcionarios/:id", authentication, funciController.getById);
routes.post("/funcionarios", authentication, funciController.create);
//routes.post("/", (request, response) => 
//funcionariosController.create(request, response),
//);
routes.put("/funcionarios/:id", authentication, funciController.update);
routes.delete("/funcionarios/:id", authentication, funciController.delete);

export default routes;
