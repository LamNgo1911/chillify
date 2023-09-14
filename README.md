
# Chillify - A streaming music platform

Chillify is a music streaming platform that specializes in calm and soothing music, offering users a relaxing listening experience to help them unwind and destress.






## Preview

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Tech Stack

**Client:** 
- React
- Redux 
- TailwindCSS
- Marterial UI

**Server:** 
- Node
- Express
- Mongoose
- Jwt
- Multer


## Installation

Install my-project with npm


```
1. Create new MongDB cluster
2. Create shared cluster
3. Choose "Connect" on newly created cluster
4. Choose Node.js and version 4.1 or later
Copy the connection string and replace "username" and "password" with credentials of the cluster
```

Clone project from GitHub

```
git clone https://github.com/LamNgo1911/chillify.git
<!-- server -->
cd server
npm install
<!-- client -->
cd client
npm install
```

Create .env file based on the .env.example file

```
# .env
...
MONGO_URI = mongodb+srv://<username>:<password>@nodeexpressprojects.wgrsvqi.mongodb.net/Project-1?retryWrites=true&w=majority
JWT_SECRET = c992742e1c15449bac6c7585438facf9
JWT_EXPIRE = 30d
<!-- Change MONGODB_URI, JWT_SECRET and JWT_EXPIRE value to your customized connection string, JWT_SECRET and JWT_EXPIRE -->
```


## Run locally

Server side

```
    Open app.js >> corsOptions >> change origin to your localhost
    cd server
    npm start
```
Client side

```
    Open src >> api >> axios >> change baseURL to localhost server side with /api/v1 at the end. For example:  http://localhost:5000/api/v1
    cd client
    npm start
```

Enjoy the application!
