FROM node:18-alpine AS base

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci
COPY . .

# Dev
FROM base AS development
RUN chmod +x .husky/*
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Prod
FROM base AS production
RUN npm run build
CMD ["echo", "Build completed. Copy contents of /app/dist to S3."]
