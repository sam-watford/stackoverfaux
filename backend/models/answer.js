"use strict";
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define(
    "Answer",
    {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "answers",
    }
  );

  // Define associations
  Answer.associate = function (models) {
    Answer.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
    Answer.belongsTo(models.Question, {
      foreignKey: "question_id",
      onDelete: "CASCADE",
    });
    Answer.hasMany(models.Comment, {
      foreignKey: "answer_id",
      onDelete: "CASCADE",
    });
  };

  return Answer;
};
