import { Box,Text,TextInput,Button, Group, Autocomplete } from '@mantine/core';
import { useForm, useToggle } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, editCategory, fetchAllCategory, fetchCategory } from '../../../redux/category/action';
import AdminModel from '../adminModel';
import styles from './style.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../../config';

const CreateCategoryPage = () => {
  let location = useLocation();
  let data = location.state;
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [type, toggle] = useToggle('Root', ['Root', 'Sub'])
  const category = useSelector((state) => state.categoryReducer);
  const [categoryToBeEdit, setCategoryToBeEdit] = useState(data);
  const {categories, isLoading, error} = category;
  const autoCompleteData = categories?.message?.map((item, index) => item.name)

  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  const form = useForm(
    categoryToBeEdit ? {
      initialValues: {
        name: categoryToBeEdit.name,
        parentId: categoryToBeEdit?.parentId,
        termsOfService: false,
      }
    } : {
      initialValues: {
        name: '',
        parentId: '',
        termsOfService: false
      }
    })

  const handleCreateCategory = (values) => {
    console.log(values);
    let parent = categories?.message.filter((item,index) => item.name == values.parentId );
    let data = {
      name: values.name,
      parentId: type == 'Root' ? '' : parent[0]._id
    }
    if (categoryToBeEdit) {
      console.log('edit')
      dispatch(editCategory(data, categoryToBeEdit._id))
      if(categories?.getCategoryListSuccess) {
        dispatch(fetchCategory())
        dispatch(fetchAllCategory())
        navigate('/admin/category')
      }
    } else {
      dispatch(createCategory(data))
      if(categories?.getCategoryListSuccess) {
        dispatch(fetchCategory())
        dispatch(fetchAllCategory())
        navigate('/admin/category')
      }
    }
  }


  return (
    <>
    <AdminModel>
      <Box className={styles.createCategoryContainer}>
        <Box className={styles.formContainer}>
          <Group style={{ marginBottom: '20px'}}>
            <Text className={styles.title}>
              Create Category
            </Text>
            <Button onClick={()=> toggle()}>
              {type}
            </Button>
          </Group>
          <form onSubmit={form.onSubmit((values) => handleCreateCategory(values))} className={styles.form}>
            <TextInput
              className={styles.formInput}
              required
              label="Name"
              placeholder="Category Name"
              {...form.getInputProps('name')}
            />
            {type == 'Sub' && (
              <Autocomplete 
                className={styles.formInput}
                required
                label="ParentId"
                placeholder="Parent Category"
                data={autoCompleteData}
                {...form.getInputProps('parentId')}
                />
            )}
            <Button type="submit">Create</Button>
          </form>
        </Box>
      </Box>
    </AdminModel>
    </>
  )
}
export default CreateCategoryPage;