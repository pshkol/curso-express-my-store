const {DataTypes, Sequelize, Model} = require("sequelize");

const {CATEGORY_TABLE} = require('./category.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  createAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'category_id',
    reference: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }
}

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Product',
      tableName: PRODUCT_TABLE,
      timestamps: false,
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
