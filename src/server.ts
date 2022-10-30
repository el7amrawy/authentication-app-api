import express from "express";

const app: express.Application = express();

const port = 5000;

app.listen(port, () => {
  process.stdout.write(`server started at http://localhost:${port}\n`);
});
