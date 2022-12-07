// const log=console.log
/* ------------------------------------------ */
const createDb = (req, res) => {
    let sql = "create database scrape";
    db.query(sql, (err, response) => {
      if (err) {
        throw err;
      }
      console.log("res");
      // response.send("database createed");
    });
    res.send("database createed");
  };
  // create table  ----------------------------
  const createTable = (req, res) => {
    let sql = `CREATE TABLE haraj(
          id int AUTO_INCREMENT,
          authorUsername VARCHAR(255),
          phone  VARCHAR(255),
          pageno int,
          postid VARCHAR(255),
          posttitle VARCHAR(255),
          city  VARCHAR(255),
          postdate int,
          updatedate int,
          authorid VARCHAR(255), PRIMARY KEY (id))`;
    db.query(sql, (err, res) => {
      if (err) {
        throw err;
      }
      console.log("res");
    });
    res.send("TABLE createed");
  };
  