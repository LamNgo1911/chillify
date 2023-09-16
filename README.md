
# Chillify - A streaming music platform

Chillify is a music streaming platform specializing in calm and soothing music, offering users a relaxing listening experience to help them unwind and destress.






## Preview

### Live website
https://bespoke-frangollo-b3a1d3.netlify.app  
(Please be patient, it may take a bit longer to load data since I use a free version. Thank you for understanding.😇)

### Photos
Login page

<img width="960" alt="login-page" src="https://github.com/LamNgo1911/chillify/assets/121915847/97ead6d7-091a-4c4a-9fb3-a47d87b938c6">

Sign-up page

<img width="959" alt="sign-up-page" src="https://github.com/LamNgo1911/chillify/assets/121915847/fdfcebcc-0629-4966-a977-70968873aa32">

Forget-password page

<img width="960" alt="password-recovery-page" src="https://github.com/LamNgo1911/chillify/assets/121915847/c00bca16-08b5-41ee-a7a2-a378b4f9a1be">

Home page

<img width="960" alt="home-page" src="https://github.com/LamNgo1911/chillify/assets/121915847/b9095414-6764-4451-9eb6-d6fb670d7659">

Artist page

![artist-page](https://github.com/LamNgo1911/chillify/assets/121915847/359a6b13-d4e5-46f6-a7f4-cba284f799bf)

Song lyrics page

![song-lyrics-page](https://github.com/LamNgo1911/chillify/assets/121915847/ca3ef759-2f7a-4a17-8f5d-6f345fa0bbae)

Search page

![search-page](https://github.com/LamNgo1911/chillify/assets/121915847/7fd94473-d4d2-4c51-81fc-5c654b64f336)

Genre page

![genre-page](https://github.com/LamNgo1911/chillify/assets/121915847/a961b4f4-23a4-4183-a493-35e747d3c385)

Recent play page

![recent-play-page](https://github.com/LamNgo1911/chillify/assets/121915847/b85b3db9-8b33-4ea6-a97d-940a2fd01712)

Favorite page

![favorite-page](https://github.com/LamNgo1911/chillify/assets/121915847/a78d584e-315b-4711-a2cb-6e7333073f73)

Playlist page

![playlist-page](https://github.com/LamNgo1911/chillify/assets/121915847/6c245808-02dc-44ae-9a66-dc4a2e3c930c)

Music player

![player](https://github.com/LamNgo1911/chillify/assets/121915847/b0985f13-a5bf-45e4-9dfc-59076e13c82e)












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
    cd server
    npm start
```
Client-side

```
    cd client
    npm start
```

Enjoy the application!
