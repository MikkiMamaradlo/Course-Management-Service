const express = require('express')
const myRouter = require('./router')

const app = express()

app.use(express.json())
mongoose.connect('kunyare merong url')
.then(() =>{
    app.listen(3000, () => {
        console.log('Listen to port 3000')
    })
})
.catch(error =>{
    console.log(error)
})

app.use(myRouter)
