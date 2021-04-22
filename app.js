const express=require("express");
const body_parser=require("body-parser");
const request=require("request");
const https=require("https")

const app=express();
app.use(express.static("public"));
app.use(body_parser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
  const first_name=req.body.fname;
  const last_name=req.body.lname;
  const email=req.body.email;
  const data={
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME:first_name,
          LNAME:last_name
        }
      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us2.api.mailchimp.com/3.0/lists/2c159753ad";
  const options={
    method:"POST",
    auth:"sid:9219f4c5e95f329f94ecc10414adc14c-us2"

  }
  const request=https.request(url,options,function(response){
    if(response.statusCode==200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(3000,function(){
  console.log("server running");
})
//9219f4c5e95f329f94ecc10414adc14c-us2
//listid
//2c159753ad
