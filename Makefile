.PHONY: all run runC build buildS buildC clean

all: clean build run

run:
	@-node server/app.js

runC:
	@-npm run dev --prefix client

build: buildC buildS

buildC:
	@-npm i --prefix client
	@-npm run build --prefix client

buildS:
	@-npm i --prefix server

clean:
	@-rm -r client/dist
	@-rm -r client/package-lock.json
	@-rm -r client/node_modules
	@-rm -r server/node_modules