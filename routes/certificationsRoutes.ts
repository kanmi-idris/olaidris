import { Request, Response, Router } from "express";

const certificationsRouter = Router();

certificationsRouter.get("/", (req: Request, res: Response) => {
  console.log(req, res);
});

certificationsRouter.get("/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

certificationsRouter.post("/create", (req: Request, res: Response) => {
  console.log(req, res);
});

certificationsRouter.put("/edit/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

certificationsRouter.delete("/delete/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

export default certificationsRouter;
