const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('airplane', {
    airplane_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    airline_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      references: {
        model: 'airline',
        key: 'airline_name'
      }
    },
    num_seats: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    manufacturing_company: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'airplane',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "airplane_id" },
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
