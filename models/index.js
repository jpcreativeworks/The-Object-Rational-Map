// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category 1:+
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});


  // Define a cagegory as having many products, thus creating a foreign key in the `category_id` table
Category.hasMany(Product, {
  foreignKey: 'category_id',
});
  // The association can also be created from the category side

// Products belongToMany Tags (through ProductTag)


Product.belongsToMany(Tag, {
  foreignKey: 'product_id',
  through: ProductTag
});


// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: 'tag_id',
  through: ProductTag
});
module.exports = { Product, Category, Tag, ProductTag };
