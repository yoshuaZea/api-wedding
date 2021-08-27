import Sequelize from 'sequelize'
import db from '../config/db.mjs'
// import Cliente from './Cliente.mjs'

const Invitacion = db.define('invitaciones', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    bodaId: {
        type: Sequelize.INTEGER.UNSIGNED
    },
    uuid: Sequelize.UUID,
    saludo: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    nombre: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    adultos: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    peques: {
        type: Sequelize.TINYINT,
        allowNull: false
    },
    adultosConfirmados: Sequelize.TINYINT,
    pequesConfirmados: Sequelize.TINYINT,
    confirmado: {
        type: Sequelize.BOOLEAN,
        default: 0
    }
}, {
    Sequelize,
    freezeTableName: true,
})

// // RELACIONES
// Invitacion.belongsTo(Cliente, {
//     foreignKey: 'boda_Id'
// })

export default Invitacion 