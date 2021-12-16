const { Model, DataTypes, Sequelize } = require("sequelize");
const {USER_TABLE} = require("./user.model");

const TABLE_NAME = "customers";

const CustomerSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
    field: 'create_at',
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    reference: {
      model: USER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Customer',
      tableName: TABLE_NAME,
      timestamps: false,
    }
  }
}

module.exports = { Customer, CustomerSchema, TABLE_NAME };
