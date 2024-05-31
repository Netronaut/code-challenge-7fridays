import products from "@/lib/products.json";
import { sortBy } from "@/lib/util";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";

const resolvers = {
  Query: {
    health: () => Date.now().toString(),
    products: () => products.sort(sortBy("id")),
    product: (_parent: any, args: { id: string }) =>
      products.find((product) => product.id === parseInt(args.id)),
  },
};

const typeDefs = gql`
  type Product {
    id: ID!
    name: String
    price: Float
    description: String
  }

  type Query {
    health: String
    product(id: ID): Product
    products: [Product]
  }
`;

export const server = new ApolloServer({
  resolvers,
  typeDefs,
});
