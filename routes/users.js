import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const users = [
  {
    id: uuidv4(),
    firstName: "John",
    lastName: "Doe",
    email: "john@exemplo.com",
  },
  {
    id: uuidv4(),
    firstName: "Jane",
    lastName: "jackson",
    email: "jane@exemplo.com",
  },
  {
    id: uuidv4(),
    firstName: "Jim",
    lastName: "carrey",
    email: "jim@exemplo.com",
  },
];

router.get("/", (req, res) => {
  res.send(users);
});

router.post("/", (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuidv4() });
  res.send(`User with the name ${user.firstName} added to the database!`);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    let foundUser = users.find((user) => user.id === id);
    res.send(foundUser);
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id !== id); 
    res.send(`${id} deleted successfully from database`);
});

router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const user = users.find((user) => user.id === id);
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    res.send(`User with the id ${id} has been updated`);
});

export default router;


