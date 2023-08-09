# This Dockerfile are used to build the image for the application
# The build image is based on the latest lts official nodejs image

FROM node:18-alpine as build

LABEL Maintainer="Ricardo Silva"

WORKDIR /build

COPY . .

RUN npm install && npm run build

# The final image is based on the latest lts official nodejs image
FROM node:18-alpine

LABEL Maintainer="Ricardo Silva"

WORKDIR /app

# Copy the application files to the final image
COPY --from=build /build/build .
COPY --from=build /build/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "index.js"]
