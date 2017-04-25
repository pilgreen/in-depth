.PHONY: docs

css:
	scss --update src/scss:assets/css --style compressed

docs: css
	cd src/hugo/ && hugo
