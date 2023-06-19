import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    lastname: "Admin",
    email: "admin@admin.admin",
    phone: "01234567890",
    password: bcrypt.hashSync("daniel", 10),
    isAdmin: true,
  },
  {
    name: "Kasia",
    lastname: "Kasia",
    email: "kasia@kasia.pl",
    phone: "01123456789",
    password: bcrypt.hashSync("password123!", 10),
    isAdmin: true,
  },
  {
    name: "Daniel",
    lastname: "Daniel",
    email: "daniel@daniel.pl",
    phone: "00123456789",
    password: bcrypt.hashSync("101010", 10),
    isAdmin: true,
  },
];

export default users;
