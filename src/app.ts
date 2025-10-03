import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

// application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  const name = "Hello World!";
  res.send(name);
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
