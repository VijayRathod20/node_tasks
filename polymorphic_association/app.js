const express = require("express");
const app = express();
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const userRoute = require("./routes/Router");
const userRoute2 = require("./routes/Router2");

const model = require("./models");
const Images = model.images;
const Comments = model.comments;
const Videos = model.videos;
const Tag = model.tags;
const Tag_Taggable = model.tag_taggable;
Images.hasMany(Comments, {
  foreignKey: "commentableId",
  constraints: false,
  scope: {
    commentableType: "image",
  },
});

Comments.belongsTo(Images, { foreignKey: "commentableId", constraints: false });

Videos.hasMany(Comments, {
  foreignKey: "commentableId",
  constraints: false,
  scope: {
    commentableType: "video",
  },
});
Comments.belongsTo(Videos, { foreignKey: "commentableId", constraints: false });

Images.belongsToMany(Tag, {
  through: {
    model: Tag_Taggable,
    unique: false,
    scope: {
      taggableType: "image",
    },
  },
  foreignKey: "taggableId",
  constraints: false,
});

Tag.belongsToMany(Images, {
  through: {
    model: Tag_Taggable,
    unique: false,
  },
  foreignKey: "id",
  constraints: false,
});

Videos.belongsToMany(Tag, {
  through: {
    model: Tag_Taggable,
    unique: false,
    scope: {
      taggableType: "video",
    },
  },
  foreignKey: "taggableId",
  constraints: false,
});
Tag.belongsToMany(Videos, {
  through: {
    model: Tag_Taggable,
    unique: false,
  },
  foreignKey: "id",
  constraints: false,
});

app.use("/onetomany", userRoute);

app.use("/manytomany", userRoute2);
