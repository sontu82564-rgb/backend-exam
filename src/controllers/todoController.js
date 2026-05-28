import todoSchema from "../models/todoSchema.js";

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const newTodo = await todoSchema.create({
      title: title,
      userId: req.userId,
    });
    return res.status(201).json({
      success: true,
      message: "Todo Created",
      data: newTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTodo = async (req, res) => {
  try {
    const allTodo = await todoSchema.find({ userId: req.userId });
    return res.status(200).json({
      success: true,
      message: "Todo fetched",
      data: allTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const hasTodo = await todoSchema.findOne({
      userId: req.userId,
      _id: todoId,
    });
    if (!hasTodo) {
      return res.status(404).json({
        success: false,
        message: "No Todo Available to Delete",
      });
    } else {
      const delTodo = await todoSchema.findByIdAndDelete({ _id: todoId });
      return res.status(200).json({
        success: true,
        message: "Succesfully Deleted Todo",
        data: delTodo,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns success -> true/false
 *
 */
export const updateTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todoId = req.params.id;
    const isTodoExist = await todoSchema.findOne({ _id: todoId });

    if (!isTodoExist){
      return res.status(404).json({
        succes: false,
        message: "NO Such Todo Exist",
      });
    }
    if(isTodoExist.userId === req.userId){
      isTodoExist.title = title
    await isTodoExist.save()

    return res.status(200).json({
        succes:true,
        message:"Todo Updated Succesfully",
        data:isTodoExist
    })
    }else {
      return res.status(404).json({
        succes : false,
        message: "No Todo Exist Under this User"
      })
    }
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const paginateTodo = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 3;

    // Calculating the skip value
    const skip = (page - 1) * limit;

    // Getting todo with pagination
    const todo = await todoSchema
      .find({ userId: req.userId })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Todos fetched as per query",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};







