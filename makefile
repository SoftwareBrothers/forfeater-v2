.DEFAULT_GOAL := start

cert:
	docker-compose exec -T node sh -ac "openssl req -newkey rsa:2048 -nodes -keyout docker/nginx/\"\$${DOMAIN}\".key -x509 -days 365 -out docker/nginx/\"\$${DOMAIN}\".crt"
debug:
	docker-compose -f ./docker-compose.yaml -f ./with-debug.yaml up --build -d
logs:
	docker-compose logs -f node
start:
	docker-compose -f ./docker-compose.yaml up --build -d
stop:
	docker-compose -f ./docker-compose.yaml stop
logs:
	docker-compose logs -f
restart:
	make stop && make start
