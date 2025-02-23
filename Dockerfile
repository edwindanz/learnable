# Step 1: Use official Node.js image from Docker Hub
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if you have one)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose the port that the React app will run on
EXPOSE 3000

# Step 7: Run the React app
CMD ["npm", "start"]