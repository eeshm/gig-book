#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies including devDependencies for building
npm install --include=dev

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Build TypeScript
npm run build