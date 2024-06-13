import { Request, Response, Router } from "express";

const accoladesRouter = Router();

accoladesRouter.get("/", (req: Request, res: Response) => {
  console.log(req, res);
});

accoladesRouter.get("/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

accoladesRouter.post("/create", (req: Request, res: Response) => {
  console.log(req, res);
});

accoladesRouter.put("/edit/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

accoladesRouter.delete("/delete/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

export default accoladesRouter;
