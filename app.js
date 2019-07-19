const express = require('express');
const bodyParser =  require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');




const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(bodyParser.json());

// temporaly
const todos = [];

// graphql endpoint
app.use('/graphql', graphqlHttp({
    schema:buildSchema(`
        type Todo{
            _id: ID!
            title: String!
            description: String!
            date: String!
        }

        input Todonput {
            title: String!
            description: String!
            date: String!
        }

        type RootQuery{
            todos: [Todo!]!
        }

        type RootMutation {
            createTodo(todoInput: TodoInput): Todo
            deleteTodo(index: index): Todo
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        todos: () => {
            return todos;
        },
        createTodo: (args) => {
            const todo = {
                _id: Math.random().toString(),
                title: args.todoInput.title,
                description: args.todoInput.description,
                datte: args.todoInput.date
            };
            todos.push(todo);
            return todo;
        },
        deleteTodo: (args) => {
            
            todos.splice(args.index);
            return todo;
        }

    },
    graphiql: true
}));

app.listen(port, console.log(`app listening on port ${port}`));