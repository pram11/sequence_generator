const fs = require("fs");
const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: "localhost",
    user: "user",
    password: "password",
    connectionLimit: 5,
});

const jsonFile = fs.readFileSync("./dbdata.json", "utf8");
const data = JSON.parse(jsonFile);
console.log("data: ", data);
const dbProcess = async () => {
    try {
        const conn = await pool.getConnection();

        data.forEach(async (element) => {
            const res = await conn.query(
                `create sequence lms.${element.table_name} start with ${element.count} increment by 1;`
            );
            console.log("res:", res);
        });
        await conn.end();
        console.log("end");
    } catch (error) {
        console.log("error: ", error);
    }
};
dbProcess();
