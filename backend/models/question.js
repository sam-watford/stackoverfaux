"use strict";
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "questions",
    }
  );

  // Define associations
  Question.associate = function (models) {
    Question.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    Question.hasMany(models.Answer, {
      foreignKey: "question_id",
      onDelete: "CASCADE",
    });
    Question.hasMany(models.Comment, {
      foreignKey: "question_id",
      onDelete: "CASCADE",
    });
  };

  return Question;
};
