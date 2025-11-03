FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY apps/server/package*.json ./

# Install npm dependencies (skip postinstall scripts)
RUN npm install --ignore-scripts

# Copy Prisma schema and generate client
COPY apps/server/prisma ./prisma
RUN npx prisma generate

# Copy source code (excluding node_modules)
COPY apps/server/src ./src
COPY apps/server/tsconfig.json ./
COPY apps/server/.env* ./

# Build the TypeScript code
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]