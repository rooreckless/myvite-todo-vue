FROM node:18.14.2-bullseye
#bullseyeで採用のパッケージ管理ソフトをupdate
RUN apt-get update && apt-get install -y
WORKDIR /usr/src/app
