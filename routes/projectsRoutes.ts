import { Request, Response, Router } from "express";

const projectsRouter = Router();

projectsRouter.get("/", (req: Request, res: Response) => {
  console.log(req, res);
});

projectsRouter.get("/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

projectsRouter.post("/create", (req: Request, res: Response) => {
  console.log(req, res);
});

projectsRouter.put("/edit/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

projectsRouter.delete("/delete", (req: Request, res: Response) => {
  console.log(req, res);
});

export default projectsRouter;
