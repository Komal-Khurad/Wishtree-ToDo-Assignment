const bcrypt = require('bcrypt');

const SALT_ROUND = 10;

module.exports = {
    async hashPassword(password)
    {
        return await bcrypt.hash(password, SALT_ROUND)
    },

    async comparePassword(password, hash)
    {
        console.log('in util service ', hash);
        console.log('in util service ', password);

        return await bcrypt.compare(password, hash);    
    }
    

}