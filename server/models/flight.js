const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('flight', {
    airline_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      references: {
        model: 'airline',
        key: 'airline_name'
      }
    },
    flight_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    departure_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    departure_time: {
      type: DataTypes.TIME,
      allowNull: false,
      primaryKey: true
    },
    departure_airport_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'airport',
        key: 'airport_code'
      }
    },
    arrival_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    arrival_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    arrival_airport_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'airport',
        key: 'airport_code'
      }
    },
    airplane_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      references: {
        model: 'airplane',
        key: 'airplane_id'
      }
    },
    base_price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'flight',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "flight_number" },
          { name: "departure_date" },
          { name: "departure_time" },
        ]
      },
      {
        name: "airline_name",
        using: "BTREE",
        fields: [
          { name: "airline_name" },
        ]
      },
      {
        name: "departure_airport_code",
        using: "BTREE",
        fields: [
          { name: "departure_airport_code" },
        ]
      },
      {
        name: "arrival_airport_code",
        using: "BTREE",
        fields: [
          { name: "arrival_airport_code" },
        ]
      },
      {
        name: "airplane_id",
        using: "BTREE",
        fields: [
          { name: "airplane_id" },
        ]
      },
    ]
  });
};
