# Stage 1: building
FROM node:10-alpine

# create app working directory in "docker" not host
WORKDIR /app

# Copy package.json and package.lock.json to WORKDIR (dot `.`)
# To benefit from caching we only copy package*.json only then installed  
COPY package*.json ./

# RUN npm install in WORKDIR
RUN npm install

# Copy the app to WORKDIR
COPY . .

CMD ["npm", "run", "dev"]
