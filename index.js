const path = require('path');
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const { v4:uuid } = require('uuid');

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

let comments = [
    {
        id: uuid(),
        username: 'SPD',
        comment: 'Fuck you bitch!!'
    },
    {
        id: uuid(),
        username: 'Teekoo',
        comment: 'Damn it!!'
    },
    {
        id: uuid(),
        username: 'Luffy',
        comment: 'LOL!!'
    },
    {
        id: uuid(),
        username: 'Goku',
        comment: 'Nice one fucker!!'
    }
]

app.get('/comments',(req,res)=>{
    res.render('comments/index',{comments});
})

app.get('/comments/new',(req,res)=>{
    res.render('comments/new');
})

app.post('/comments',(req,res)=>{
    const {username,comment} = req.body;
    comments.push({username,comment, id: uuid()})
    res.redirect('/comments')
})

app.get('/comments/:id',(req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show',{comment});
})

app.get('/comments/:id/edit',(req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {comment})
})

app.patch('/comments/:id',(req,res)=>{
    const {id} = req.params;
    const foundComment = comments.find(c => c.id === id);
    const newCommentText = req.body.comment;
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params;
    comments = comments.filter(c=>c.id !== id);
    res.redirect('/comments');
})


app.listen(3000,()=>{
    console.log("Listening on port 3000")
})