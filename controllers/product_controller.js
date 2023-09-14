import ProductModel from "../models/product_model.js"

export const AddProduct = async (req, resp) => {

  const { name, price,subCategory, quantity, category, description, offerPrice, brand } = req.body

  const product_img = req.file?.filename || null


  if(product_img == null){
    return resp.status(401).send({
        code: 0,
        status: 0,
        message: 'Add Your Product Image',
    })
  }

  if (!name) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Enter Product Name',
    })
  }
  if (!price) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Enter Product Price',
    })
  }

  if (!quantity) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Enter Product Quantity',
    })
  }
  if (!category) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Add Product Category',
    })
  }
  if (!subCategory) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Add Product subCategory',
    })
  }
  
  if (!description) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Add small Product description',
    })
  }
  if (!brand) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Add Product brand Name',
    })
  }

  try {

    const add_product =  ProductModel({name, price, quantity,subCategory, category, description, offerPrice, brand, image: product_img})
    const save_add_product = await add_product.save()
    resp.status(201).send({
      status: 1,
      message: 'Product Add Successfully',
      product :save_add_product
    })
  } catch (error) {
    resp.status(500).send({
      status: 0,
      message: 'Server Error',
      error
    })
  }
}

export const ProductList = async (req, resp) => {
  const page = req.body.page || 1
  const perPage = req.body.limit || 20

  const { category, sub_category, sortOrder } = req.body

  const skip = (page - 1) * perPage;

  try {
    if(category || sub_category){
      let query = {};
      query = {
        $or: [{ category }, { sub_category }],
      };
      const product_list = await  ProductModel.find(query).skip(skip).limit(perPage)
      resp.status(200).send({
        status: 1,
        message: 'Get All Product Successfully',
        product_length:product_list.length,
        all_product :product_list
      })
    }else if(sortOrder){
      const sortDirection = sortOrder === 'desc' ? -1 : 1;
      const product_list = await  ProductModel.find({}).sort({ price: sortDirection }).skip(skip).limit(perPage)
      resp.status(200).send({
        status: 1,
        message: 'Get All Product Successfully',
        product_length:product_list.length,
        all_product :product_list
      })
    }else{
      const product_list = await  ProductModel.find({}).skip(skip).limit(perPage)
      resp.status(200).send({
        status: 1,
        message: 'Get All Product Successfully',
        product_length:product_list.length,
        all_product :product_list
      })
    }
   
  } catch (error) {
    resp.status(500).send({
      status: 0,
      message: 'Server Error',
      error
    })
  }
}

export const ProductDelete = async (req, resp) => {
 const {product_id } =  req.body
  try {
    const product_delete = await  ProductModel.findByIdAndRemove(product_id)
    resp.status(201).send({
      status: 1,
      message: 'Delete Product Successfully',
      AllProduct :product_delete
    })
  } catch (error) {
    resp.status(500).send({
      status: 0,
      message: 'Server Error',
      error
    })
  }
}

export const EditProduct = async (req, resp) => {
  const { product_id, name, price,subCategory, quantity, category, description, offerPrice, brand } = req.body
  const product_img = req.file?.filename || null
  if (!product_id) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      developer_message: ' Product id is required',
    })
  }

  if (!name) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Enter Product Name',
    })
  }
  if (!price) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Enter Product Price',
    })
  }

  if (!quantity) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Enter Product Quantity',
    })
  }
  if (!category) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Add Product Category',
    })
  }
  if (!subCategory) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Add Product subCategory',
    })
  }
  
  if (!description) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Add small Product description',
    })
  }
  if (!brand) {
    return resp.status(401).send({
      code: 0,
      status: 0,
      message: 'Add Product brand Name',
    })
  }

  try {

    if(product_img == null){
      const edit_product = await  ProductModel.findByIdAndUpdate(product_id,{name, price, quantity,subCategory, category, description, offerPrice, brand},{new:true})
      resp.status(200).send({
        status: 1,
        message: 'Product Edit Successfully',
        product :edit_product
      })
    }else{
      const edit_product = await  ProductModel.findByIdAndUpdate(product_id,{name, price, quantity,subCategory, category, description, offerPrice, brand, image:product_img},{new:true})
      resp.status(200).send({
        status: 1,
        message: 'Product Edit Successfully',
        product :edit_product
      })
    }
   
  } catch (error) {
    resp.status(500).send({
      status: 0,
      message: 'Server Error',
      error
    })
  }
 }

export const  searchProduct = async (req, resp)=>{
  const { search } =  req.body
  try {
    const product_search = await  ProductModel.find({
      $or:[
          {name:{'$regex':search,'$options':'i'}},
          {brand:{'$regex':search,'$options':'i'}},
      ]
     })
    resp.status(200).send({
      status: 1,
      message: 'Search list',
      searchProduct :product_search
    })
  } catch (error) {
    resp.status(500).send({
      status: 0,
      message: 'Server Error',
      error
    })
  }
 }