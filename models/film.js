const mongoose = require('mongoose')
const slugify = require('slugify')

const filmSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    realisateur: {
        type: String
    },
    date_de_sortie: {
        type: String
    },
    description: {
        type: String
    },
    affiche: {
        type: String
    },
    statut: {
        type: String
    },
    date_film_regarde: {
        type: String
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

filmSchema.pre('validate', function(next) {
    if (this.nom){
        this.slug = slugify(this.nom, { lower: true, strict: true})
    }

    next()
})

module.exports = mongoose.model('Film', filmSchema)

