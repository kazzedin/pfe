const { adminModel } = require('../../Db/Acteurs/Admin');
const bcrypt = require('bcrypt');

async function insertDefaultAdmin() {
    try {
        const admin = await adminModel.findOne({ email: 'admin@usthb.com' });
        if (!admin) {
            const hashedPassword = await bcrypt.hash('admin', 10); // Make sure to await the hash function
            await adminModel.create({ email: 'admin@usthb.com', password: hashedPassword });
            console.log('Admin created successfully');
        } else {
            console.log('Admin already exists');
        }
    } catch (error) {
        console.error('Error inserting default admin:', error);
    }
}

module.exports = insertDefaultAdmin;
