const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const csurf = require("csurf");
const bodyParser = require("body-parser");

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const s3 = require("./s3");
const config = require("./config");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(express.static("public"));

app.use(compression());

app.use(require("cookie-parser")());

const cookieSessionMiddleware = cookieSession({
    secret: "Arife Tokats",
    maxAge: 1000 * 60 * 60 * 24 * 14
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(
    require("body-parser").urlencoded({
        extended: false
    })
);

app.use(bodyParser.json());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////ROUTES/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
app.get("/gewaesser/:id.json", function(req,res){
    db.getWaterById(req.params.id).then((data) =>{
        res.json({
            data: data.rows[0]
        });
    });
});
app.get("/gewaesserDaten", function(req, res){
    db
        .getWaters()
        .then((result) => {
            res.json(
                result.rows
            );
        });
});
app.get("/getWatersForClub", function(req, res){
    db
        .getClubWaters(req.query.clubId)
        .then((result) => {
            res.json(
                result.rows
            );
        });
});
app.post("/registerWater", function(req, res){
    db
        .registerWater(req.body.clubId, req.body.name, req.body.club, req.body.adress, req.body.description, req.body.rules, req.body.stocking)
        .then(() =>{
            res.json({
                success: true
            });
        });
});
app.post("/registerClub", function(req, res) {
    db
        .hashPassword(req.body.password)
        .then(function(hashedPass) {
            return db.registerClub(req.body.name, req.body.ceo, req.body.clubNumber, req.body.street, req.body.postcode, req.body.city, req.body.email, hashedPass);
        })
        .then(function(result) {
            req.session.clubId = result.rows[0].id;
            req.session.name = result.rows[0].name;
            req.session.ceo = result.rows[0].ceo;
            req.session.clubNumber = result.rows[0].clubNumber;
            req.session.street = result.rows[0].street;
            req.session.postcode = result.rows[0].postcode;
            req.session.city = result.rows[0].city;
            req.session.email = result.rows[0].email;
        })
        .then(function() {
            console.log(req.session.clubId);
            res.json({
                success: true
            });
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                success: false
            });
        });
});
app.post("/loginClub", function(req, res){
    console.log("loginclub route");
    let clubId, name, ceo, clubNumber, street, postcode, city, icon, email;
    db
        .getClubByEmail(req.body.email)
        .then(function(data){
            console.log(data);
            clubId = data.rows[0].id,
            name = data.rows[0].name,
            ceo = data.rows[0].ceo,
            clubNumber = data.rows[0].clubNumber,
            street = data.rows[0].street,
            postcode = data.rows[0].postcode,
            city = data.rows[0].city,
            icon = data.rows[0].icon,
            email = data.rows[0].email;
            return db.checkPassword(req.body.password, data.rows[0].password);
        })
        .then(function (data){
            console.log("next step");
            if(data){
                console.log("next next step");
                req.session.clubId = clubId;
                req.session.name = name;
                req.session.ceo = ceo;
                req.session.clubNumber = clubNumber;
                req.session.street = street;
                req.session.postcode = postcode;
                req.session.city = city;
                req.session.icon = icon;
                req.session.email = email;
                res.json({
                    success: true
                });
            }
            else{
                throw new Error();
            }
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                success: false
            });
        });
});



app.post("/register", function(req, res) {
    db
        .hashPassword(req.body.password)
        .then(function(hashedPass) {
            return db.registerUser(req.body.first, req.body.last, req.body.birthday, req.body.street, req.body.postcode, req.body.birthplace, req.body.licensenumber, req.body.email, hashedPass);
        })
        .then(function(result) {
            req.session.userId = result.rows[0].id;
            req.session.first = result.rows[0].first;
            req.session.last = result.rows[0].last;
            req.session.birthday = result.rows[0].birthday;
            req.session.street = result.rows[0].street;
            req.session.postcode = result.rows[0].postcode;
            req.session.birthplace = result.rows[0].birthplace;
            req.session.licensenumber = result.rows[0].licensenumber;
            req.session.email = result.rows[0].email;
        })
        .then(function() {
            res.json({
                success: true
            });
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                success: false
            });
        });
});
app.post("/login", function(req, res) {
    let userId, first, last, birthday, street, postcode, birthplace, licensenumber, email;
    db
        .getUserByEmail(req.body.email)
        .then(function(data) {
            userId = data.rows[0].id;
            first = data.rows[0].first;
            last = data.rows[0].last;
            birthday = data.rows[0].birthday;
            street = data.rows[0].street;
            postcode = data.rows[0].postcode;
            birthplace = data.rows[0].birthplace;
            licensenumber = data.rows[0].licensenumber;
            email = data.rows[0].email;
            return db.checkPassword(req.body.password, data.rows[0].password);
        })
        .then(function(data) {
            if (data) {
                req.session.userId = userId;
                req.session.first = first;
                req.session.last = last;
                req.session.birthday = birthday;
                req.session.street = street;
                req.session.postcode = postcode;
                req.session.birthplace = birthplace;
                req.session.licensenumber = licensenumber;
                req.session.email = email;
                res.json({
                    success: true
                });
            } else {
                throw new Error();
            }
        })
        .catch(function(err) {
            console.log(err);
            res.json({
                success: false
            });
        });
});
app.get("/user", function(req, res){
    return db.getUserById(req.session.userId).then(function(result){
        res.json({
            user: result.rows[0],
            success : true
        });
    }).catch(function(err){
        console.log(err);
    });
});
app.get("/clubById", function(req, res){
    return db.getClubById(req.session.clubId).then(function(result){
        res.json({
            club: result.rows[0],
            success: true
        });
    }).catch((err) =>{
        console.log(err);
    });
});



app.get("/logout", function(req,res){
    req.session = null;
    res.redirect("/welcome");
});



app.get("/clubs", function(req, res){
    if(req.session.clubId){
        console.log(req.session.clubId);
        res.sendFile(__dirname + '/index.html');
    }
    else{
        res.redirect("/welcome");

    }
});

app.get('/welcome', function(req, res) {
    if(req.session.userId){
        res.redirect("/");
    }
    else if(req.session.clubId){
        res.redirect("/clubs");
    }
    else{
        res.sendFile(__dirname + '/index.html');
    }
});
app.get('*', function(req, res) {
    if(!req.session.userId && !req.session.clubId){
        res.redirect("/welcome");
    }
    else if(req.session.clubId && !req.session.userId){
        res.redirect("/clubs");
    }
    else{
        res.sendFile(__dirname + '/index.html');
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
