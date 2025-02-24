MAKEFLAGS += --no-print-directory

build-front:
	docker-compose run --rm frontend-cli sh -c "npm i && npm run build"

publish-front:
	cp frontend/dist/ server/dist -r

install-server:
	docker-compose run --rm app sh -c "composer install"

init:
	docker-compose build
	$(MAKE) install-server
	$(MAKE) build-front
	$(MAKE) publish-front
	docker-compose up -d

cli:
	docker-compose exec app bash