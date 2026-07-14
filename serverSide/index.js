const protoLoader = require('@grpc/proto-loader');
const grpcLibrary = require('@grpc/grpc-js');

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}

const packageDefinition = protoLoader.loadSync("./todo.proto", options);
const packageObject = grpcLibrary.loadPackageDefinition(packageDefinition);

const todoService = packageObject.TodoServices;

const server = new grpcLibrary.Server();

const todos = [
    { id: 1, title: "todo 1", content: "todo 1 content" },
    { id: 2, title: "todo 2", content: "todo 2 content" }
];

server.addService(todoService.service, {
    getTodoList: (call, callback) => {
        callback(null, {
            todos
        })
    },

    createTodo: (call, callback) => {
        const newTodo = call.request;
        todos.push(newTodo);
        console.log(todos);
        callback(null, newTodo);
    },

    getTodo: (call, callback) => {
        const todoId = call.request.id;
        const todo = todos.find((e) => e.id === todoId);
        if (!todo) {
            return callback({
                code: grpcLibrary.status.NOT_FOUND,
                message: "Todo not found!"
            })
        }
        callback(null, todo);
    },

    deleteTodo: (call, callback) => {
        const todo = call.request;
        const index = todos.findIndex(ele => ele.id === todo.id);
        if (index === -1) {
            return callback({
                code: grpcLibrary.status.NOT_FOUND,
                message: "Todo not found",
            });
        }
        todos.splice(index, 1);
        callback(null, {});
    }
})

server.bindAsync("0.0.0.0:50051", grpcLibrary.ServerCredentials.createInsecure(), () => {
    console.log("server started");
    server.start();
})