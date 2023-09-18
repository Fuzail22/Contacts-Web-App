<h1 align="center">Contacts-Web-App</h1>

<p align="center"> This is a contact management web application where users can search, store, update, delete and view contacts. This is not only a full fledged application also, consists of backend which can supports api requests for other applications too.
  
## live: https://fuzail22.github.io/Contacts-Web-App

# Folder Structure

- Client consists of fronted code built using react js and set for continous deployment using github actions workflow.
- Server consists of backend code built using express js and mongodb. Set for continous deployment using render.

# To deploy using GitHub actions workflow

- add workflow as in [deployclient.yml](https://github.com/Fuzail22/Browse_Stock_OHLCV/blob/main/.github/workflows/deployClient.yml). No changes needed if same folder structure is maintained.
- add homepage attribute in package.json
- add write permission in repository settings in general under actions section.
- finally commit and push your changes or create a PR.
- when you have you [gh-pages](https://github.com/Fuzail22/Contacts-Web-App/tree/gh-pages) branch built. Goto settings and change source to deploy from branch then select gh-pages.

### Note

-One of your dependencies, babel-preset-react-app, is importing the
"@babel/plugin-proposal-private-property-in-object" package without
declaring it in its dependencies. This is currently working because
"@babel/plugin-proposal-private-property-in-object" is already in your
node_modules folder for unrelated reasons, but it may break at any time.
babel-preset-react-app is part of the create-react-app project, which
is not maintianed anymore. It is thus unlikely that this bug will
ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to
your devDependencies to work around this error. This will make this message
go away.
