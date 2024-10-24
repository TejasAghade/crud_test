export const fetchAllStudents = async (pageNo = 1, limit = 10) => {
    try {
        const response = await fetch(`http://localhost:3000/student/getAll?pageNo=${pageNo}&limit=${limit}`);
        if (response.status == 200) {
            return response.json();
        } else {
            return {}
        }
    } catch (err) {
        return {
            "message": err,
            "status": 500
        };
    }
}

export const fetchStudentById = async (id) => {
    try {
        const response = await fetch(
            `http://localhost:3000/student/get`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "student_id": id })
            }
        );
        if (response.status == 200) {
            return response.json();
        } else {
            return {}
        }
    } catch (err) {
        return {
            "message": err,
            "status": 500
        };
    }
}

export const deleteStudent = async (id) => {
    try {
        const response = await fetch(
            `http://localhost:3000/student/delete`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "student_id": id })
            }
        );
        if (response.status == 200) {
            return response.json();
        } else {
            return {}
        }
    } catch (err) {
        return {
            "message": err,
            "status": 500
        };
    }
}

export const updateStudent = async (formData) => {
    try {
        const response = await fetch(
            `http://localhost:3000/student/update`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "student_id": formData.studentId,
                    "first_name": formData.firstName,
                    "last_name": formData.lastName,
                    "email": formData.email,
                    "date_of_birth": formData.dob,
                })
            }
        );
        if (response.status == 200) {
            return response.json();
        } else {
            return {}
        }
    } catch (err) {
        return {
            "message": err,
            "status": 500
        };
    }
}
export const createStudent = async (formData, marks) => {
    try {
        const response = await fetch(
            `http://localhost:3000/student/create`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "first_name": formData.firstName,
                    "last_name": formData.lastName,
                    "email": formData.email,
                    "date_of_birth": formData.dob,
                    "marks" : marks
                })
            }
        );
        if (response.status == 200) {
            return response.json();
        } else {
            return {}
        }
    } catch (err) {
        return {
            "message": err,
            "status": 500
        };
    }
}