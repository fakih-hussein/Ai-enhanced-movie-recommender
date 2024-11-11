import mysql from 'mysql'
import { readFileSync } from "fs";


const jsondata = readFileSync('output1.json', 'utf8');
const movies = JSON.parse(jsondata);
//console.log(jsonData);


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cSOFpkPW_aabb",
  database: "AIMovieRecommender"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  for (let movie of movies){

  let sql = `INSERT INTO movies (name, genre, duration, description, director, imageLink) VALUES (?,?,?,?,?,?)`;
  const values = [
    movie.name,
    movie.genre,
    movie.duration,
    movie.description,
    movie.director,
    movie.imageLink
  ];
   con.query(sql, values, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");

  });

   
}

});














