const mongoose = require('mongoose')
const marked = require('marked')
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
    }
})

module.exports = mongoose.model('Film', filmSchema)

