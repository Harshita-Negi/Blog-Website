//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/blogDB");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const postSchema = {
  title : String,
  body : String
}

const Post = mongoose.model("post", postSchema);

app.get("/" , function(req,res){               // CHALLENGE 1
   
  main()
  async function main(){
    res.render("home" , {                      // CHALLENGE 2
    homeContent : homeStartingContent  , 
    posts : await Post.find({})});             // CHALLENGE 12
 }
})


app.get("/about" , function(req,res){      // CHALLENGE 5
  
  res.render("about" , { aboutContent : aboutContent }); 
  
})

app.get("/contact" , function(req,res){    // CHALLENGE 5
  
  res.render("contact" , { contactContent : contactContent }); 
  
})

app.get("/compose" , function(req,res){    // CHALLENGE 7

  res.render("compose" ); 
  
})

app.post("/compose" , function(req, res){
  
  // console.log(req.body.postTitle);      // CHALLENGE 8

  // const post ={                            // CHALENGE 11
  //    title : req.body.postTitle,
  //    body : req.body.postBody
  // }

  main();
  async function main(){
      const post = new Post({
        title : req.body.postTitle,
        body : req.body.postBody
      })
        await post.save();
        res.redirect("/");  
  } 

  // posts.push(post);                       // CHALLENGE 11
  

})

app.get('/posts/:postId' , function(req , res){
  const requestedId=(req.params.postId);
  main()
  async function main(){
     try{
     const posts = await Post.findOne({_id : requestedId})
       res.render("post", {title : posts.title, content:posts.body})  
    
     }catch(e){
      console.log(e.message);
     }
     
  }
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
