css:
	scss --update src/scss:assets/css --style compressed

pages: css
	cd src/hugo/ && hugo 
	cd src/hugo/public && git add --all && git commit -m "updating pages site"
	git push origin gh-pages
