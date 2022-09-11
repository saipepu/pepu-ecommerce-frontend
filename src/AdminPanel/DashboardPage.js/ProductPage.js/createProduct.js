import { TextInput, Box, Group, Text, Button, Textarea, Input, Autocomplete } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategory, fetchCategory } from '../../../redux/category/action';
import { createProduct, fetchProduct, updateProduct } from '../../../redux/product/action';
import AdminModel from '../adminModel';
import styles from './style.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const selectedProduct = location.state?.message;
  const categoryData = useSelector((state) => state.categoryReducer);
  const { categories } = categoryData;
  const productData = useSelector((state) => state.productReducer);
  const { products } = productData;
  const allCategoryData = useSelector((state) => state.allCategoryReducer)
  const { allCategories } = allCategoryData;
  const autoCompleteData = allCategories?.message.map(item => item.name)
  console.log(autoCompleteData);

  let initialcValues = selectedProduct ? {
    name: selectedProduct.name,
    description: selectedProduct.description,
    price: selectedProduct.price,
    sold: selectedProduct.sold,
    quantity: selectedProduct.quantity,
    category: categories?.message?.filter(item => item._id == selectedProduct.category)[0]?.name,
    specification: selectedProduct.specification,
    success: false,
    loading: false,
    error: false,
    formData: new FormData()
  } : {
    name: '',
    description: '',
    price: '',
    sold: '',
    quantity: '',
    category: '',
    specification: '',
    successs: false,
    loading: false,
    error: false,
    formData: new FormData()
  }
  const [values, setValues] = useState(initialcValues)
  const { name, description, category, specification, price, sold, quantity, success, loading, error, formData} = values

  useEffect(() => {
    dispatch(fetchProduct())
    dispatch(fetchCategory())
    dispatch(fetchAllCategory())
  }, [])

  const handleOnChange = (e,name) => {
    let value = name == 'photo' ? e.target.files[0] : name == 'category' ? e : e.target.value;
    if(name == 'photo'){
      console.log(e.target.files[0])
    }
    if(name == 'category'){
      let category = allCategories?.message.filter(item => item.name == value)
      formData.set(name, category[0]?._id)
    } else {
      formData.set(name, value)
    }
    setValues({...values, [name]: value})
    console.log(values);
  }

  const handleCreateProduct = (e)=> {
    e.preventDefault()
    console.log(values);
    if(selectedProduct) {
      dispatch(updateProduct(formData, selectedProduct._id))
    } else {
      dispatch(createProduct(formData))
    }
    if(products.getProductListSuccess) {
      console.log('redirecting...')
      navigate('/admin/product')
    }
  }

  return (
    <>
    <AdminModel>
      <Box className={styles.createProductContainer}>
        <Box className={styles.formContainer}>
          <Group style={{ marginBottom: '20px'}}>
            <Text className={styles.title}>
              Create Product
            </Text>
          </Group>
          <form onSubmit={(e) => handleCreateProduct(e)} className={styles.form}>
            <TextInput
              value={name}
              name="name"
              className={styles.formInput}
              required
              label="Name"
              placeholder="Product Name"
              onChange={(e) => handleOnChange(e, "name")}
            />
            <TextInput
              value={price}
              name="price"
              required
              className={styles.formInput}
              type="number"
              label="Price"
              placeholder="Price"
              onChange={(e) => handleOnChange(e, "price")}
            />
            <TextInput
              required
              className={styles.formInput}
              type="number"
              label="Sold"
              placeholder="sold"
              name="sold"
              onChange={(e) => handleOnChange(e, "sold")}
              value={sold}
            />
            <TextInput
              required
              className={styles.formInput}
              type="number"
              label="Quantity"
              placeholder="quantity"
              name="quantity"
              onChange={(e) => handleOnChange(e, "quantity")}
              value={quantity}
            />
            <Textarea
              className={styles.formInput}
              required
              label="Description"
              placeholder="Product Description"
              name="description"
              onChange={(e) => handleOnChange(e, "description")}
              value={description}
            />
            <Textarea
              className={styles.formInput}
              required
              label="Specification"
              placeholder="Product Specification"
              name="specification"
              onChange={(e) => handleOnChange(e, "specification")}
              value={specification}
            />
            <Autocomplete
              className={styles.formInput}
              name="category"
              required
              label="Category"
              placeholder="Category"
              data={autoCompleteData ? autoCompleteData: []}
              onChange={(e) => handleOnChange(e, "category")}
              value={category}
            />
            <Input
              className={styles.formInput}
              required
              type="file"
              multiple
              name="photo"
              onChange={(e) => handleOnChange(e, "photo")}
            />
            <Button type="submit">Create</Button>
          </form>
        </Box>
      </Box>
    </AdminModel>
    </>
  )
}
export default CreateProduct;