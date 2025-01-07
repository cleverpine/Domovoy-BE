# Use an official Node runtime as a parent image
FROM node:20.11.0 as build
# Create app directory
WORKDIR /app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package.json /app/package.json

RUN npm install

COPY ./ /app

CMD ["node", "./server.js"]

# Expose the correct port that your application listens on
# The port should match the port your Node.js application listens on (e.g., 3000, 8080, etc.)
EXPOSE 3000

