const {getProducts,
     addProduct,
      getProductById, 
      deleteProduct,
       editeProduct,
       test,
       getDistinctGender,
       getDistinctCategory,
       getProductBygenderByCategory,
       getProductBygenderByCategoryDistinctTitles,
       getColors,
       getAllSizes} = require('../controllers/productControllers');

const express = require("express");

const router = express.Router();

router.get("/", test);
router.post("/addProduct", addProduct);
router.get("/getProducts", getProducts);
router.get("/getProductById/:id", getProductById);
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/editProduct/:id", editeProduct);
router.get("/getDistinctGender",getDistinctGender);
router.get("/getDistinctCategory",getDistinctCategory);
router.get("/getProductBygenderByCategory/:gend/:catego",getProductBygenderByCategory);
router.get("/getProductBygenderByCategoryDistinctTitles/:gend/:catego",getProductBygenderByCategoryDistinctTitles);
router.get("/getColors/:title",getColors);
router.get("/getAllSizes",getAllSizes);
module.exports = router;