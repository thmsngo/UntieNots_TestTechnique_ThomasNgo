const express = require('express')
const mongoose = require('mongoose')
const Film = require('./models/film')
const filmRouter = require('./routes/film')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb+srv://first_user:cmAigzpnB6mhvAyD@cluster0.yb59h.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// We use ejs to write our views
// View engine is going to convert out ejs code to html
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const films = await Film.find().sort({
        nom:'asc'
    })
    res.render('films/index', {films: films})
})
app.use('/films',filmRouter)
app.listen(5000)
