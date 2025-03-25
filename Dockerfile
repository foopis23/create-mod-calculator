FROM oven/bun:1.2.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json bun.lock ./
RUN bun install

# Grab the latest bits
COPY . .

# Bundle app source
RUN bun run build

EXPOSE 4173

CMD [ "bun", "run", "preview" ]