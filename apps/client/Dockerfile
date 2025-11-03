FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy client files
COPY apps/client ./apps/client/

# Copy packages  
COPY packages ./packages/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the Next.js app
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app/apps/client
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]

