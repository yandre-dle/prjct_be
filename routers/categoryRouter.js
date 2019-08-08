var express = require('express')
var router = express.Router()
var { allCategories } = require('../controllers');

router.get('/categories', allCategories.getCategory);
router.post('/addcategories', allCategories.addCategory)
router.get('/cat', allCategories.getcat);
router.delete('/catdelete/:jenis', allCategories.deleteCategory);
router.put('/editcategory/:id', allCategories.editCategory);
router.get('/searchcategory', allCategories.searchCategory);
// dasbord
router.get('/getusers', allCategories.totalUsers);
router.get('/getproducts', allCategories.totalProduts);
router.get('/getorder', allCategories.totalOrder);
router.get('/getconfirm', allCategories.totalOrderNeedConfirmation);
router.get('/getwishlist', allCategories.totalWishlist);
router.get('/ordersuccess', allCategories.orderSuccess);
module.exports = router;