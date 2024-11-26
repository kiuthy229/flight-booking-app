# Specify the build platform
ARG BUILDPLATFORM='linux/amd64'

# Stage 1: Build the application
FROM --platform=$BUILDPLATFORM node:20-alpine as builder

# Set the working directory
WORKDIR /opt/app

# Copy package files and install dependencies
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application source code
COPY ./ ./

# Build the application
RUN yarn build

# Stage 2: Create the production image
FROM --platform=$BUILDPLATFORM node:20-alpine

# Set the working directory
WORKDIR /opt/app

# Copy only the necessary build artifacts and dependencies
COPY --from=builder /opt/app/dist /opt/app/dist
COPY ./package.json ./yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD [ "node", "dist/index.js" ]
