default:
	@echo "please select a command from makefile"

.PHONY: component

component:
	@npx plop --plopfile ./plopTemplates/component.js --componentName=$$COMPONENT_NAME

page:
	@mkdir ./src/pages/$(name)
	@cat ./src/components/AComponentSnippet/index.tsx | sed 's?SnippetComponent?'$(name)'?' | sed 's?some-classname?'$(name)'?' | sed 's?SnippetComponentProp?'$(name)Prop'?' > ./src/pages/$(name)/index.tsx
	@cat ./src/components/AComponentSnippet/index.scss | sed 's?some-classname?'$(name)'?'  > ./src/pages/$(name)/index.scss
	@git add ./src/pages/$(name)/index.scss ./src/pages/$(name)/index.tsx

icon:
	@mkdir ./src/images/icons/Icon$(name)
	@cat ./src/images/icons/aNewIconSnippet/index.tsx | sed 's?AIconName?'Icon$(name)'?' > ./src/images/icons/Icon$(name)/index.tsx
	@#touch ./src/images/icons/Icon$(name)/preview.svg
	@#echo $(preview) > ./src/images/icons/Icon$(name)/preview.svg
	@#git add ./src/images/icons/Icon$(name)/preview.svg
	@git add ./src/images/icons/Icon$(name)/index.tsx

