import { Group, Text, TextInput, Box, Grid, Container, Button, Autocomplete } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategory, fetchCategory } from '../../../redux/category/action';
import AdminModel from '../adminModel';
import styles from './style.module.scss'
import { PlaylistAdd, ChevronRight, Edit, Trash } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../../config';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState('')
  const [debounced] = useDebouncedValue(value, 500);
  const categoryData = useSelector((state) => state.categoryReducer);
  const { categories, isLoading, error } = categoryData
  const allCategoryData = useSelector((state) => state.allCategoryReducer);
  const { allCategories } = allCategoryData;
  const [subCategoryList, selectSubCategory] = useState([])
  const [leafCategoryList, selectLeafCategory] = useState([])
  const [mainActive, setMainActive] = useState();
  const [subActive, setSubActive] = useState();
  const [categoryToBeEdit, setCategoryToBeEdit] = useState([])
  const [categoryToBeDelete, setCategoryToBeDelete] = useState([])
  const [editError, setEditError] = useState(false);

  useEffect(() => {
    dispatch(fetchCategory())
    dispatch(fetchAllCategory())
  }, [])

  const handleRightClick = (e) => {
    e.preventDefault();
  }

  const mainCategoryClick = (active, subCategories, categoryId) => {
    if (categoryToBeEdit == categoryId) {
      setCategoryToBeEdit()
      setCategoryToBeDelete()
    } else {
      setCategoryToBeEdit(categoryId);
      setCategoryToBeDelete(categoryId)
    }
    if (mainActive != active){
      selectSubCategory(subCategories)
      setMainActive(active);
    } else {
      selectSubCategory([])
      setMainActive();
    }
  }
  const subCategoryClick = (active, categoryId) => {
    console.log(categoryId);
    if (categoryToBeEdit == categoryId) {
      setCategoryToBeEdit()
      setCategoryToBeDelete()
    } else {
      setCategoryToBeEdit(categoryId);
      setCategoryToBeDelete(categoryId)
    }
    if (subActive != active) {
      setSubActive(active);
    } else {
      setSubActive()
    }
  }
  const subCategoryClick2 = (active, categoryId) => {
    console.log(categoryId);
    if (categoryToBeEdit == categoryId) {
      setCategoryToBeEdit()
      setCategoryToBeDelete()
    } else {
      setCategoryToBeEdit(categoryId);
      setCategoryToBeDelete(categoryId)
    }
    if (subActive != active) {
      setSubActive(active);
    } else {
      setSubActive()
    }
  }
  const editRouteHandler = async () => {
    const toEdit =  await fetch(`${API}/category/getSingle/${categoryToBeEdit}`, {
      method: "GET",
      headers: {
        accpeted: 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err);
    })
    if(toEdit?.getSingleCategory) {
      navigate("/admin/category/create", { state: toEdit?.message})
      setEditError(false);
    } else {
      setEditError(true);
      if(editError){
        toast.error('Select One Category')
      }
    }
  }
  const handleDelete = async (id) => {
    const res = await fetch(`${API}/category/delete/${categoryToBeEdit}`,{
      method: "DELETE"
    })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
    if(res?.deleteCategorySuccess) {
      dispatch(fetchCategory())
      dispatch(fetchAllCategory())
      selectSubCategory([])
    } else {
      console.log(res);
    }
  }

  const tableCellStyle = {
    backgroundColor: 'rgba(200,200,200,0.5)',
    padding: '5px',
    borderRadius: '8px'
  }

  const CategoryList = ({header}) => {
    return (
      <>
      <Text size='lg' className={styles.table_header}>{header}</Text>
        {categories?.message?.map((item, index) => (
            <Box
              key={index}
              style={ mainActive == item.name ? tableCellStyle : {...tableCellStyle, backgroundColor: 'transparent'}}
              className={styles.table_cell}
              onClick={() => mainCategoryClick(item.name, item?.children, item?._id)}
              onContextMenu={(e) => handleRightClick(e)}>
                <Text className={styles.table_cell_text}>{index + 1}. {item.name}</Text>
                <ChevronRight />
            </Box>
        ))}
      </>
    )
  }
  const SubCategoryList = ({header}) => {
    return (
      <>
        <Text size='lg' className={styles.table_header}>{header}</Text>
        {subCategoryList?.map((item, index) => (
            <Box
              key={index}
              style={ subActive == item.name ? tableCellStyle : {...tableCellStyle, backgroundColor: 'transparent'}}
              className={styles.table_cell}
              onClick={() => subCategoryClick2(item.name, item._id)}>
                <Text className={styles.table_cell_text}>{index + 1}. {item.name}</Text>
                <ChevronRight />
            </Box>
        ))}
      </>
    )
  }

  return(
    <>
    <AdminModel>
      <Box className={styles.category_header}>
        <Text style={{ fontSize: '32px'}}>Category</Text>
        <Group style={{ width: '100%'}} className={styles.group}>
          <Autocomplete
            className={styles.search_field}
            placeholder="Search Category"
            onChange={setValue}
            data={['1','2','3']}
          />
          <Button variant="outline" leftIcon={<PlaylistAdd />} onClick={() => navigate('/admin/category/create')}>Create</Button>
          <Button
            onClick={() => editRouteHandler()}
            leftIcon={<Edit />}
            color="orange"
            style={{ marginLeft: 'auto' }}
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(categoryToBeDelete)}
            color="red"
            style={{ marginRight: '100px'}}
          >
            <Trash />
          </Button>
        </Group>
      </Box>
      <Container className={styles.table_container}>
        <Box className={styles.table_col}><CategoryList header="Main"/></Box>
        {subCategoryList && (
            <Box className={styles.table_col}><SubCategoryList header="Sub"/></Box>
        )}
        {/* {leafCategoryList && (
          <Box className={styles.table_col}><Text size='lg' className={styles.table_header}>Products</Text></Box>
        )} */}
      </Container>
      {/* <Container className={styles.allCat_containter}>
          {allCategories?.message?.map((item, index) => (
            <>
            <Box
              key={index}
              style={ subActive == item.name ? tableCellStyle : {...tableCellStyle, backgroundColor: 'transparent'}}
              className={styles.table_cell}
              onClick={() => subCategoryClick(item.name, item?._id)}
              onContextMenu={(e) => handleRightClick(e)}>
                <Text className={styles.table_cell_text}>{index + 1}. {item.name}</Text>
                <ChevronRight />
            </Box>
            </>
          ))}
      </Container> */}
      {editError && <ToastContainer />}
    </AdminModel>
    </>
  )
}
export default Category;