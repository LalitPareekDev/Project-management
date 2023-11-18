const bcrypt = require('bcryptjs');

const encrypt = async (value) => {
    try {
        let salt = await bcrypt.genSalt(10);
        return bcrypt.hashSync(value, salt);    
    } catch(error) {
        console.log(error);
    }
}

const verify = (hash, value) => {
    try {
        return bcrypt.compareSync(value, hash);
    } catch(error) {
        console.log(error);
    }
}

module.exports = { encrypt, verify }