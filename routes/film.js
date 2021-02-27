const express = require('express')
const film = require('./../models/film')
const Film = require('./../models/film')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('films/new'), {film: new Film()}
});

router.get('/edit/:id', async (req, res) => {
    const film = await Film.findById(req.params.id)
    res.render('films/edit', {film:film})
})

router.get('/:slug', async (req, res) => {
    const film = await Film.findOne({ slug: req.params.slug })
    if (film == null) res.redirect('/')
    res.render('films/show', {film:film})
}); 

router.post('/', async (req, res, next) => {
    req.film = new Film()
    next()
}, saveFilmAndRedirect('new'));

router.put('/:id', async (req, res, next) => {
    req.film = await Film.findById(req.params.id)
    next()
}, saveFilmAndRedirect('edit'));

router.delete('/:id', async (req, res) => {
    
    await Film.findByIdAndDelete(req.params.id)
    res.redirect('/')
});

function saveFilmAndRedirect(path) {
    return async (req, res) =>{
        let film = req.film

        const ladate = new Date();
        const date = ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear();


        if(req.body.statut == 'Vu'){
            
            film.nom = req.body.nom
            film.genre = req.body.genre
            film.realisateur = req.body.realisateur
            film.date_de_sortie = req.body.date_de_sortie
            film.description = req.body.description
            film.statut = req.body.statut
            film.date_film_regarde = date
            
        }else{
            film.nom = req.body.nom
            film.genre = req.body.genre
            film.realisateur = req.body.realisateur
            film.date_de_sortie = req.body.date_de_sortie
            film.description = req.body.description
            film.statut = req.body.statut
        }


        try{
            film = await film.save()
            res.redirect(`/films/${film.slug}`)
        } catch(e){
            res.render('films/${path}', {film: film})
        }
    }
}

module.exports = router
