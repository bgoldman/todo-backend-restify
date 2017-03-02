/* eslint-disable no-param-reassign */

import _ from 'lodash';
import config from 'config';
import request from 'superagent';

const localApiRoot = config.get('server.api_root');

export default {
  testFilter: [],

  types: [],

  addType(opts) {
    this.types.push({
      defaultInstanceParams: opts.defaultInstanceParams,
      fakeInstanceParams: opts.fakeInstanceParams,
      model: opts.model,

      tests: {
        create: opts.tests.create,
        del: opts.tests.del,
        deleteAll: opts.tests.deleteAll,
        get: opts.tests.get,
        list: opts.tests.list,
        update: opts.tests.update,
      },
    });
  },

  async createInstance(type) {
    const params = type.defaultInstanceParams;

    delete params.id;

    const response = await request.post(localApiRoot + type.model.basePath).send(params);

    return response.body;
  },

  async deleteInstance(instance) {
    const response = await request.del(localApiRoot + instance.url);

    return response.body;
  },

  finish(hooks) {
    _.each(this.types, (type) => {
      this.finishType(type, hooks);
    });
  },

  finishType(type, hooks) {
    // if we're only running one test, skip the other tests
    hooks.beforeEach((transaction) => {
      if (this.testFilter.length === 0) {
        return;
      }

      _.each(this.testFilter, (name) => {
        if (!_.endsWith(transaction.name, name)) {
          transaction.skip = true;
        }
      });
    });

    if (type.tests.create) {
      hooks.after(type.tests.create, async (transaction, done) => {
        if (!transaction.skip) {
          await this.deleteInstance(JSON.parse(transaction.real.body));
        }

        done();
      });
    }

    if (type.tests.del) {
      hooks.before(type.tests.del, async (transaction, done) => { // eslint-disable-line
        if (!transaction.skip) {
          const instance = await this.createInstance(type);

          transaction.fullPath = instance.url;
        }

        done();
      });
    }

    if (type.tests.deleteAll) {
      hooks.before(type.tests.deleteAll, async (transaction, done) => { // eslint-disable-line
        if (!transaction.skip) {
          await this.createInstance(type);
        }

        done();
      });
    }

    if (type.tests.get) {
      hooks.before(type.tests.get, async (transaction, done) => { // eslint-disable-line
        if (!transaction.skip) {
          const instance = await this.createInstance(type);

          transaction.fullPath = instance.url;
        }

        done();
      });

      hooks.after(type.tests.get, async (transaction, done) => {
        if (!transaction.skip) {
          await this.deleteInstance(JSON.parse(transaction.real.body));
        }

        done();
      });
    }

    if (type.tests.list) {
      hooks.before(type.tests.list, async (transaction, done) => { // eslint-disable-line
        if (!transaction.skip) {
          await this.createInstance(type);
        }

        done();
      });

      hooks.after(type.tests.list, async (transaction, done) => {
        if (!transaction.skip) {
          await this.deleteInstance(JSON.parse(transaction.real.body)[0]);
        }

        done();
      });
    }

    if (type.tests.update) {
      hooks.before(type.tests.update, async (transaction, done) => { // eslint-disable-line
        if (!transaction.skip) {
          const instance = await this.createInstance(type);

          transaction.fullPath = instance.url;
        }

        done();
      });

      hooks.after(type.tests.update, async (transaction, done) => {
        if (!transaction.skip) {
          await this.deleteInstance(JSON.parse(transaction.real.body));
        }

        done();
      });
    }
  },

  runOnly(tests) {
    this.testFilter = tests;
  },
};
