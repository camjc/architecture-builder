FROM public.ecr.aws/docker/library/node:20

WORKDIR /root/app

COPY package.json package-lock.json ./
RUN npm ci --quiet --no-optional && \
  npm cache clean --force

COPY tsconfig.json ./
COPY test ./test
COPY src ./src
