import task from "../models/task.js";
import user from "../models/user.js";

const registerTask = async (req, res) =>{
    if(!req.body.name || !req.body.description || !req.body.imageUrl || !req.body.user ) return res.status(400).send({ message: "Incomplete data"})

    const ExistingUsers = await user.findOne({$and: [{email: req.body.user}, { dbStatus:"true"}]})
    if(!ExistingUsers) return res.status(400).send({ message: "The user no existing"})
     req.body.user = ExistingUsers._id; //no se si se puede hacer esto aqui :v

    let schemaTask = new task({
        name: req.body.name,
        description: req.body.description,
        taskStatus: "to-do",
        imageUrl: req.body.imageUrl,
        user: req.body.user
    });

    let result = await schemaTask.save();
    return !result? res.status(400).send({ message: "failed to register task"}): res.status(200).send({ result})

}

const listTask = async (req, res) =>{
    let  listTasks = await task.find({ name : new RegExp(req.params["name"])}).populate("user").exec();

    return listTasks.length ===0? res.status(400).send({ message: "No search results"}): res.status(200).send({listTasks});
}

const deleteTask = async (req, res) =>{
        if (!req.params["_id"])
          return res.status(400).send({ message: "Incomplete data" });
      
        const tasks = await task.findByIdAndDelete(req.params["_id"]);
      
        return !tasks
          ? res.status(400).send({ message: "Error deleting task " })
          : res.status(200).send({ message: "successfully deleted task"});
      
}

const updateTask = async (req, res) =>{
    if(!req.body._id || !req.body.name || !req.body.description || !req.body.imageUrl || !req.body.user || !req.body.taskStatus)
        return res.status(400).send({ message: "Incomplete data"})

    if(req.body.taskStatus.toLowerCase() == "to-do" || req.body.taskStatus.toLowerCase() == "in-progress" || req.body.taskStatus.toLowerCase() == "finish") {
        const editTask = await task.findByIdAndUpdate(req.body._id,{
            taskStatus: req.body.taskStatus.toLowerCase()
        })
        
        return !editTask? res.status(500).send({message: "Error editing task"}) : res.status(200).send({message: "Task updated"})

    }else{
        return res.status(400).send({ message: "The taskStatus no existing"})
    }

    
    

}

export default { registerTask, listTask, deleteTask, deleteTask, updateTask}