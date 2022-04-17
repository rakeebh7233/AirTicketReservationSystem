const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    email_address: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    building_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    street: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    passport_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    passport_expiration: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    passport_country: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'customer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email_address" },
        ]
      },
    ]
  });
};
