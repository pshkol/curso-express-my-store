const { DataTypes, Model, Sequelize } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: 'customer_id',
    type: DataTypes.INTEGER,
    reference: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createAt: {
    field: 'create_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.OrderProduct.amount);
        }, 0)
      }
      return 0;
    }
  }
}

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId',
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Order',
      tableName: ORDER_TABLE,
      timestamps: false,
    }
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
