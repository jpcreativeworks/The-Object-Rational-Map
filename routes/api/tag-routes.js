const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');
const { restore } = require('../../models/Category');


  // find all tags
  router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],      
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  // find a single tag by its `id`
  router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'Cannot find a tag for requested ID!!' });
      return;
    } 
    res.status(200).json(tagData)
  } catch (err) {
    res.status(404).json(err);
  }
       }),

router.post('/', (req, res) => {
  Tag.create({
    tag_name:req.body.tag_name
  })
  .then((newTagData) => res.json(newTagData))
    .catch((err) => {
      console.log(err);
      res.status(404).json(err)
    })
});
  // update a tag's name by its `id` value
  router.put('/:id',  (req, res) => {
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
    
      const newTags = req.body.tagName
        .filter((tag_name) => !tagIds.includes(tag_name))
        .map(({ id }) => {
          return {
            id: req.params.id,
            tag_name,
          };
        });
      const tagsToRemove = tags 
        .filter(({ id }) => !req.body.id.includes(tag_name))
        .map(({ id}) => id);

      return Promise.all([
        Tag.destroy({ where: { id: tagsToRemove } }),
        Tag.bulkCreate(newTags),
      ]);
    })
    .then((updatedTag) => res.json(updatedTag))
        .catch ((err) => {
    res.status(400).json(err);
  });
});           

  // delete on tag by its `id` value
  router.delete('/:id', (req, res) => {
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
