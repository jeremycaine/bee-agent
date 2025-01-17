# bee-agent
Development work with Bee Agent platform

npm init
update package.json for module type and dev script
```
{
  "name": "bee-workflow",
  "version": "1.0.0",
  "description": "Bee Agent Framework workflow example",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bee-agent-framework": "^0.0.57",
    "dotenv": "^16.4.7"
  }
}

```
ollama pull llama3.1

npm install dotenv
npm install bee-agent-framework
npm install ollama

npm run dev
