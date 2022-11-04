FROM node:18-slim

RUN apt update && apt install -y \
  git \
  ca-certificates \
  make \
  procps

RUN npm install -g @nestjs/cli@9.1.5 

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f" , "/dev/null" ]
