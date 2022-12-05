const http = require('http');
const express = require('express')
const path = require('path');
const app = express()
const request = require("request");
const querystring = require('querystring');
const FieldValue = require('firebase-admin').firestore.FieldValue;

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

var serviceAccount = require("./serviceAccountkey.json");
const { name } = require('ejs');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs")

app.use(express.static("public"));

app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.get('/', (req, res) => {
  res.render("welcome")
})

app.get('/signup', (req, res) => {
  res.render("signup")
});
app.get('/registersubmit', (req, res) => {
  const username = req.query.username;//use name same name as given in form
  const name = req.query.name;
  const password = req.query.password;
  const repassword = req.query.repassword;
  console.log(username);
  console.log(name);
  if (password === repassword) {
    db.collection("users")
      .add({
        name: name,
        username: username,
        password: password,
      })
      .then(() => {
        res.render("loginpage")
      });
  } else {
    res.send("<center><h1 style=\"padding-top: 20%\">PASSWORD AND RE-ENTER PASSWORD SHOULD BE SAME</h1></center>")
  }



});

app.get('/login', (req, res) => {
  res.render("loginpage")
})
app.get('/loginsubmit', (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  db.collection("users")
    .where("username", "==", email)
    .where("password", "==", password)
    .get()
    .then((docs) => {
      if (docs.size > 0) {
        res.render("homepage");
      }
      else {
        res.render("signup");
      }
    });
});




app.get('/Homepage', function (req, res) {
  res.render("Homepage");

});
app.get('/Welcomepage', function (req, res) {
  res.render("Welcomepage");

});
app.get('/About', (req, res) => {
  res.render("About")
})

/*app.get('/plants', (req, res) => {
  res.render("plants")
})*/

app.get('/Tulasi', (req, res) => {
  res.render("Tulasi")
})

app.get('/Aloevera', (req, res) => {
  res.render("Aloevera")
})
app.get('/Calendula', (req, res) => {
  res.render("Calendula")
})

app.get('/Basil', (req, res) => {
  res.render("Basil")
})

app.get('/Lavender', (req, res) => {
  res.render("Lavender")
})
app.get('/Fenugreek', (req, res) => {
  res.render("Fenugreek")
})
app.get('/Peppermint', (req, res) => {
  res.render("Peppermint")
})
app.get('/Lemonbalm', (req, res) => {
  res.render("Lemonbalm")
})
app.get('/Ashwagandha', (req, res) => {
  res.render("Ashwagandha")
})
app.get('/Germanchamomile', (req, res) => {
  res.render("Germanchamomile")
})
app.get('/Amla', (req, res) => {
  res.render("Amla")
})
app.get('/Lemongrass', (req, res) => {
  res.render("Lemongrass")
})
app.get('/Bryophyllum', (req, res) => {
  res.render("Bryophyllum")
})
app.get('/Marshamallow', (req, res) => {
  res.render("Marshamallow")
})
app.get('/Chineseyum', (req, res) => {
  res.render("Chineseyum")
})
app.get('/Coriander', (req, res) => {
  res.render("Coriander")
})
app.get('/Ginger', (req, res) => {
  res.render("Ginger")
})
app.get('/Tumeric', (req, res) => {
  res.render("Tumeric")
})
app.get('/Garlic', (req, res) => {
  res.render("Garlic")
})
app.get('/Henna', (req, res) => {
  res.render("Henna")
})


/*app.get('/plantssubmit', (req, res) => {
  const name = req.query.name;//use name same name as given in form
  const uses = req.query.uses; 
  //console.log(username);
  //console.log(name);
  
    db.collection("plants")
    .add({
      name: name,
      uses: uses,
    })
});*/


app.get('/homepagesubmit', (req, res) => {
  const name = req.query.searchitem;//use name same name as given in form
  //const uses = req.query.uses; 
  //console.log(username);
  //console.log(name);
  // db.collection("plants")
  // .where("name", "==", name)
  //.get()
  //.then((docs) => {
  //if(docs.size > 0){
  if (name == "Tulasi") {
    res.render("Tulasi");
  }
  else if (name == "Aloevera") {
    res.render("Aloevera");
  }
  else if (name == "Basil") {
    res.render("Basil");
  }
  else if (name == "Calendula") {
    res.render("Calendula");
  }
  else if (name == "Lavender") {
    res.render("Lavender");
  }
  else if (name == "Fenugreek") {
    res.render("Fenugreek");
  }
  else if (name == "Peppermint") {
    res.render("Peppermint");
  }
  else if (name == "Lemonbalm") {
    res.render("Lemonbalm");
  }
  else if (name == "Ashwagandha") {
    res.render("Ashwagandha");
  }
  else if (name == "Germanchamomile") {
    res.render("Germanchamomile");
  }
  else if (name == "Amla") {
    res.render("Amla");
  }
  else if (name == "Lemongrass") {
    res.render("Lemongrass");
  }
  else if (name == "Bryophyllum") {
    res.render("Bryophyllum");
  }
  else if (name == "Marshamallow") {
    res.render("Marshamallow");
  }
  else if (name == "Chineseyum") {
    res.render("Chineseyum");
  }
  else if (name == "Coriander") {
    res.render("Coriander");
  }
  else if (name == "Ginger") {
    res.render("Ginger");
  }
  else if (name == "Turmeric") {
    res.render("Turmeric");
  }
  else if (name == "Garlic") {
    res.render("Garlic");
  }
  else if (name == "Henna") {
    res.render("Henna");
  }
  else {
    res.render("signup");
  }
  //});
});
/*
app.listen(3000, function () {  //this function is used as call back function to print the sentence below
    console.log('Example app listening on port 3000!') ; //to check if the code executed successfully
    }); */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})