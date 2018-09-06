# Some old and obsolete test boilerplate with React Typescript Flux Template

**Use at your own risk, not maintained or used**

This is a simple collection of utilities forming a transparent platform to start working off of for medium to large scale front end React applications.

This is in no way perfect, but is using an accumulation of techniques and technology that I found useful in my other React projects.

I am releasing this with an MIT license both for others benefit, and hopefully also to learn from others.



## Build and run

Install dependencies

```
npm install
```

Runs linting, and builds application
```
npm run build
```

Runs linting, build, and deploys the dev server
```
npm run serve
```
Navigate to http://localhost:8080 to start working.

You also can use the base tools such as tsc for a straight built, tslint for linting,
devserver.js for just running the local deployment.

## Environment Variables

Use NODE_ENV = {development or production}, LIVE = {true or false}, WS_LIVE = {true or false}
to dictate the configuration at build time.

Note: the index.html has some hard coded dependencies due to SignalR being weird,
so you will need to comment the jquery and signalr dependency from that if you truly
do not want it included. Like if you are disconnected from the internet. Otherwise, in the code
switching the environment variable will cause the code to inject mock providers.
