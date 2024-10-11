"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "comments",
    }
  );

  // Define associations
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    Comment.belongsTo(models.Question, {
      foreignKey: "question_id",
      onDelete: "CASCADE",
    });
    Comment.belongsTo(models.Answer, {
      foreignKey: "answer_id",
      onDelete: "CASCADE",
    });
  };

  return Comment;
};
