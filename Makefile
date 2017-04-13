.PHONY: styles docs

styles:
	scss --update src/scss:styles --style compressed

docs: styles
	cd src/hugo/ && hugo
	rsync -r --delete styles docs/styles
	rsync -r --delete scripts docs/scripts
