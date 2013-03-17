all: build install

install:
	@./node_modules/.bin/component-install

build: install
	@echo build ...
	@./node_modules/.bin/component-build

.PHONY: build
