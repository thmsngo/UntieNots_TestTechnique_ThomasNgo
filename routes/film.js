const express = require('express')
const Film = require('./../models/film')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('films/new')
})
router.get('/:id', async (req, res) => {
    const film = await Film.findById(req.params.id)
    if (film == null) res.redirect('/')
    res.render('films/show', {film:film})
});
router.post('/', async (req, res) => {

    const ladate = new Date();
    const date = ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();

    let film = null

    if(req.body.statut == 'Vu'){
        film = new Film({
            nom: req.body.nom,
            genre: req.body.genre,
            realisateur: req.body.realisateur,
            date_de_sortie: req.body.date_de_sortie,
            description: req.body.description,
            statut: req.body.statut,
            date_film_regarde: date
        })
    }else{
        film = new Film({
            nom: req.body.nom,
            genre: req.body.genre,
            realisateur: req.body.realisateur,
            date_de_sortie: req.body.date_de_sortie,
            description: req.body.description,
            statut: req.body.statut
        })
    }


    try{
        film = await film.save()
        res.redirect(`/films/${film.id}`)
    } catch(e){
        res.render('films/new', {film : film})
    }
});

router.delete('/:id', async (req, res) => {
    await Film.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

module.exports = router
