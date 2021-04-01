import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config({ path: '.env'})

const connectDB = new Sequelize(
    process.env.DB_DATABSE, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_CONNECTION,
        timezone: '-06:00',
        logging: false,
        define: {
            timestamps: true
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
        
    }
)

export default connectDB