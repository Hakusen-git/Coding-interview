import "reflect-metadata";
import { buildSchema } from "type-graphql";
import express from "express";
import { TodoResolver } from "./resolvers/todoResolver";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

const main = async () => {
  const app = express();

  app.use(cors());
  const httpServer = createServer(app);

  const schema = await buildSchema({
    resolvers: [TodoResolver],
    validate: false,
    dateScalarMode: "isoDate",
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({
    schema: schema,
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),

      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const PORT = 8000;

  httpServer.listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
  );
};

main().catch((err) => console.log(err));
