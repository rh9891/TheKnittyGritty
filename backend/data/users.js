import bcrypt from "bcryptjs";

const users = [
  {
    name: "Dorothy Zbornak",
    email: "dzbornak@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Sophia Petrillo",
    email: "spetrillo@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Blanche Devereaux",
    email: "bdevereaux@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Rose Nylund",
    email: "rnylund@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
