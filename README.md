# Gurúcomm Click To Call Widget

Gurúcomm Javascript Widget integrates an HTML Click to Call Button widget that you cn embed in your website via SDK Calls with your Click. The main features of our widget include:

- Unobtrusive integration to your website in a left or right corner.
- Standalone javascript file. No additional CSS or HTML files are included
- Configure color preferences and styles within your dashboard account.
- Configurable work schedules that prevent clients from calling you off hours.

## Getting started

Follow these steps to integrate the latest version of the plugin in your website.

- Include the javascript library within the **<HEAD>** HTML tag of your site:

```HTML
<script src="//cdn.gurucomm.mx/js/click-to-call/widget-1.0.0.js"></script>
```

- Initialize JS plugin with the following snippet before the closing *</BODY>* tag.

```HTML
<script>
  window.gClickToCall.init({
    apiKey: '<API-KEY>',
    phone: '<10-DIGIT-PHONE>'
  });
</script>
```

## Contributing

If you are thinking about making Gurúcomm Click To Call Widget better, or you just want to hack on it, that’s great! Fork this repository and follow these instructions:

### Dev Dependencies

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](https://nodejs.org/en/) - v6.9.1+
* [Gulp](https://gulpjs.com/)
* [Yarn](https://yarnpkg.com/en/)

### Setting up the dev environment

Install global `npm` dependencies via install command:

- Install Gulp:

```bash
npm install -g gulp
```

- Install Yarn:

```bash
npm install -g yarn
```

### Config.json file

Once the dependencies are installed, you need to setup your local config. Create a new file at `/config.json` and specify your settings. Default settings are stored in `/config.sample.json` for convinience.

```js
{
  "API_URL": "https://api.gurucomm.mx"
}
```

### Libraries

Install yarn dependencies.

```
yarn install
```

### Running / Development

You can use gulp to build the application or watch your updates. This mechanism is recommended for lint and ES6 code management.

```bash
gulp watch
```

### Testing

This application uses `karma` for unit and integration testing. Before you commit your changes, make sure you've tested everything.

- Install karma globally

```
npm install -g karma
```

- Run specs

```
npm test
```

**Note**: No Pull Request will be merged if karma build fails.

## Found an Issue?
If you find a bug in the source code or a mistake in the documentation, you can help us by
submitting an issue to this repository. Even better you can submit a Pull Request
with a fix.
