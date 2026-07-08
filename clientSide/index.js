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

const client = new todoService("localhost:50051", grpcLibrary.credentials.createInsecure());

client.getTodoList({}, (err, todos) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(todos);
})
