"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
    }
  );

  // Define associations
  User.associate = function (models) {
    User.hasMany(models.Question, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    User.hasMany(models.Answer, { foreignKey: "user_id", onDelete: "CASCADE" });
    User.hasMany(models.Comment, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
  };

  return User;
};
