const mysql = require('mysql');

// const Sequelize = require('sequelize');
//
// const sequelize = new Sequelize('bd_memoria','root','',{
//   host:'localhost',
//   dialect:'mysql'
// });

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb'
})

mysqlConnection.connect(function(err){
  if(err){
    console.log(err);
    return;
  }else{
    console.log("bd connected");
  }
});

module.exports = mysqlConnection;
