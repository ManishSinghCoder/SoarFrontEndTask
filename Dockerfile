FROM ubuntu


WORKDIR /app

RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

COPY . /app

RUN  npm install --legacy-peer-deps && npm run build && npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]