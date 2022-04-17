const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('airline_staff', {
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    airline_name: {
      type: DataTypes.STRING(30),
      allowNull: true,
      references: {
        model: 'airline',
        key: 'airline_name'
      }
    },
    fname: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    lname: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'airline_staff',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "airline_name",
        using: "BTREE",
        fields: [
          { name: "airline_name" },
        ]
      },
    ]
  });
};
