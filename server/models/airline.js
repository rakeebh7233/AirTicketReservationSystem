const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('airline', {
    airline_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'airline',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "airline_name" },
        ]
      },
    ]
  });
};
