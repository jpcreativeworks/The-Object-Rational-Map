const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');
const { restore } = require('../../models/Category');

// The `/api/tags` endpoint
// const Tag = require('../../models/Tag');


router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],      
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
    });
    
    if (!tagData) {
      res.status(404).json({ message: 'Cannot find a tag for requested ID!!' });
      return;
    } //made catch rest.json'
    res.status(200).json(tagData)
  } catch (err) {
    res.status(404).json(err);
  }
       }),

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name:req.body.tag_name
  })
  .then((newTagData) => res.json(newTagData))
    .catch((err) => {
      console.log(err);
      res.status(404).json(err)
    })
});

router.put('/:id',  (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
      where: { 
        id: req.params.id 
      },
   })
    .then((tag) => {
      return Tag.findAll({where: { product_id: req.params.id } }); 
    }) 
    .then((tags) => {
      const tagIds = tags.map(({ id }) => id);
    
      // All the fields you can update and the data attached to the request body.
      const newTags = req.body.tagName
        .filter((tag_name) => !tagIds.includes(tag_name))
        .map(({ id }) => {
          return {
            id: req.params.id,
            tag_name,
          };
        });
      // Gets the tags based on the id given in the request parameters
      const tagsToRemove = tags 
        .filter(({ id }) => !req.body.id.includes(tag_name))
        .map(({ id}) => id);

      return Promise.all([
        Tag.destroy({ where: { id: tagsToRemove } }),
        Tag.bulkCreate(newTags),
      ]);
    })
    .then((updatedTag) => res.json(updatedTag))
    // Sends the updated book as a json response
        .catch ((err) => {
    res.status(400).json(err);
  });
});           


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTagChoice) => {
      if(!deletedTagChoice) {
      res.status(404).json({ message: 'Sorry, no Tag found by that Id.'});
      return;
      }
      res.json(deletedTagChoice);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
