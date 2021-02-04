image="nuid/proving-ground"
container="nuid-pg"

build:
	docker build -t "$(image):latest" .

clean: stop rm rmi

rm:
	docker rm $(container)

rmi:
	docker rmi $(image)

run:
	docker run -v $$PWD:/nuid/proving-ground -it -d --name $(container) $(image) /bin/sh

shell:
	docker exec -it $(container) /bin/sh

stop:
	docker stop $(container)
