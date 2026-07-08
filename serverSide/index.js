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
    {id: 1, title: "todo 1", content: "todo 1 content"},
    {id: 2, title: "todo 2", content: "todo 2 content"}
];

server.addService(todoService.service, {
    getTodoList: (call, callback) => {
        callback(null, {
            todos
        })
    }
})

server.bindAsync("0.0.0.0:50051", grpcLibrary.ServerCredentials.createInsecure(), () => {
    console.log("server started");
    server.start();
})