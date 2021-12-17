const {Model, DataTypes, Sequelize} = require("sequelize");

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
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
  createAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'create_at',
  }
}

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, { as: 'products', foreignKey: 'categoryId'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
    }
  }
}

module.exports = { CATEGORY_TABLE, Category, CategorySchema };
