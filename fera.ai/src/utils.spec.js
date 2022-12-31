const { expect } = require('chai');

require('./utils')(globalThis);

describe('Script Runner', () => {
  const removeFirstItem = array => array.splice(0, 1);

  it('exits as long as the script satisfies the exit condition', async () => {
    const result = await globalThis.DalineNails.runScript({
      fn: () => 'EXIT',
      exitCondition: result => result.returnValue === 'EXIT',
      everyMilliseconds: 1
    });
    expect(result.returnValue).eql('EXIT');
    expect(result.runCount).eql(1);
  });

  it('when returnValue returns the first undefined value', async () => {
    const returnValues = ['NO_RESULT', 'NO_RESULT', 'NO_RESULT']
    const result = await globalThis.DalineNails.runScript({
      fn: () => removeFirstItem(returnValues)[0],
      everyMilliseconds: 1
    });
    expect(result.returnValue).eql(undefined);
    expect(result.runCount).eql(4);
  });
});
