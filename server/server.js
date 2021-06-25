const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const path = require('path')
const mongoClient = require('mongodb').MongoClient;

const db_url = 'mongodb://192.168.29.156:27017'
const port = 1000;
const app = express();


app.use(cors())
app.use(bodyParser.urlencoded({extended : false}));

app.use(bodyParser.json());

app.get('/', function(req, res){
	console.clear();
	res.send('Looks like you are trying to access react app private server via http')
});

app.post('/login', function(req, res){
	/*
	req.body is of the form :
	{uname : "___", pword : "___"}
	*/
	const reqJSON = req.body;
	let data = {}
	mongoClient.connect(db_url,{useUnifiedTopology : true}, async function(err, client){
		if(err) throw err
		
		else{
			const users = client.db('React_Web_DB').collection('users')
			const doc = await users.findOne({username : reqJSON['uname'], password : reqJSON['pword']});
			if(doc){
				//Login successful
				data = {login : 1, name : doc.name}
			}
			
			else{
				//Invalid credentials
				data = {login : 0, name : ''}
			}
		}
		
		await client.close()
		res.send(data)
	})
})

app.post('/register', function(req, res){
	
	let data = {}
	/*
		Checks to be made
		username exists already or not
		
	*/
	
		mongoClient.connect(db_url,{useUnifiedTopology : true}, async function(err, client){
		
		if(err) throw err
		
		let db = client.db("React_Web_DB")
		let users = db.collection("users")
		//Check if username exists
		
		var myDocument = await users.findOne({username : req.body['mail']})
		
		if(myDocument){
			data = {
				message : 'User already exists !',
				type : 'Error'
			}
			
			
		}
		
		else{
			
			await db.collection('users').insertOne({username : req.body['mail'], name : req.body['name'], password : req.body['pword']})
			
			data = {
				message : 'Registeration successful! You can now login',
				type : 'Success'
				}
			
			
		}
		
		await client.close();
		res.json(data)
	})
	
	
})

app.listen(port, ()=>{
	console.log('Listening at port : ', port);
})