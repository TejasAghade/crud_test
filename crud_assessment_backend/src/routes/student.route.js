import { Router } from "express";
import { 
    createStudent, 
    deleteStudent, 
    getAllStudents, 
    getStudent, 
    updateStudent 
} from "../controllers/student.controller.js";

let router = Router();

// all api routes fro students crud operation

router.route("/getAll").get(getAllStudents);
router.route("/get").post(getStudent);

router.route("/create").post(createStudent);
router.route("/update").put(updateStudent);
router.route("/delete").delete(deleteStudent);

// we can also use single route for all
// example

// router.route("/student")
//     .get()
//     .post()
//     .patch()
//     .delete()

export default router;