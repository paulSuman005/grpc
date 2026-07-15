const { prompt, rl } = require("./cli");
const todoService = require("./services");

async function menu() {
    while (true) {
        console.log("\n===== TODO CLI =====");
        console.log("1. Get All Todos");
        console.log("2. Get Todo");
        console.log("3. Create Todo");
        console.log("4. Delete Todo");
        console.log("5. Exit");

        const choice = await prompt("\nChoose: ");

        switch (choice) {
            case "1": {
                const todos = await todoService.getTodos();
                console.table(todos);
                break;
            }

            case "2": {
                const id = Number(await prompt("Id: "));
                const todo = await todoService.getTodo(id);
                console.log(todo);
                break;
            }

            case "3": {
                const id = Number(await prompt("Id: "));
                const title = await prompt("Title: ");
                const content = await prompt("Content: ");

                const todo = await todoService.createTodo({
                    id,
                    title,
                    content,
                });

                console.log("Created:");
                console.log(todo);
                break;
            }

            case "4": {
                const id = Number(await prompt("Id: "));
                await todoService.deleteTodo(id);
                console.log("Deleted");
                break;
            }

            case "5":
                rl.close();
                process.exit(0);

            default:
                console.log("Invalid Choice");
        }
    }
}

menu();