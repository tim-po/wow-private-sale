FROM node:16.14.0

ARG TAG
ARG DOMAIN

LABEL application="itmo.track-frontend"
LABEL traefik.http.routers.itmo-track-frontend-${TAG}.rule=Host(`${DOMAIN}`)
LABEL traefik.http.routers.itmo-track-frontend-${TAG}.entrypoints=websecure
LABEL traefik.http.routers.itmo-track-frontend-${TAG}.tls.certresolver=myresolver
LABEL entrypoints.web.http.redirections.entryPoint.to=websecure
LABEL traefik.enable=true

COPY package*.json /app/
WORKDIR /app

RUN npm i
RUN npm install -g serve

COPY . .
RUN unset CI
RUN npm run build

ENTRYPOINT ["serve"]
CMD ["-s", "build"]

