NAME   := miun173/semweb-service
TAG    := $$(git rev-parse --short HEAD)
IMG    := ${NAME}\:${TAG}
LATEST := ${NAME}\:latest

build:
	@docker build -f ./prod.Dockerfile -t ${IMG} .
	@docker tag ${IMG} ${LATEST}

build-force:
	@docker build --no-cache -f ./prod.Dockerfile -t ${IMG} .

push:
	@docker push ${NAME}

login:
	@docker log -u ${DOCKER_USER} -p ${DOCKER_PASS}