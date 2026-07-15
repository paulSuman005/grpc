const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const prompt = (question) => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

module.exports = {
    prompt,
    rl,
};