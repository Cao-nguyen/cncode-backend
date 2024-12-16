const mongoose = require('mongoose');

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Kết nối thành công tới MongoDB')
    } catch (error) {
        console.error('Kết nối thất bại:', error.message)
    }
};
