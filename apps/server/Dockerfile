FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install npm dependencies (skip postinstall scripts)
RUN npm install --ignore-scripts

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code
COPY . .

# Build the TypeScript code
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]