import express from 'express'
import 'dotenv/config'

import personne from './routes/personne.route.js'
import adresse from './routes/adresse.route.js'
import auth from 'basic-auth'

// configurer yup
const admin = { username: 'admin', password: 'admin' }
const app = express()

// Configuration de CORS(securité native qui se declenche quand 2 nom de domaine sont différent)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')// autorise toute les origines
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept') 
    next()
})
const basicAuth = (req, res, next) => {
   // const unknownUser = req.headers['authorization']
   const unknownUser = auth(req)
    console.log(unknownUser);
    const {name, pass} = unknownUser
    if (name!= admin.username || pass!= admin.password) {
       return res.sendStatus(401)
    }
    

    next()
}
// app.use(basicAuth)

// utiliser le middleware body-parser
app.use(express.json())


// configurer les ressources statiques
// app.use(express.static('public'))


// Mapping entre routes et le routeur
app.use("/personnes", basicAuth, personne)
app.use("/adresses", adresse)









const PORT = process.env.PORT || 5555

app.listen(PORT, () => {
    console.log(`Adresse serveur : http://localhost:${PORT}`);
})