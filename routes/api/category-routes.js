const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],      
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// find one category by its `id` value
router.get('/:id', async (req, res) => {  
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],  
    });

    if (!categoryData) {
      res.status(404).json({ message: 'Sorry, no category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
 // create a new category
router.post('/', (req, res) => { 
  Category.create({    
    category_name: req.body.category_name,
  })
    .then((newCategory) => {     
      res.json(newCategory);
    })
    .catch((err) => {
      
      res.json(err);
    });
});
// update a category by its `id` value
router.put('/:id', (req, res) => {  
  Category.update(req.body, 
    {
      where: {
        id: req.params.id,
      },
    })
    .then((categoryUpdate) => {
      if (!categoryUpdate[0]) {
        res.status(404).json({ message: 'Sorry, no category found with that id!'});
        return;
      }
      res.json(categoryUpdate);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
  // delete a category by its `id` value
  router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(deletedChosenCategory => {
      if (!deletedChosenCategory) {
        res.status(404).json({ message: 'Sorry, no Category mataches that ID.'});
        return;
      }
      res.json(deletedChosenCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

module.exports = router;
