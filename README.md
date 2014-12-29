#Example Authentication with node.js, express i moongose

This is a demo authentication app in Node.js, express i moongose.

In this demo I've used Token-based authentication: 
To implement this kind of authentication I've used the JSON Web token(JWT), which is a standard format designed for this specific purpose(authentication)

In Node we can find JWT in the package **jwt-simple**

To encrypt the user password in mongodb I've used BCrypt, which use a hashing algorithm. In Node we can find BCrypt in the package **bcrypt**

##How it works

To create a user:

    curl -X POST -d '{"username":"xavi", "password": "patata"}' -H "Content-Type: application/json" localhost:3000/user
    
To get a session token:
    
    curl -X POST -d  '{"username":"xavi", "password": "patata"}' -H "Content-Type: application/json" localhost:3000/user
    
To authenticate a user:

    curl -H "X-Auth:eyJ0eXAiOiJKV1QiLCJhbGc3OiJIUzI1NiJ3.eyJ1c2VabmFtZSI6ImFuZHJldSJ9.OVto8nX7vUgL-WabJV3HMDUPEdvTey78_4m3QQv6ULw" localhost:3000/user