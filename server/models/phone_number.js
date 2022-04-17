const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('phone_number', {
    username: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'airline_staff',
        key: 'username'
      }
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'phone_number',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone_number" },
        ]
      },
      {
        name: "username",
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
