const fs = require("fs/promises");
const express = require("express");

const PORT = 3005;
let db = { last_id: 0, users: {} };

const server = express();
server.use(express.json());

server.get("/user/:id", (req, res) => {
    // find the user
    const user = db.users[req.params.id];
    if (!user) {
        res.statusCode = 404;
        return res.end();
    }

    // return the user
    return res.json(user);
});

server.post("/user", async (req, res) => {
    // get last id & add 1 to it
    db.last_id += 1;

    // create new user
    const user = { id: db.last_id, name: req.body.name, age: req.body.age, department: req.body.department };
    db.users[db.last_id] = user;

    // save it to file
    await fs.writeFile("./db.json", JSON.stringify(db), { encoding: "utf-8" });

    // return new user
    return res.json(user);
});

server.put("/user/:id", async (req, res) => {
    // find the user
    const user = db.users[req.params.id];
    if (!user) {
        res.statusCode = 404;
        return res.end();
    }

    // update the user
    user.name = req.body.name || user.name;
    user.age = req.body.age || user.age;
    user.department = req.body.department || user.department;

    // save it to file
    await fs.writeFile("./db.json", JSON.stringify(db), { encoding: "utf-8" });

    // return updated user
    return res.json(user);
});

server.delete("/user/:id", async (req, res) => {
    // find the user
    const user = db.users[req.params.id];
    if (!user) {
        res.statusCode = 404;
        return res.end();
    }

    // delete the user
    delete db.users[req.params.id];

    // save it to file
    await fs.writeFile("./db.json", JSON.stringify(db), { encoding: "utf-8" });

    return res.end();
});

const bootstrap = async () => {
    await fs
        .readFile("./db.json", "utf-8")
        .then((v) => {
            db = JSON.parse(v);
            console.log(`DB loaded successfully`);
        })
        .catch((e) => console.error(e));

    server.listen(PORT, () => console.log(`listening on port ${PORT}`));
};
bootstrap();
