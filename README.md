
# Chillify - A streaming music platform

Chillify is a music streaming platform specializing in calm and soothing music, offering users a relaxing listening experience to help them unwind and destress.






## Preview

Login page

<img width="960" alt="login-page" src="https://github.com/LamNgo1911/chillify/assets/121915847/97ead6d7-091a-4c4a-9fb3-a47d87b938c6">

Sign-up page

<img width="959" alt="sign-up-page" src="https://github.com/LamNgo1911/chillify/assets/121915847/fdfcebcc-0629-4966-a977-70968873aa32">

Forget-password page

<img width="960" alt="password-recovery-page" src="https://github.com/LamNgo1911/chillify/assets/121915847/c00bca16-08b5-41ee-a7a2-a378b4f9a1be">

Home page

<img width="960" alt="home-page" src="https://github.com/LamNgo1911/chillify/assets/121915847/b9095414-6764-4451-9eb6-d6fb670d7659">






## Tech Stack

**Client:** 
- React
- Redux 
- TailwindCSS
- Material UI

**Server:** 
- Node
- Express
- Mongoose
- Jwt
- Multer


## Installation

Install my-project with npm


```
1. Create a new MongoDB cluster
2. Create a shared cluster
3. Choose "Connect" on the newly created cluster
4. Choose Node.js and version 4.1 or later
Copy the connection string and replace "username" and "password" with the credentials of the cluster
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

Create a .env file based on the .env.example file

```
# .env
...
MONGO_URI = mongodb+srv://<username>:<password>@nodeexpressprojects.wgrsvqi.mongodb.net/Project-1?retryWrites=true&w=majority
JWT_SECRET = c992742e1c15449bac6c7585438facf9
JWT_EXPIRE = 30d
<!-- Change MONGODB_URI, JWT_SECRET and JWT_EXPIRE value to your customized connection string, JWT_SECRET and JWT_EXPIRE -->
```


## Run locally

Server-side

```
    Open app.js >> corsOptions >> change origin to your localhost
    cd server
    npm start
```
Client-side

```
    Open src >> api >> axios >> change baseURL to localhost server side with /api/v1 at the end. For example  http://localhost:5000/api/v1
    cd client
    npm start
```

Enjoy the application!
