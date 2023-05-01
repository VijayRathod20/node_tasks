const Images = require("../models").images;
const Videos = require("../models").videos;
const Comments = require("../models").comments;
const Tag = require("../models").tags;
const Tag_Taggable = require("../models").tag_taggable;
const onetomany = async (req, res) => {
  // const imageData = await Images.create({
  //     title: "Image 1",
  //     text: "https://www.google.com"
  // });
  // const videoData = await Videos.create({
  //     title: "Video 1",
  //     text: "https://www.google.com"
  // })

  // const imageData = await Images.create({
  //     title: "Image 1",
  //     text: "https://www.google.com",
  //     comments: [
  //         {
  //             title: "Comment 1",
  //         }
  //     ]
  // },
  //     {
  //         include: [Comments]
  //     }
  // )

  //   const videoData = await Videos.create(
  //     {
  //       title: "Video 4",
  //       text: "https://www.google.com",
  //       comments: [
  //         {
  //           title: "Comment 3",
  //         },
  //       ],
  //     },
  //     {
  //       include: [Comments],
  //     }
  //   );

  const imageComments = await Images.findAll({
    include: [Comments],
  });
  res.json(imageComments);
};

const manytomany = async (req, res) => {
  const imageData = await Images.create(
    {
      title: "Image 1",
      text: "https://www.google.com",
      tags: [
        {
          name: "Tag 1",
          tag_taggables: {
            taggableType: "image",
          },
        },
      ],
    },
    {
      include: [Tag],
    }
  );

  const videoData = await Videos.create(
    {
      title: "Video 1",
      text: "https://www.google.com",
      tags: [
        {
          name: "Tag 2",
          tag_taggables: {
            taggableType: "video",
          },
        },
      ],
    },
    {
      include: [Tag],
    }
  );

  res.json({ imageData, videoData });
};

module.exports = { onetomany, manytomany };
