import Express from "express";
import tracer from "./datadog";
import { Schema, model, connect } from "mongoose";

tracer.use("express");

interface EnvironmentVariables {
  PORT?: string;
}

const Environment: EnvironmentVariables = process.env as EnvironmentVariables;
interface User {
  domainName: string;
  markdown: string;
}

const schema = new Schema<User>({
  domainName: { type: String, required: true },
  markdown: {type: String}
});

const UserModel = model<User>("AwesomeCollectionName", schema);

run().catch((err) => console.error(err));

async function run(): Promise<void> {
  await connect(
    "mongodb://myTester:123456@localhost:27017/test",
    { useNewUrlParser: true, useUnifiedTopology: true}
  );
  const app = Express();
  const port = parseInt(Environment.PORT || "8080", 10);
  app.use(Express.json());
  app.get("/", (req, res) => {
    const domainName: string = (req && req.headers && req.headers.host)
      .split(":")[0]
      .toLowerCase()
      .replace("www.", "");

    const data = new UserModel({
      domainName: domainName + Math.floor(Math.random() * 1000),
      markdown: `hello ${domainName + Math.floor(Math.random() * 1000)}`
    });
    data.save();
    // Lookup the page that belongs to this `Host` header
    // Retrieve page data, perhaps do auth to let them edit?
    // Insecure for now, allow all editing
    res.status(200).send(domainName);
  });
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
}
