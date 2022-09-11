import { Box, TextInput, Group, Button, Text, Table, Modal, Checkbox, Image, Autocomplete } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DotsVertical, Edit, PlaylistAdd, Trash } from 'tabler-icons-react';
import { fetchProduct } from '../../../redux/product/action';
import AdminModel from '../adminModel';
import styles from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../config';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { fetchAllCategory, fetchCategory } from '../../../redux/category/action';

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productFromStore = useSelector((state) => state.productReducer)
  const { products, isLoading, error } = productFromStore
  console.log(products?.message);
  const [productsList, setProductsList] = useState(products?.message);
  console.log(productsList);
  const categoryFromStore = useSelector((state) => state.categoryReducer);
  const { categories } = categoryFromStore;
  const allCategoryFromStore = useSelector((state) => state.allCategoryReducer);
  const { allCategories } = allCategoryFromStore;
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 500);
  const [selectedId, setselectedId] = useState();
  const [image, setImage] = useState();
  const [openModel, SetOpenModal] = useState(false);
  const [editError, setEditError] = useState(false);
  const [searchFilter, setSearchFilter] = useState([]);
  const productAutoCompleteData = products?.message.map(item => item.name);
  console.log(productAutoCompleteData);

  useEffect(() => {
    setProductsList(products?.message);
  }, [products])

  if(editError){
    toast.error('Select A Product')
  }

  const searchItem = async (debounced) => {
    if (debounced.trim() !== '') {
      const res = await fetch(`${API}/product/searchList?name=${debounced}`, {
        method: "GET"
      })
      .then(response => {
        return response.json()
      })
      .catch(err => {
        console.log(err);
      })
      console.log(res);
      setSearchFilter(res.message);
    } else {
      setSearchFilter(products.message);
    }
  }
  const clearSearchList = () => {
    console.log(products.message);
    setSearchFilter(products.message);
    setValue()
  }

  useEffect(() => {
    console.log(searchFilter);
    let list = []
    if(searchFilter.length > 0) {
      for(let i=0; i<searchFilter.length ; i++) {
        list.push(products?.message?.filter((item, index) => item.name === searchFilter[i].name)[0]);
      }
      console.log(list);
      setProductsList(list);
    } else {
      setProductsList(productsList)
    }
  }, [searchFilter])

  useEffect(() => {
    searchItem(debounced);
    console.log(debounced);
  }, [debounced])

  useEffect(() => {
    dispatch(fetchCategory())
    dispatch(fetchAllCategory())
  }, [])

  useEffect(() => {
    dispatch(fetchProduct())
    dispatch(fetchAllCategory())
  }, [])

  const handleSelect = (id) => {
    if(selectedId == id) {
      setselectedId()
    } else {
      setselectedId(id);
    }
    console.log(selectedId);
  }

  const editRouteHandler = async () => {
    const data = await fetch(`${API}/product/singleProduct/${selectedId}`,{
      method: "GET",
    }).then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
    console.log(data);
    if(data?.getSingleProductSuccess) {
      navigate('/admin/product/create', {state: data});
      setEditError(false);
    } else {
      setEditError(true);
      if(editError){
        toast.error('Select One Category')
      }
    }
  }
  const handleDelete = async () => {
    const res = await fetch(`${API}/product/delete/${selectedId}`, {
      method: "DELETE",
    }).then(response => {
      return response.json()
    }).catch(err => {
      console.log(err);
    })
    if(res?.deleteProductSuccess) {
      dispatch(fetchProduct());
      setEditError(false)
    } else {
      setEditError(true)
      if(editError) {
        toast.error('Delete Failed')
      }
    }
  }

  console.log(productsList);

  const Rows = () => {
    return (
      <>
      {productsList?.map((item, index) => (
        <tr key={index}>
          <td><Checkbox defaultChecked={selectedId == item._id} onChange={() => handleSelect(item._id)}/></td>
          <td>{index +1 }</td>
          <td style={{ cursor: 'pointer' }} 
              onClick={() => {
                setImage(`${API}/product/photo/${item._id}`)
                SetOpenModal(true)
              }}>{item.name}</td>
          <td>
            {item.description}
          </td>
          <td>{allCategories?.message?.filter(data => data._id == item.category)[0]?.name || 'no category' }</td>
          <td>{item.price}</td>
          <td>{item?.specification}</td>
          <td>{item.sold}</td>
          <td>{item.quantity}</td>
          <td><DotsVertical size="20" opacity="0.5"/></td>
        </tr>
      ))}
      </>
    )
  }

  return(
    <>
    <AdminModel>
      <Modal opened={openModel} onClose={() => SetOpenModal(false)}>
        <div style={{ width: '100%', display: 'grid' }}>
          <img
            src={image}
            alt="Product Image"
            style={{ objectFit: 'contain', margin: 'auto', maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
      </Modal>
    <Box className={styles.category_header}>
        <Text style={{ fontSize: '32px'}}>Product</Text>
        <Group style={{ width: '100%'}} className={styles.group}>
          <Autocomplete
          value={value}
            className={styles.search_field}
            placeholder="Search Category"
            onChange={setValue}
            data={productAutoCompleteData || []}
            rightSection={<Trash onClick={() => clearSearchList()} />}
          />
          <Button variant="outline" leftIcon={<PlaylistAdd />} onClick={() => navigate('/admin/product/create')}>Create</Button>
          <Button
            leftIcon={<Edit />}
            color="orange"
            style={{ marginLeft: 'auto' }}
            onClick={() => editRouteHandler()}
          >
            Edit
          </Button>
          <Button
            color="red"
            style={{ marginRight: '100px'}}
            onClick={() => handleDelete()}
          >
            <Trash />
          </Button>
        </Group>
      </Box>
      <Box className={styles.table_container}>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Select</th>
              <th>No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>specification</th>
              <th>Sold</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <Rows />
          </tbody>
        </Table>
      </Box>
      {editError && <ToastContainer />}
    </AdminModel>
    </>
  )
}
export default Product;