const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    try {
      const catagoryData = await Category.findAll({
        attributes: ['id', 'category_name'],
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
          },
        ],
      });
      res.status(200).json(catagoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // be sure to include its associated Products

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const catagoryData = await Category.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      attributes: ['id', 'category_name'],
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        },
      ],
    });

    if (!catagoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
