const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')

// Setup express
app.use(express.static(publicPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        author: 'Aboubacar BAMBA'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Aboubacar BAMBA'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        author: 'Aboubacar BAMBA'
    })
})

app.get('/weather',  async (req, res) => {
    if (!req.query.address) {
        return res.status(400).send({ error: 'You must provide an address.'})
    }
    try {
        const { latitude, longitude, location } = await geocode(req.query.address)
        const { temperature, feelslike } = await forecast(latitude, longitude)
        res.send({
            forecast: `It is currently ${temperature} degress out. Its feels like ${feelslike} degrees.`,
            location
        })
    } catch (e) {
        res.send({ error: e })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found.',
        author: 'Aboubacar BAMBA'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        author: 'Aboubacar BAMBA'
    })
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is up on port ${port}`)
})