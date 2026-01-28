import Room from "./Room.js";
import Question from "./Question.js";
import User from "./User.js";

// Define associations
Room.hasMany(Question, {
  foreignKey: "roomId",
  as: "questions",
});

Question.belongsTo(Room, {
  foreignKey: "roomId",
  as: "room",
});

User.hasMany(Room, {
  foreignKey: "userId",
  as: "rooms",
});

Room.belongsTo(User, {
  foreignKey: "userId",
  as: "owner",
});

export { Room, Question, User };
