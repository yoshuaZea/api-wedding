import express from 'express'
import { check } from 'express-validator'

// Importar controladores
import Invitados from '../controllers/invitadosController.mjs'
import Confirmaciones from '../controllers/confirmacionesController.mjs'

// Crear router
const router = express.Router();

export default function() {
    // HOME
    router.get('/', Invitados.test)

    // INVITADOS
    router.post('/crear-invitacion', 
        [
            check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
            check('adultos').notEmpty().withMessage('Cuantos adultos es obligatorio').isNumeric().withMessage('No es un valor numérico'),
            check('peques').notEmpty().withMessage('Cuantos niños es obligatorio').isNumeric().withMessage('No es un valor numérico'),
        ],
        Invitados.crearInvitacion
    )

    router.get('/invitacion/:uuid', 
        [
            check('uuid').isUUID().withMessage('El número de invitación es incorrecto')
        ],
        Invitados.verificarInvitacion
    )

    router.post('/invitacion/:uuid', 
        [
            check('uuid').isUUID().withMessage('El número de invitación es incorrecto'),
            check('adultos').notEmpty().withMessage('Cuantos adultos es obligatorio').isNumeric().withMessage('No es un valor numérico'),
            check('peques').notEmpty().withMessage('Cuantos niños es obligatorio').isNumeric().withMessage('No es un valor numérico'),
        ],
        Invitados.confirmarInvitacion
    )

    // CONFIRMACIONES
    router.post('/confirmar-asistencia/:slug',
        [
            check('nombre').notEmpty().withMessage('Tu nombre es obligatorio'),
            check('apellidos').notEmpty().withMessage('Tus apellidos son obligatorios'),
            check('email').isEmail().withMessage('No es un email válido'),
            check('vacuna').notEmpty().withMessage('Debes seleccionar una opción').isIn([1,2,3,4,5]).withMessage('La opción seleccionada es inválida'),
            check('asistencia').isBoolean(),
            check('fiebre_tos').toBoolean(),
            check('dolor_cabeza').toBoolean(),
            check('problemas_respirar').toBoolean(),
            check('dolor_muscular').toBoolean(),
            check('reservacion').isString().optional({ nullable: true })
        ],
        Confirmaciones.confirmarInvitacion
    )

    return router
}