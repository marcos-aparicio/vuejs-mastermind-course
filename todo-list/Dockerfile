# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM node:23-alpine3.20 AS development

# file extracted from: https://github.com/docker/awesome-compose/blob/master/vuejs/vuejs/Dockerfile

RUN mkdir /project
WORKDIR /project

COPY . .

RUN npm i -g @vue/cli &&\
    npm i

CMD [ -d "node_modules" ] && npm run dev || npm ci && npm run dev

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
