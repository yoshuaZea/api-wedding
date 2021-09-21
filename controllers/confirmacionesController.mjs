import { validationResult } from 'express-validator'
import Boda from '../models/Boda.mjs'
import Confirmacion from '../models/Confirmacion.mjs'

class Confirmaciones {

    confirmarInvitacion = async(req, res) => {
        // Extraer uuid
        const bodaId = req.header('x-wedding-header')

        // Verificar si hay errores
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(422).json(errors.array())
        }

        try {
            // Vacuna
            const tipoVacuna = [
                { id: 1, value: 'Primer dosis' },
                { id: 2, value: 'Segunda dosis' },
                { id: 3, value: 'Única dosis' },
                { id: 4, value: 'No cuento con ninguna dosis' },
            ]

            // Boda Id
            req.body.bodaId = bodaId
            req.body.vacuna = tipoVacuna.find(vacuna => vacuna.id == req.body.vacuna)
            const body = req.body
            const slug = req.params.slug

            // Buscar info de la boda por slug
            const boda = await Boda.findOne({
                where: {
                    id: bodaId,
                    slug
                }
            })

            if(!boda){
                return res.status(404).json({ message: 'No se encontró la invitación' })
            }

            // Destructuring sobre el request body
            const { nombre, apellidos, email, vacuna: { value }, asistencia, fiebre_tos, dolor_cabeza, problemas_respirar, dolor_muscular } = body

            // Crear la confirmación
            const confirmacion = await Confirmacion.create({
                bodaId,
                nombre,
                apellidos,
                email,
                vacuna: value,
                asistencia,
                fiebreTos: fiebre_tos,
                dolorCabeza: dolor_cabeza,
                problemasRespirar: problemas_respirar,
                dolorMuscular: dolor_muscular
            })

            // Objeto de respuesta
            const response = { 
                message: 'Confirmación exitosa',
                confirmado: true
            }

            // Retornar respuesta
            res.status(200).json({ confirmacion, response })

        } catch (error) {
            // console.log(error)
            return res.status(500).json(error)
        }
    }
}

const confirmaciones = new Confirmaciones
export default confirmaciones