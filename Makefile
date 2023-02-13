default:
	@echo "please select a command from makefile"

component:
	@mkdir ./src/components/$(source)/$(name)
	@cat ./src/components/AComponentSnippet/index.tsx | sed 's?SnippetComponent?'$(name)'?' | sed 's?some-classname?'$(name)'?' | sed 's?ISnippetComponentProp?'I$(name)Prop'?' > ./src/components/$(source)/$(name)/index.tsx
	@cat ./src/components/AComponentSnippet/index.scss | sed 's?some-classname?'$(name)'?'  > ./src/components/$(source)/$(name)/index.scss
	@git add ./src/components/$(source)/$(name)/index.scss ./src/components/$(source)/$(name)/index.tsx

page:
	@mkdir ./src/pages/$(name)
	@cat ./src/components/AComponentSnippet/index.tsx | sed 's?SnippetComponent?'$(name)'?' | sed 's?some-classname?'$(name)'?' | sed 's?ISnippetComponentProp?'I$(name)Prop'?' > ./src/pages/$(name)/index.tsx
	@cat ./src/components/AComponentSnippet/index.scss | sed 's?some-classname?'$(name)'?'  > ./src/pages/$(name)/index.scss
	@git add ./src/components/$(source)/$(name)/index.scss ./src/components/$(source)/$(name)/index.tsx
