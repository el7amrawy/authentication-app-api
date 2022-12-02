import express from "express";
import routes from "./api";
import cors from "cors";

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  process.stdout.write(`server started at http://localhost:${port}\n`);
});

export default app;
