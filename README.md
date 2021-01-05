# Metaflux CLI

Metaflux CLI will improve development time in your Metaflux projects, from creating a new project from scratch to maintain your current ones.

## Instalation
```bash
npm i @rebelstack-io/metaflux-cli -g
```

## Usage
```bash
metaflux-cli [-c --create] <name> [-d -dir] <arg>
```
This will create an empty project in dir, dir is not mandatory and by default will use current directory.
the create flag receive a nonmandatory parameter with the name of your project, the name by default will be "metaflux-boilerplate".
Note: if the name of the project exists in the dir will not be overridden and the program will terminate.
The boilerplate is fetched from [Github](https://github.com/rebelstackio/metaflux-boilerplate)

