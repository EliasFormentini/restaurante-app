import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurante_db",
});

export default connection;
