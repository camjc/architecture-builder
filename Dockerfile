FROM public.ecr.aws/docker/library/node:18.15.0

WORKDIR /root/app

RUN npm i -g npm@latest
COPY package.json package-lock.json ./
RUN npm ci --quiet --no-optional && \
  npm cache clean --force

COPY tsconfig.json ./
COPY test ./test
COPY src ./src
