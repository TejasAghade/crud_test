import pool from "../../db/db.js";

import { v4 as uuidv4 } from 'uuid';


export const getAllStudents = async (req, res) => {

    // pagination
    const { pageNo=1 , limit=10 } = req.query;
    const offset = (pageNo - 1) * limit;

    try {

         // Get the total count of students
         const totalCountResult = await pool.query('SELECT COUNT(*) FROM students');
         const totalCount = totalCountResult.rows[0].count;
 

        const result = await pool.query(
            `SELECT CONCAT(first_name, ' ', last_name) as student_name, *
            FROM students ORDER BY student_id LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        if (result.rows.length === 0) {
            return res.json({ message: 'no records', data : [] });
        }

        res.status(200).json({
            "page_no" : pageNo,
            "limit" : limit,
            "total_pages": Math.ceil(totalCount / limit), // Total pages
            "total_records" : result.rows.length,
            "data" : result.rows,
            "message": "success!",
        });

    } catch (error) {
        console.error('Error fetching student with marks:', error);
        res.status(500).json({ error: 'An error occurred while fetching the student and marks' });
    }

}

export const getStudent = async (req, res) => {

    const {student_id} = req.body;
    try {

        const result = await pool.query(
            `SELECT 
            student_id, 
            first_name, 
            last_name, 
            email, 
            date_of_birth,
            subject, 
            score 
            FROM students
            LEFT JOIN marks ON students.student_id = marks.fk_student_id
            WHERE students.student_id = $1`, [student_id]
        );

        if (result.rows.length === 0) {
            return res.json({ message: 'Student not found' });
        }

        // Transforming results to a more readable format
        const student = {
            student_id: result.rows[0].student_id,
            first_name: result.rows[0].first_name,
            last_name: result.rows[0].last_name,
            email: result.rows[0].email,
            date_of_birth: result.rows[0].date_of_birth,
            marks: result.rows.filter(row => row.mark_id !== null).map(row => ({
                id: row.mark_id,
                subject: row.subject,
                score: row.score
            }))
        };

        res.status(200).json({
            "message" : "success",
            "data":student
        });
    } catch (error) {
        console.error('Error fetching student with marks:', error);
        res.status(500).json({ error: 'An error occurred while fetching the student and marks' });
    }

}


export const createStudent = async (req, res) => {

    const { first_name, last_name, email, date_of_birth, marks  } = req.body;

    const client = await pool.connect();

    let studentId = uuidv4();
    
    try {

        await client.query('BEGIN');

        let query1 = 'INSERT INTO students (student_id, first_name, last_name, email, date_of_birth) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const result1 = await pool.query( query1,[studentId, first_name, last_name, email, date_of_birth]);

        let query2 = 'INSERT INTO marks (mark_id, fk_student_id, subject, score) VALUES ($1, $2, $3, $4)';
        if (marks && marks.length > 0) {
            const markPromises = marks.map(mark => {
                return client.query(
                    query2,
                    [uuidv4(), studentId, mark.subject, mark.score]
                );
            });
            await Promise.all(markPromises);  // Ensuring all marks are inserted
        }

        await client.query('COMMIT');

        res.status(201).json({ 
            "data" : result1.rows[0], 
            "message" : "Student added!"
        });

        

    } catch (error) {
        await client.query('ROLLBACK');  
        res.status(500).json({ error: error.message });

    }finally{
        client.release();
    }

}

export const updateStudent = async (req, res) => {

    const { student_id, first_name, last_name, email, date_of_birth } = req.body;

    const client = await pool.connect(); 

    try {
        await client.query('BEGIN');

        // Update the student information
        const result = await client.query(
            'UPDATE students SET first_name = $1, last_name = $2, email = $3, date_of_birth = $4 WHERE student_id = $5 RETURNING *',
            [first_name, last_name, email, date_of_birth, student_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const student = result.rows[0];

        await client.query('COMMIT');
        res.status(200).json({ message: 'Student and marks updated successfully', student });
        
    } catch (error) {
        await client.query('ROLLBACK');  
        console.error('Error updating student with marks:', error);
        res.status(500).json({ error: 'An error occurred while updating the student and marks' });
    } finally {
        client.release();
    }

}

export const deleteStudent = async (req, res) => {
    const {student_id} = req.body;
    try {

        const result1 = await pool.query(`select from students where student_id = $1`, [student_id]);

        if(result1.rows.length == 0) return res.status(404).json({
            "message" : "Student not found!",
            "success" : false
        })

        const result = await pool.query(
            `Delete FROM students where student_id = $1`, [student_id]
        );


        res.status(200).json({
            "message" : "Student deleted!",
            "success" : true,
        });

    } catch (error) {
        console.error('Error deleting student with marks:', error);
        res.status(500).json({ error: 'An error occurred while deleting the student and marks' });
    }
}

