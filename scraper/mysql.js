import mysql from 'mysql'


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cSOFpkPW_aabb",
  database: "AIMovieRecommender"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


