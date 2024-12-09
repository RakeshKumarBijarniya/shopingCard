const router = require("express").Router();
const authC = require("../controllers/authController");
const productC = require("../controllers/productController");
const catProductC = require("../controllers/catProduct");
const upload = require("../middleware/multer");

router.post("/createAccount", authC.createAccount);
router.post("/login", authC.login);

router.post("/addProduct", upload.single("image"), productC.addProduct);
router.get("/allProduct", productC.getAllProduct);
router.get("/getUpdateProData/:id", productC.getUpdateProData);
router.put(
  "/updateProduct/:id",
  upload.single("image"),
  productC.updateProduct
);
router.delete("/deleteProduct/:id", productC.deleteProduct);
router.post("/cartDetails", productC.cartDetails);
router.post("/cartDetailng", catProductC.cartDetaling);

router.post(
  "/addCatProduct",
  upload.single("image"),
  catProductC.addCatProduct
);
router.get("/allCatProduct", catProductC.getAllCatProduct);
router.delete("/deleteCatProduct/:id", catProductC.deleteCatProduct);
router.get("/getUpdateCaData/:id", catProductC.getCatProdData);
router.put(
  "/updateCatProduct/:id",
  upload.single("image"),
  catProductC.updateCatProduct
);

router.get("/getProductCat", catProductC.getProductCategory);

router.post("/orders", catProductC.ordersDispatch);
router.get("/getMyOrder/:email", catProductC.myOrder);

module.exports = router;
