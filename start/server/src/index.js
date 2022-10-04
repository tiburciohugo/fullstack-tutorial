require("dotenv").config();
const { apolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("graphql-tools");
const { PORT } = process.env;
const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = createServer(apolloServer({ schema }));
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server,
      path: "/subscriptions"
    }
  );
});
