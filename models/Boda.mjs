import Sequelize from 'sequelize'
import db from '../config/db.mjs'
// import Invitacion from './Invitacion.mjs'

const Boda = db.define('boda', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    cliente: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: true
    },
    fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
}, {
    Sequelize,
    freezeTableName: true,
})

// Boda.hasMany(Invitacion, {
//     foreignKey: 'cliente_id'
// })

export default Boda 