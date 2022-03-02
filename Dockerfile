FROM node:latest

WORKDIR /app
COPY ./ /app

RUN npm install \
  && npm run build \
  && chmod +x /app/entrypoint.sh

CMD [ "/app/entrypoint.sh" ]
