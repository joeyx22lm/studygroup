# Build Environment and install OpenVPN for PIA
FROM openjdk:8-jdk AS APP_BUILD_IMAGE
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
    && apt-get update \
    && apt install -y nodejs build-essential libpng-dev \
  	&& rm -rf /var/cache/apt/archives \
  	&& rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY ./ /app

RUN npm install && npm run build
CMD [ "/app/entrypoint.sh" ]
