import { ApolloServer, gql } from 'apollo-server';
import axios from 'axios';

//Type definitions(schemas)

const typeDefs = gql`
    type Query{
       posts: [Post]!
       users: [User]!
    }

    type Post{
        id: ID!,
        title: String!,
        author: String!
    }

    type User{
        id: ID!,
        firstName: String!,
        companyId: String!
    }

`
//Resolvers

const resolvers = {
    Query:{
        posts(){
            return axios.get(`http://localhost:3000/posts`)
            .then(res => res.data);

        },
        users(){
            return axios.get(`http://localhost:3000/users`)
            .then(res => res.data);

        }
    }
}

const server = new ApolloServer({
    typeDefs:typeDefs,
    resolvers:resolvers
})

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });