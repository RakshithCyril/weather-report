// if(process.env.NODE_ENV !== "production"){
    
// }
const dot = require('dotenv')
dot.config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cheerio = require('cheerio')
const axios = require('axios')

const newspapers = [
    {
     name:'thetimes',
     address:'https://www.thetimes.co.uk/environment/climate-change',
     base:"https://climate01.herokuapp.com/thetimes"
},
{
    name:'guardian',
    address:'hhtps://www.theguardian.com/environment/climate-crisis',
    base:'https://climate01.herokuapp.com/guardian'
},
{
    name:'telegraph',
    address:'https://www.telegraph.co.uk/climate-change',
    base:'https://climate01.herokuapp.com/telegraph'
},
]
const articles =[]

newspapers.forEach(newspaper =>{
    axios.get(newspaper.address)
    .then(dat =>{
        const html = dat.data
        const $ = cheerio.load(html)
        $('a:contains("climate")',html).each(function (){
            const title = $(this).text()
            const url = $(this).attr('href')

            articles.push({
                title,
                url: newspaper.base + url,
                source: newspaper.name,
                base:newspaper.base
            })
        })
    })

})

// app.get('/',(req,res)=>{
//     res.json('welcome')
// })
app.get('/',(req,res)=>{
    res.json(articles)
    })
    app.get('/:newspaperId',async(req,res)=>{
        const newspaperId = req.params.newspaperId
        const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
        const base = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].base
        axios.get(newspaperAddress)
        .then(dat =>{
            const html = dat.data
            const $ = cheerio.load(html)
            const spec = []
            $('a:contains("climate")',html).each(function (){
                const title = $(this).text
                const url = $(this).attr('href')
                spec.push({
                    title,
                    url : base + url,
                    source:newspaperId
                })
            })
            res.json(spec)
        }) .catch(err =>{
            console.log('error')
        })
    })
app.listen(port,()=>{
    console.log(`listeniefng ${port}`)
})
