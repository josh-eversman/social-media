const express = require('express');
const connectDB = require('./config/db')
const app = express();

connectDB();



app.use(express.json({extended: false}));

app.get('/', (req, res) =>{
  res.send('it works...........');
})

app.use('/api/users', require('./routes/api/users'));
app.use('/api/post', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server working at ${PORT}`))
