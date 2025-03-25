# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM node:23-alpine3.20 AS development

# file extracted from: https://github.com/docker/awesome-compose/blob/master/vuejs/vuejs/Dockerfile

RUN mkdir /back
WORKDIR /back

COPY . .

RUN npm i
ENV HOST=0.0.0.0

CMD [ -d "node_modules" ] && npm run server || npm ci && npm run server

FROM development as dev-envs
RUN <<EOF
apk update
apk add git
EOF

RUN <<EOF
addgroup -S docker
adduser -S --shell /bin/bash --ingroup docker vscode
EOF

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD ["npm", "run", "serve"]
