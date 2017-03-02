import hooks from 'hooks'; // eslint-disable-line

import DreddHelpers from '../../src/lib/dredd-helpers';

import Todo from '../../src/models/todo';

// change this to run only specific tests, specified as an array of strings
// userful when testing individual API calls or small groups
// do not save this to your repo if it's changed!
// ex: DredHelpers.runOnly([' > Some Test', ' > Some Other Test']);
DreddHelpers.runOnly([]);

DreddHelpers.addType({
  defaultInstanceParams: { id: 1, title: 'test' },
  fakeInstanceParams: { id: 'fake', title: 'fake' },
  model: Todo,

  tests: {
    create: 'Todos > Todo Collection > Create a Todo',
    del: 'Todos > Todo > Delete a Todo > Example 1',
    deleteAll: 'Todos > Todo Collection > Archive Completed Todos',
    get: 'Todos > Todo > Get a Todo > Example 1',
    list: 'Todos > Todo Collection > List All Todos',
    update: 'Todos > Todo > Update a Todo > Example 1',
  },
});

DreddHelpers.finish(hooks);
