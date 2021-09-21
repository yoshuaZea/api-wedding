import express from 'express'
import routes from './routes/routes.mjs'
import cors from 'cors'

// Crear la conexión a la DB
import db from './config/db.mjs'

//Importar modelos
import './models/Invitacion.mjs'
import './models/Boda.mjs'
import './models/Relaciones.mjs'
import './models/Confirmacion.mjs'

// Crear el servidor
const app = express()

// Definir un dominio(s) para las peticiones en un arreglo
const whiteList = process.env.FRONTEND_URL.split(', ');

// Opciones de CORS para dar acceso o no a los endpoint
const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        // Revisar si la petición viene de un servidor que está en whiteList
        const existe = whiteList.some(dominio => dominio === origin);

        if(existe){
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'), false);
        }
    },
    methods: "GET,POST"
}

// Habilitar CORS
app.use(cors(corsOptions))

// Habilitar leer valores del body
app.use(express.json())

// Asignar el router
app.use('/', routes());

//Validar la conexión a la DB
db.authenticate()
    .then(() => console.log("Conexión DB exitosa"))
    .catch(error => console.error("No se pudo conectar a la DB", error));

//Sincronizar con la DB para crear modelos
db.sync({ force: false, alter: true })
    .then(() => console.log("Sincronización DB Exitosa"))
    .catch(error => console.error("No se pudo sincronizar la DB", error));

// Puerto de la app
const port = process.env.PORT || 4000
const host = process.env.HOST || '0.0.0.0'

// Arrancar servidor
app.listen(port, host, () => {
    console.log(`Servidor ejecutándose en el  ${host}:${port}`)
})