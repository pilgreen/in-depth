.PHONY: docs

css:
	scss --update src/scss:assets/css --style compressed

docs: styles
	cd src/hugo/ && hugo
