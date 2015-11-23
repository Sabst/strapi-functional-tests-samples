'use strict';

const model = 'order';

/**
 * A set of functions called "actions" for `order`
 */

module.exports = {

  /**
   * Get order entries.
   *
   * @return {Object|Array}
   */

  find: function * () {
    this.model = model;
    try {
      let order = yield strapi.hooks.blueprints.find(this);
      this.body = order;
    } catch (err) {
      strapi.log.error(err);
      this.body = err;
    }
  },

  /**
   * Get a specific order.
   *
   * @return {Object|Array}
   */

  findOne: function * () {
    this.model = model;
    try {
      let order = yield strapi.hooks.blueprints.findOne(this);
      this.body = order;
    } catch (err) {
      strapi.log.error(err);
      this.body = err;
    }
  },

  /**
   * Create a order.
   *
   * @return {Object}
   */

  create: function * () {
    this.model = model;
    try {
      let order = yield strapi.hooks.blueprints.create(this);
      this.body = order;
    } catch (err) {
      strapi.log.error(err);
      this.body = err;
    }
  },

  /**
   * Update a order.
   *
   * @return {Object}
   */

  update: function * () {
    this.model = model;
    try {
      let order = yield strapi.hooks.blueprints.update(this);
      this.body = order;
    } catch (err) {
      strapi.log.error(err);
      this.body = err;
    }
  },

  /**
   * Destroy a order.
   *
   * @return {Object}
   */

  destroy: function * () {
    this.model = model;
    try {
      let order = yield strapi.hooks.blueprints.destroy(this);
      this.body = order;
    } catch (err) {
      strapi.log.error(err);
      this.body = err;
    }
  },

  /**
   * Add an order to a specific order.
   *
   * @return {Object}
   */

  add: function * () {
    this.model = model;
    try {
      let order = yield strapi.hooks.blueprints.add(this);
      this.body = order;
    } catch (err) {
      strapi.log.error(err);
      this.body = err;
    }
  },

  /**
   * Remove a specific order from a specific order.
   *
   * @return {Object}
   */

  remove: function * () {
    this.model = model;
    try {
      let order = yield strapi.hooks.blueprints.remove(this);
      this.body = order;
    } catch (err) {
      strapi.log.error(err);
      this.body = err;
    }
  },

  /**
   * Reset an order.
   *
   * @return {Object}
   */

  reset: function * () {
    this.model = model;
    try {
      let order = yield strapi.hooks.blueprints.findOne(this);
      yield strapi.api.order.services.order.reset(order);
      this.body = yield order.save();
    } catch (err) {
      strapi.log.error(err);
      this.body = err;
    }
  },

  /**
   * Confirm an order.
   *
   * @return {Object}
   */

  confirm: function * () {
    this.model = model;
    try {
      let order = yield strapi.hooks.blueprints.findOne(this);
      yield strapi.api.order.services.order.confirm(order);
      this.body = yield order.save()
    } catch (err) {
      strapi.log.error(err);
      this.body = err;
    }
  },

  /**
   * Pay an order.
   *
   * @return {Object}
   */

  pay: function * () {
    this.model = model;
    try {
      let order = yield strapi.hooks.blueprints.findOne(this);
      yield strapi.api.order.services.order.pay(order);
      this.body = yield order.save();
    } catch (err) {
      strapi.log.error(err);
      this.body = err;
    }
  },

};
