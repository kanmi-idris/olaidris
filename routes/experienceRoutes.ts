import { Request, Response, Router } from "express";

const experienceRouter = Router();

experienceRouter.get("/", (req: Request, res: Response) => {
  console.log(req, res);
});

experienceRouter.get("/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

experienceRouter.post("/create", (req: Request, res: Response) => {
  console.log(req, res);
});

experienceRouter.put("/edit/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

experienceRouter.delete("/delete/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

export default experienceRouter;
