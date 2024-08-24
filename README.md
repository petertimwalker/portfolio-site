# portfolio-site

I intially created this app the Summer going into my senior year of college 2021. I created the app using create-react-app and hosted it via AWS S3 bucket.

# Local dev
1. Setup api-service [here](https://github.com/petertimwalker/api-service?tab=readme-ov-file#local-dev)
2. npm install
3. NODE_ENV=development npm start
4. React app running on port 3000 http://localhost:3000/bookapp

## Run tests
npm test 

## /BookApp

### The probelm I was solving at the time

My dad was interested in his favorite authors most recent books that fit his book shelf.

I used Google Books Api to query the most recent books that fit the dimensions specified by the user.

### 2024

I found this project on an old college laptop and had a lot of fun reading my old code.
I noticed I was exposing the Api key directly in the code when building the Single Page Application.
Since then I created [api-service](https://github.com/petertimwalker/api-service) a simple Express app hosted on an EC2 server that I can use to query the Google Books Api without exposing my API_KEY via network call or from building.
I'm hosting api-service on the subdomain api.peterwalker.xyz with strict inbound rules and Cross-Origin Resource Sharing (CORS) middleware to only allow my S3 bucket access to the secret endpoints.
