import { Request, Response, Router } from "express";

const educationRouter = Router();

educationRouter.get("/", (req: Request, res: Response) => {
  console.log(req, res);
});

educationRouter.get("/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

educationRouter.post("/create", (req: Request, res: Response) => {
  console.log(req, res);
});

educationRouter.put("/edit/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

educationRouter.delete("/delete/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

export default educationRouter;
