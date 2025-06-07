FROM node:18

WORKDIR /app

COPY package*.json ./

# Install ms explicitly first and then all dependencies
RUN npm install ms && npm ci --omit=dev

# # Install ms explicitly first and then all dependencies
# RUN npm install ms && npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
