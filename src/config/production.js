//Configuration of Database for Production stage 
const connect_db = {
    'mongo_host' : '127.0.0.1',
    'mongo_port' : '27017',
    'mongo_db' : 'doctor_db'
}
const jwtSecretKey = "sgjhgf7fgdfgdfgy897rtihgrworkgnfgxbcvbcndwerwhhfhncvxhkmfhjfgjsdhfbgjshvgjhdfsjhgjhsdfgjjsdhfgdsjfhdgsfjhhjfgshgfs";
module.exports = { connect_db, jwtSecretKey };