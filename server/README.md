# Express Server

Although NuxtJS has a built in server for server side rendering, we will use nuxt as middleware so that [Express](https://expressjs.com/) can handle the following

- `/health` endpoint
- graceful shutdowns per `SIGINT` and `SIGTERM`

which are part of Best Practices for running Node.js in Containers.

See also [nuxtjs.org/docs/internals-glossary/nuxt-render/](https://nuxtjs.org/docs/internals-glossary/nuxt-render/)