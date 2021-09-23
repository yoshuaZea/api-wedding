import Sequelize from 'sequelize'
import db from '../config/db.mjs'
import Boda from './Boda.mjs'

const Confirmacion = db.define('confirmaciones', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    bodaId: {
        type: Sequelize.INTEGER.UNSIGNED
    },
    nombre: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    apellidos: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: true,
        validate: {
            isEmail: {
                msg: 'Agrega un correo válido'
            },
            notEmpty: {
                msg: 'El email no puede ser vacío'
            }
        }
    },
    vacuna: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    asistencia: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: null
    },
    fiebreTos: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: null
    },
    dolorCabeza: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: null
    },
    problemasRespirar: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: null
    },
    dolorMuscular: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: null
    },
    reservacion: {
        type: Sequelize.STRING,
        allowNull: true,
        default: null
    }
}, {
    Sequelize,
    freezeTableName: true,
})

// RELACIONES CLIENTES
Confirmacion.belongsTo(Boda, {
    foreignKey: 'bodaId'
})

export default Confirmacion 