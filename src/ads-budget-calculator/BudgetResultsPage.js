const HandleBars = require('handlebars');

const thisTemplate = () => `
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="/static/styleguide.css">
  </head>
  <body>
    <div style="text-align: center;">
      Budget for this month (in AUD):
      <h1>{{{budgetToSpend}}}</h1>
      <a href="/budget/facebook">Go back</a>
    </div>
  </body>
`;

module.exports = viewModel => {
  return {
    to: (mediaType) => {
      if (mediaType !== 'text/html') {
        throw new Error(`Invalid media type ${mediaType}`);
      }
      return HandleBars.compile(thisTemplate())(viewModel);
    }
  };
};
