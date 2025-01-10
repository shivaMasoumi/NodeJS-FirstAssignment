const { Module } = require('module');
const requestHandler=(req,res)=>{
    const url=req.url;
    const method=req.method;

    if(url==='/'){
        res.write('<html>');
        res.write('<head><title>WelCome to the Nodejs world</title></head>');
        res.write('<h1>Welcome to the Nodejs world</h1>');
        res.write('<body><form action="/create-user" method="Post"><label> UserName <label/><input type="text" name="User"><button type="submit">Create User</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    else if(url==='/users'){
        res.write('<html>');
        res.write('<head><title>These are the List of User</title></head>');
        res.write('<h1>These are the List of User</h1>');
        res.write('<body><ul><li>User1</li><li>User2</li><li>User3</li></ul></body>');
        res.write('</html>');
        return res.end();
    }
    else if(url==='/create-user'&& method=="POST"){
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        req.on('end',()=>{
        const parseBody=Buffer.concat(body).toString();
        const user=parseBody.split('=')[1];
        console.log("UserName:"+user);
        res.statusCode=302;
        res.setHeader('Location','/users');
        return res.end();
        });

    }
}
module.exports= requestHandler;