import CategoryModel from "../models/category_model.js";
import SubCategoryModel from "../models/sub_category_model.js";

export const AddSubCategory = async (req, resp) => {

    const { subCategory,categoryId } = req.body
    if (!subCategory) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: 'Enter Your subCategory Name',
        })
    }
    if (subCategory.length <= 2) {
        return resp.status(422).send({
            code: 0,
            status: 0,
            message: ' subCategory Name should be minimum 3 characters',
        })
    }

    try {

        const find_category = await CategoryModel.findOne({ _id: categoryId })

        if (!find_category) {
            return resp.status(501).send({
                status: 0,
                message: "This Category Not Exist, Add Valid Category ID"
            })
        }


        const find_sub_category = await SubCategoryModel.findOne({ subCategory })

        // console.log(find_sub_category)
        if (find_sub_category ) {
            return resp.status(422).send({
                status: 0,
                message: "This Sub Category Already Exist"
            })
        }

        const create_sub_category = SubCategoryModel({ subCategory, categoryId });
        const save_create_sub_category = await create_sub_category.save()

        resp.status(201).send({
            status: 1,
            message: 'category create Successfully',
            sub_category: save_create_sub_category
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}

export const ListSubCategory = async (req, resp) => {
    const {categoryId} = req.body
    try {
        const find_sub_category = await SubCategoryModel.find({categoryId})
        if (!find_sub_category) {
            return resp.status(422).send({
                status: 0,
                message: " Sub Category Not Exist in This Category"
            })
        }
        resp.status(200).send({
            status: 1,
            message: 'sub category List',
            sub_category: find_sub_category
        })

    } catch (error) {
        resp.status(500).send({
            status: 0,
            message: 'Server Error',
            error
        })
    }
}

export const DeleteSubCategory = async (req, resp) => {
    const {subCategoryId} = req.body

    try {

        const find_and_remove = await SubCategoryModel.findByIdAndRemove(subCategoryId)

        if (!find_and_remove) {
            return resp.status(422).send({
                status: 0,
                message: "This Category Not found"
            })
        }

        resp.status(200).send({
            status: 1,
            message: 'Sub category Deleted',
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