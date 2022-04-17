const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ticket', {
    ticket_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    airline_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      references: {
        model: 'flight',
        key: 'airline_name'
      }
    },
    flight_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'flight',
        key: 'flight_number'
      }
    },
    departure_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      references: {
        model: 'flight',
        key: 'departure_date'
      }
    },
    departure_time: {
      type: DataTypes.TIME,
      allowNull: false,
      references: {
        model: 'flight',
        key: 'departure_time'
      }
    },
    travel_class: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    sold_price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    card_type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    card_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    card_expiration: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    name_on_card: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    purchase_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    purchase_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    email_address: {
      type: DataTypes.STRING(30),
      allowNull: true,
      references: {
        model: 'customer',
        key: 'email_address'
      }
    }
  }, {
    sequelize,
    tableName: 'ticket',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticket_id" },
        ]
      },
      {
        name: "email_address",
        using: "BTREE",
        fields: [
          { name: "email_address" },
        ]
      },
      {
        name: "airline_name",
        using: "BTREE",
        fields: [
          { name: "airline_name" },
          { name: "flight_number" },
          { name: "departure_date" },
          { name: "departure_time" },
        ]
      },
    ]
  });
};
