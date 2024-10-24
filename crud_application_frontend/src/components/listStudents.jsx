import React, { useEffect, useState } from 'react'
import { createStudent, deleteStudent, fetchAllStudents, fetchStudentById, updateStudent } from '../services/api.service'
import { DeleteFilled, EyeFilled, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

import swal from 'sweetalert';

export default function ListStudents() {

    const [isLoading, setIsLoading] = useState(true);
    const [student, setStudent] = useState({})
    const [pageNo, setPageNo] = useState(1);

    const [studentObj, setStudentObj] = useState({});
    const [isStudentLoading, setIsSLoading] = useState(false);

    let initialValues = { studentId: "", firstName: "", lastName: "", email: "", dob: "" };
    const [formValues, setFormValues] = useState(initialValues);

    const [refresh, setRefresh] = useState(1);
    let initialMarks = [
        { subject: "", score: "" }
    ];
    const [marks, setMarks] = useState(initialMarks)

    useEffect(() => {
        fetchAllStudents(pageNo).then((res) => {
            setStudent(res);
            setIsLoading(false);
        });
        console.log("useEffect")
    }, [pageNo, refresh]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleMarksChange = (e, i) => {
        const { name, value } = e.target;
        // Create a new copy of the marks array
        const updatedMarks = [...marks];
        // Update the specific field
        updatedMarks[i] = { ...updatedMarks[i], [name]: value };
        setMarks(updatedMarks);
    };


    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to leave this page?",
            icon: "warning",
            dangerMode: true,
        }).then(willDelete => {
                if (willDelete) {
                    setIsLoading(true);
                    deleteStudent(id).then((res) => {
                        setIsLoading(false);
                        swal("Deleted!", "Student deleted!", "success");
                        setRefresh(refresh + 1);
                    });
                }
            });

    }

    const handleUpdate = () => {
        setIsLoading(true);
        updateStudent(formValues).then((res) => {
            setIsLoading(false);
            swal("Saved!", "Student details Saved!", "success");
            setRefresh(refresh + 1);
        });
    }

    const handleAdd = () => {
        setIsLoading(true);
        createStudent(formValues, marks).then((res) => {
            console.log(formValues, marks)
            setIsLoading(false);
            swal("Saved!", "Student Added!", "success");
            setRefresh(refresh + 1);
        });
    }


    const handleView = (id) => {
        setIsSLoading(true);
        fetchStudentById(id).then((res) => {
            setStudentObj(res);
            setIsSLoading(false);
            setFormValues({
                studentId: res.data.student_id,
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                email: res.data.email,
                dob: res.data.date_of_birth,
            })
        });
    }



    return (
        <div style={{ width: '90vw' }}>
            <div className="title mb-5">
                <h2>Students Data</h2>
            </div>
            <div className="create d-flex justify-content-end mb-4">
                <div >
                    <a className=" btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#studentCreateModal" href=""
                        onClick={(e) => {
                            initialValues = { studentId: "", firstName: "", lastName: "", email: "", dob: "" };
                            setFormValues(initialValues);
                            setMarks([{
                                subject: "",
                                score: ""
                            }]);
                        }}
                    >Add Student</a></div>
            </div>
            {isLoading ? <div className="">Loading....</div> : <table className="table table-dark table-striped w-100">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date of birth</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (student.data || []).length == 0 ? <tr>
                            <th></th>
                            <th></th>
                            <th>No records found</th>
                            <th></th>
                            <th></th>
                        </tr> :
                            (student.data || []).map((e, i) => {
                                return <tr key={i}>
                                    <th scope="row">{i}</th>
                                    <th>{e.student_name}</th>
                                    <td>{e.email}</td>
                                    <td>{e.date_of_birth}</td>
                                    <td >
                                        <div className='d-flex flex-row ms-1' style={{ width: '10rem' }}>
                                            <button onClick={(ee) => handleView(e.student_id)} className='mr-5' type="button" data-bs-toggle="modal" data-bs-target="#studentViewModal"><EyeFilled /></button>
                                            <div className='ms-3'>
                                                <button onClick={(ee) => handleDelete(e.student_id)} ><DeleteFilled /></button>
                                            </div>
                                            <div className='ms-3' onClick={(ee) => handleView(e.student_id)} type="button" data-bs-toggle="modal" data-bs-target="#studentUpdateModal">
                                                <button>Update</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })
                    }

                </tbody>
            </table>
            }
            <div className="pagination d-flex justify-content-end">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li onClick={(e) => { setPageNo(pageNo - 1); }} className={`page-item  ${pageNo == 1 ? 'disabled' : ''} `}>
                            <a className="page-link">Previous</a>
                        </li>
                        {pageNo == 1 ? <></> :
                            <li className="page-item"><a className="page-link" href="#">{pageNo - 1}</a></li>
                        }
                        <li className="page-item active" aria-current="page">
                            <a className="page-link" href="#">{pageNo}</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">{pageNo + 1}</a></li>
                        <li onClick={(e) => { setPageNo(pageNo + 1); }} className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="modal fade" id="studentViewModal" tabIndex="-1" aria-labelledby="studentViewModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="studentViewModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {isStudentLoading ? <p>Loading...</p> : !!studentObj && !!studentObj.data ?
                                <div className="name">
                                    <div className="student">
                                        <p> <span className='fw-bold'>Student Name: </span>{studentObj.data.first_name}   {studentObj.data.last_name}</p>
                                        <p> <span className='fw-bold'>Email: </span>{studentObj.data.email}</p>
                                        <p> <span className='fw-bold'>DOB: </span>{studentObj.data.date_of_birth}</p>
                                    </div>
                                    <hr />
                                    <div className="markTitle">
                                        <h5>Marks</h5>
                                    </div>
                                    <div className="marks">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Subject</th>
                                                    <th scope="col">Marks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    studentObj.data.marks.map((e, i) => {
                                                        return <tr key={i}>
                                                            <th scope="row" className='me-1 fw-bold'>{i}.</th>
                                                            <td>{e.subject} </td>
                                                            <td>{e.score}</td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div> : <></>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Update Details</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="studentUpdateModal" tabIndex="-1" aria-labelledby="studentUpdateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="studentUpdateModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                isStudentLoading ? <p>Loading...</p> : !!formValues.firstName ?
                                    <div className="name">
                                        <div className="student">

                                            <div className="name d-flex align-items-center">
                                                <div className="first-name me-4">
                                                    <p className='fw-bold mb-0'>First Name</p>
                                                    <input type="text" name='firstName' value={formValues.firstName} onChange={handleOnChange} />
                                                </div>

                                                <div className="last-name">
                                                    <p className='fw-bold mb-0'>Last Name</p>
                                                    <input type="text" name='lastName' value={formValues.lastName} onChange={handleOnChange} />
                                                </div>
                                            </div>

                                            <div className="details  d-flex align-items-center mt-4 mb-4">
                                                <div className="last-name me-4">
                                                    <p className='fw-bold mb-0'>Email</p>
                                                    <input type="text" name='email' value={formValues.email} onChange={handleOnChange} />
                                                </div>


                                                <div className="last-name">
                                                    <p className='fw-bold mb-0'>DOB</p>
                                                    <input type="date" name='dob' value={formValues.dob} onChange={handleOnChange} />
                                                </div>
                                            </div>

                                        </div>
                                        <hr />
                                        <div className="markTitle">
                                            <h5>Marks</h5>
                                        </div>
                                        <div className="marks">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Subject</th>
                                                        <th scope="col">Marks</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {!!studentObj.data ?
                                                        (studentObj.data.marks).map((e, i) => {
                                                            return <tr key={i}>
                                                                <th scope="row" className='me-1 fw-bold'>{i}.</th>
                                                                <td>{e.subject} </td>
                                                                <td>{e.score}</td>
                                                            </tr>
                                                        }) : <></>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> : <></>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => handleUpdate()}>Update</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="studentCreateModal" tabIndex="-1" aria-labelledby="studentCreateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="studentCreateModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className="name">
                                <div className="student">

                                    <div className="name d-flex align-items-center">
                                        <div className="first-name me-4">
                                            <p className='fw-bold mb-0'>First Name</p>
                                            <input type="text" name='firstName' value={formValues.firstName} onChange={handleOnChange} />
                                        </div>

                                        <div className="last-name">
                                            <p className='fw-bold mb-0'>Last Name</p>
                                            <input type="text" name='lastName' value={formValues.lastName} onChange={handleOnChange} />
                                        </div>
                                    </div>

                                    <div className="details  d-flex align-items-center mt-4 mb-4">
                                        <div className="last-name me-4">
                                            <p className='fw-bold mb-0'>Email</p>
                                            <input type="text" name='email' value={formValues.email} onChange={handleOnChange} />
                                        </div>


                                        <div className="last-name">
                                            <p className='fw-bold mb-0'>DOB</p>
                                            <input type="date" name='dob' value={formValues.dob} onChange={handleOnChange} />
                                        </div>
                                    </div>

                                </div>
                                <hr />
                                <div className="markTitle">
                                    <h5>Marks</h5>
                                </div>
                                <div className="marks">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Subject</th>
                                                <th scope="col" style={{ width: '5rem' }}>Marks</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                marks.map((mark, i) => (
                                                    <tr key={i}>
                                                        <th scope="row" className='me-1 fw-bold'>{i + 1}.</th>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                name="subject"
                                                                value={mark.subject}
                                                                onChange={(e) => handleMarksChange(e, i)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                style={{ width: '5rem' }}
                                                                type="text"
                                                                name="score"
                                                                value={mark.score}
                                                                onChange={(e) => handleMarksChange(e, i)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <a
                                                                className='me-1'
                                                                onClick={() => {
                                                                    // Create a new copy of the marks array and add a new row
                                                                    setMarks([...marks, { subject: "", score: "" }]);
                                                                }}
                                                            >
                                                                <PlusCircleOutlined />
                                                            </a>
                                                            {marks.length > 1 && (
                                                                <a
                                                                    className='ms-1'
                                                                    onClick={() => {
                                                                        // Create a new copy of the marks array and remove the row
                                                                        const updatedMarks = marks.filter((_, index) => i !== index);
                                                                        setMarks(updatedMarks);
                                                                    }}
                                                                >
                                                                    <MinusCircleOutlined />
                                                                </a>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => handleAdd()}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
