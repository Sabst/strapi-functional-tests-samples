TESTS = test/**/*.js

.DEFAULT_GOAL := test

install:
	@npm install

test: install
	@NODE_ENV=test STRAPI_SERVER_CMD='./server.js' \
	node --harmony \
	./node_modules/.bin/_mocha \
	--opts mocha.opts \
	$(TESTS)

test-coverage: install
	@NODE_ENV=test STRAPI_SERVER_CMD="$(shell npm bin)/istanbul cover --hook-run-in-context ./server.js" \
	node --harmony \
	./node_modules/.bin/_mocha \
	--opts mocha.opts \
	$(TESTS)

.PHONY: test test-coverage
