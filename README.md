# Metaflux CLI

Metaflux CLI will improve development time in your Metaflux projects, from creating a new project from scratch to maintain your current ones.

## Instalation
```bash
npm i @rebelstack-io/metaflux-cli -g
```

## Creating a new project
### Usage
```bash
metaflux-cli create [name] [-d -dir] <arg>
```
This will create an empty project in dir, dir is not mandatory and by default will use current directory.
the create flag receive a nonmandatory parameter with the name of your project, the name by default will be "metaflux-boilerplate".
Note: if the name of the project exists in the dir will not be overridden and the program will terminate.
The boilerplate is fetched from [Github](https://github.com/rebelstackio/metaflux-boilerplate)


## Mantaining your projectst
### Creating new components

#### Usage
```bash
metaflux-cli component <name> [--type, -t] [--dir, -d]
```
Component subcommand receives a mandatory parameter with the name of the component to be created,
also, we can add the --type or -t flag to create a Class component (c), function component (f), or a Container (C), By default, will be f.
This subcommand  is meant to be run in your project root and if not specified with the --dir flag will try to create new components in current_folder/src/components
