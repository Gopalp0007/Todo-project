const express = require("express");


const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extends:true}));

var items = [];

app.get("/",(req,res) => {
    res.render("list" , { items});
});


app.post("/add",(req,res) => {
  const { ele1 } = req.body;
  if (!ele1.trim()){  
      return res.send("<script>alert('Task cannot be empty!'); window.location.href='/'</script>");
  }  

     items.push({text: ele1,done: false});
     res.redirect("/");
});

app.post("/delete",(req,res) => {
    const index = req.body.index;
    items.splice(index,1);
    res.redirect("/");
});

app.post("/toggle",(req,res) => {
    const index = req.body.index;
    if (items[index]) {
        items[index].done = !items[index].done;
    }
    res.redirect("/");
});

app.post("/edit",(req,res) => {
    const {index, newText} = req.body;
    if (newText.trim()){
        items[index] ={text: newText};
    }
    res.redirect("/");
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
