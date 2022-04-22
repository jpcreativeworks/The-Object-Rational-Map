// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category 1:1
Product.hasOne(Category, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});
Category.belongsTo(Product, {
  foreignKey: 'product_id',
});

// Categories have many Products 1:+
// Product.hasOne(Category, {
//   foreignKey: 'category_id',
//   onDelete: 'CASCADE',
// });
// Category.belongsTo(Product, {
//   foreignKey: 'category_id',
// });
  // Define a cagegory as having many products, thus creating a foreign key in the `category_id` table
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});
  // The association can also be created from the category side
Category.belongsTo(Product, {
  foreignKey: 'category_id',
});
// Products belongToMany Tags (through ProductTag)
Product.hasOne(ProductTag, {
  foreignKey: 'product_tag',
  onDelete: 'CASCADE',
});

ProductTag.belongsTo(Product, {
  foreignKey: 'product_tag',
});

Product.hasMany(Tag, {
  foreignKey: 'tag_id',
  onDelete: 'CASCADE',
});

Tag.belongsTo(Product, {
  foreignKey: 'tag_id',
});
// Tags belongToMany Products (through ProductTag)
Product.hasOne(ProductTag, {
  foreignKey: 'product_tag',
  onDelete: 'CASCADE',
});
Tag.belongsTo(ProductTag, {
  foreignKey: 'product_tag',
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
