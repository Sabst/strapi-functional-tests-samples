'use strict';

module.exports = {
  reset : function * (order) {
    order.confirmationDate = null;
    order.paymentDate = null;
    yield order.save();
    return order;
  },
  confirm : function * (order) {
    order.confirmationDate = new Date();
    yield order.save();
    return order;
  },
  pay : function * (order) {
    order.paymentDate = new Date();
    yield order.save();
    return order;
  }
}
