import { validationResult } from 'express-validator'
import Invitacion from '../models/Invitacion.mjs'
import { v4 as uuid } from 'uuid'

class Invitados {
    crearInvitacion = async (req, res, next) => {

        // Verificar si hay errores
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(422).json(errors.array())
        }

        try {
            // Extraer los datos para crear el objeto
            const { nombre, adultos, escuincles} = req.body

            // Crear el objeto de invitado
            await Invitacion.create({
                uuid: uuid(),
                nombre,
                adultos,
                escuincles
            })

            // Objeto de respuesta
            const response = { 
                message: 'Invitación creada exitosamente'
            }

            // Retornar respuesta
            res.status(200).json(response)

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    verificarInvitacion = async(req, res) => {
        // Extraer uuid
        const { uuid } = req.params

        // Verificar si hay errores
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(422).json(errors.array())
        }

        try {
            // Buscar la invitación
            const invitacion = await Invitacion.findOne({ 
                where: { uuid: uuid },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            if(!invitacion){
                return res.status(404).json({ message: 'No se encontró la invitación o no es válida' })
            }

            return res.json(invitacion)

        } catch (error) {
            // console.log(error)
            return res.status(500).json(error)
        }
    }

    confirmarInvitacion = async(req, res) => {
        // Extraer uuid
        const { uuid } = req.params

        // Verificar si hay errores
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(422).json(errors.array())
        }

        try {
            // Buscar la invitación
            const invitacion = await Invitacion.findOne({ 
                where: { uuid: uuid },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })

            if(!invitacion){
                return res.status(404).json({ message: 'No se encontró la invitación' })
            }

            // Extraer valores
            const { adultos, escuincles } = req.body
            
            // Guardar cambios
            invitacion.adultosConfirmados = adultos
            invitacion.escuinclesConfirmados = escuincles
            invitacion.confirmado = true
            invitacion.save()

            // Objeto de respuesta
            const response = { 
                message: 'Confirmación exitosa',
                confirmado: true
            }

            // Retornar respuesta
            res.status(200).json(response)

        } catch (error) {
            // console.log(error)
            return res.status(500).json(error)
        }
    }
}

const invitados = new Invitados
export default invitados