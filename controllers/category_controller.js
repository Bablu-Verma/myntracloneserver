import CategoryModel from "../models/category_model.js";

export const AddCategory = async (req, resp) => {

    const { category } = req.body
    if (!category) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: 'Enter Your Category Name',
        })
    }
    if (category.length <= 2) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: ' Category Name should be minimum 3 characters',
        })
    }

    try {

        const find_category = await CategoryModel.findOne({ name: category })

        if (find_category) {
            return resp.status(501).send({
                status: 0,
                message: "This Category Already Exist"
            })
        }

        const create_category = CategoryModel({ name: category });
        const save_create_category = await create_category.save()

        resp.status(201).send({
            status: 1,
            message: 'category create Successfully',
            create_category: save_create_category
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}

export const ListCategory = async (req, resp) => {
    try {

        const find_category = await CategoryModel.find()

        if (!find_category) {
            return resp.status(422).send({
                status: 0,
                message: " Category Not Exist"
            })
        }
        resp.status(200).send({
            status: 1,
            message: 'category List',
            category: find_category
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}

export const DeleteCategory = async (req, resp) => {
    const {categoryId} = req.body
    // console.log(categoryId)
    try {

        const find_and_remove = await CategoryModel.findByIdAndRemove(categoryId)

        if (!find_and_remove) {
            return resp.status(422).send({
                status: 0,
                message: "This Category Not found"
            })
        }
        resp.status(200).send({
            status: 1,
            message: 'category Deleted',
            create_category: find_and_remove
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}