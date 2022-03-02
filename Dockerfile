FROM node:latest

WORKDIR /app
COPY ./ /app

RUN npm install && npm run build
CMD [ "/app/entrypoint.sh" ]
