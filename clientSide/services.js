const { client } = require("./client");

exports.getTodos = () => {
    return new Promise((resolve, reject) => {
        client.getTodoList({}, (err, res) => {
            if (err) return reject(err);
            resolve(res.todos);
        });
    });
};

exports.createTodo = (todo) => {
    return new Promise((resolve, reject) => {
        client.createTodo(todo, (err, res) => {
            if (err) return reject(err);
            resolve(res);
        });
    });
};

exports.deleteTodo = (id) => {
    return new Promise((resolve, reject) => {
        client.deleteTodo({ id }, (err, res) => {
            if (err) return reject(err);
            resolve(res);
        });
    });
};

exports.getTodo = (id) => {
    return new Promise((resolve, reject) => {
        client.getTodo({ id }, (err, res) => {
            if (err) return reject(err);
            resolve(res);
        });
    });
};