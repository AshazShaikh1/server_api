const express = require('express');
const fs = require('fs')
const app = express();
const users = require('./MOCK_DATA.json');
const port = 8000;

//middleware  
app.use(express.urlencoded({extended : false}));

app.get("/",(req,res)=>{

  res.sendFile('index.html', {root: __dirname });

})


app.get("/users",(req,res)=>{
  const html = `
  <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join('')}
  </ul>
`;
res.send(html);
});


app.get("/user/:id",(req,res)=>{
  const id = Number(req.params.id);
  const data = users.find((ele)=>ele.id == id);

  res.json(data);

})

app.post("/user",(req,res)=>{
  const body = req.body;
  console.log(body);
  users.push({id:users.length + 1,...body});
  fs.writeFile("MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    
   
  })

  res.send("data submit success");
});











app.listen(port,()=>{
  console.log(`on this ${port} server is listening`);
})