const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reviews', {
    email_address: {
      type: DataTypes.STRING(30),
      allowNull: false,
      references: {
        model: 'customer',
        key: 'email_address'
      }
    },
    ticket_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'ticket',
        key: 'ticket_id'
      }
    },
    rating: {
      type: DataTypes.FLOAT(2,1),
      allowNull: true
    },
    comment: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'reviews',
    timestamps: false,
    indexes: [
      {
        name: "email_address",
        using: "BTREE",
        fields: [
          { name: "email_address" },
        ]
      },
      {
        name: "ticket_id",
        using: "BTREE",
        fields: [
          { name: "ticket_id" },
        ]
      },
    ]
  });
};
