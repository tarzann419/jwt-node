const express = require('express');
const app = express();


const posts = [
    {
        username: 'Dan',
        title: 'post 1'
    }
]



app.get('/posts', (req,res) => {

})

app.listen(3131);