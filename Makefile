.PHONY:in-depth.css

in-depth.css:
	lessc src/less/in-depth.less --clean-css > in-depth.css
