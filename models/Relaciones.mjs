import Boda from './Boda.mjs'
import Invitacion from './Invitacion.mjs'

// RELACIONES INVITACIONES
Invitacion.belongsTo(Boda, {
    foreignKey: 'bodaId'
})

// RELACIONES CLIENTES
Boda.hasMany(Invitacion, {
    foreignKey: 'bodaId'
})