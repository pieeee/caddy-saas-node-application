# Use a node base image
FROM node:18

# Create app directory in container
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml* ./

# Install app dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Bundle app source inside Docker image
COPY . .

RUN pnpm run build

EXPOSE 8080

CMD ["pnpm", "start"]