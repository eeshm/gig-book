#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pnpm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Build TypeScript
pnpm run build