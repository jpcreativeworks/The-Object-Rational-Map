const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { restore } = require('../../models/Category');

// The `/api/tags` endpoint
// const Tag = require('../../models/Tag');


router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Category }, { model: Product, through: ProductTag }],      
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    }); //catch rest.json'
    res.status(200).json(tagData)
  } catch (err) {
    res.status(404).json(err);
  }
       }),

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then((tag) => {
    res.status(200).json(tag)
  })
    .catch((err) => {
      res.status(404).json(err)
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      // All the fields you can update and the data attached to the request body.

      tag_name: req.body.tag_name,


    },
    {
      // Gets the tags based on the id given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      // Sends the updated book as a json response
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
