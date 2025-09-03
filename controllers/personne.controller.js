import yup from '../config/yup.config.js'
import personneRepository from '../repositories/personne.repository.js'

const personneSchema = yup.object().shape({
    nom: yup
        .string()
        .required()
        .matches(/^[A-Z]{1}.{2,19}$/, "Le nom doit commencer par une majuscule et comporter entre 3 et 20 lettres"),
    prenom: yup
        .string()
        .min(3, (args) => `Le prénom doit contenir au moins ${args.min} caractères, valeur saisie : ${args.value} `)
        .max(20),
    age: yup
        .number()
        .required()
        .positive()

})

const show = async (req, res, next) => {
    const personnes = await personneRepository.findAll()
    if (personnes) {

    } else {


    }
}
const add = async (req, res, next) => {

    personneSchema
        .validate(req.body, { abortEarly: false })
        .then(async () => {
            req.session.firstname = req.body.prenom
            const p = await personneRepository.save(req.body)
            if (p == null) {
                const personnes = await personneRepository.findAll()

            } else {
                console.log(p);
            }
        })
        .catch(async err => {
            console.log(err);
            const personnes = await personneRepository.findAll()

        })



}
const remove = async (req, res, next) => {
    const id = req.params.id
    await personneRepository.deleteById(id)
}



export default { show, add, remove }