import Express from 'express';
import tracer from './datadog';

tracer.use('express');

interface EnvironmentVariables {
    PORT?: string;
}

const Environment: EnvironmentVariables = process.env as EnvironmentVariables;

run().catch(err => console.error(err));

async function run(): Promise<void> {
  const app = Express();
  const port = parseInt(Environment.PORT || '8080', 10);
  app.use(Express.json());
  app.get("/", ( req, res ) => {
      const domainName: string = (req && req.headers && req.headers.host)
      .split(':')[0].toLowerCase().replace('www.', '');
      // Lookup the page that belongs to this `Host` header
      // Retrieve page data, perhaps do auth to let them edit?
      // Insecure for now, allow all editing
      res.status(200).send(domainName);
  });
  app.listen(port, () => {
      console.log(`server started at http://localhost:${ port }` );
  });
}
