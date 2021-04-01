import Sequelize from 'sequelize'
import dotenv from 'dotenv'
import db from '../config/db.mjs'

dotenv.config({ path: '.env'})

const Invitacion = db.define('Invitacion', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uuid: Sequelize.UUID,
    nombre: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    adultos: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    escuincles: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    adultosConfirmados: Sequelize.TINYINT,
    escuinclesConfirmados: Sequelize.TINYINT,
    confirmado: {
        type: Sequelize.BOOLEAN,
        default: 0
    }
})

export default Invitacion 