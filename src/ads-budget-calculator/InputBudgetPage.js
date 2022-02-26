const thisTemplate = () => `
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="/static/styleguide.css">
    <style>
      html {
        margin-left: 8px;
        margin-right: 8px;
      }
      body {
        max-width: 720px;
        margin-left: auto;
        margin-right: auto;
      }
      .input-wrapper {
        margin-bottom: 20px;
      }
    </style>
    <link rel="stylesheet" href="/static/styleguide.css">
  </head>
  <body>
    <form method="POST">
      <div class="input-wrapper">
        <label class="input-label" for="previousBudget">Budget from previous period (AUD):</label>
        <input
          type="number"
          placeholder="9999"
          class="input-field"
          name="previousBudget"
          id="previousBudget"
          required
        >
      </div>
      <div class="input-wrapper">
        <label class="input-label" for="totalSales">Ad Sales from previous period (AUD):</label>
        <input
          type="number"
          placeholder="9999"
          class="input-field"
          name="totalSales"
          id="totalSales"
          required
        >
      </div>
      <div class="inputs-controls">
        <button class="input-btn primary">Calculate Budget</button>
      </div>
    </form>
  </body>
`;

module.exports = () => {
  return {
    to: (mediaType) => {
      if (mediaType !== 'text/html') {
        throw new Error(`Invalid media type ${mediaType}`);
      }
      return thisTemplate();
    }
  };
};
