import express from 'express'
import { check } from 'express-validator'

// Importar controladores
import Invitados from '../controllers/invitadosController.mjs'

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

    return router
}