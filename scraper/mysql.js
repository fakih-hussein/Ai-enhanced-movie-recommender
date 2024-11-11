import mysql from 'mysql'
import { readFileSync } from "fs";


const data = readFileSync('output1.json', 'utf8');
const jsonData = JSON.parse(data);
//console.log(jsonData);


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cSOFpkPW_aabb",
  database: "AIMovieRecommender"
});

con.connect(function(err) {
  if (err) throw err;
  
  //var sql = "INSERT INTO movies (name, genre, duration, description, director, imageLink) VALUES ('','','','','','')";
  console.log("Connected!");
});













