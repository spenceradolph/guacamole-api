# guacamole-api

This is a simple package that allows easier access to Apache Guacamole and its api.

Inspired heavily from the python [guacamole-api-wrapper](https://gitlab.com/gacybercenter/open/guacamole-api-wrapper), but in typescript.

> :warning: Not heavily tested.

## Install

```sh
npm i guacamole-api
```

## Basic Usage

```ts
import Guacamole from 'guacamole-api';

// Authenticates with user/pass and keeps a token for subsequent calls
const session = await Guacamole.session({
	host: 'http://10.0.1.100:8080/guacamole',
	datasource: 'mysql',
	username: 'guacadmin',
	password: 'guacadmin',
});

// users is typed!
const users = await session.list_users();
```
