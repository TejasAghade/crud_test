-- Database: crud_test

-- DROP DATABASE IF EXISTS crud_test;

-- CREATE DATABASE crud_test;

CREATE TABLE students (
    student_id VARCHAR(36) PRIMARY KEY,  -- Adjusted to VARCHAR to accommodate generated IDs (e.g., UUID)
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL
);

CREATE TABLE marks (
    mark_id VARCHAR(36) PRIMARY KEY,
    fk_student_id VARCHAR(36) REFERENCES students(student_id) ON DELETE CASCADE,  -- Updated to match students table ID type
    subject VARCHAR(50) NOT NULL,
    score INTEGER NOT NULL
);

INSERT INTO students (student_id, first_name, last_name, email, date_of_birth) VALUES
('5aea7dd1-df94-49df-9c27-ee4078127257', 'Nikhil', 'g', 'nikhil', '2024-10-16'),
('75db4b32-0873-4e20-bc02-f246ffdd1f30', 'Tejas', 'A', 'tejas.a@example.com', '2000-01-01'),
('a053a547-f3a0-4363-ac45-2d59ab4a5eac', 'Pratik', 's', 'pratiks', '2024-10-12'),
('a6b92ecb-c86f-4b63-81cd-127802be86c7', 'Abhishek', 'J', 'abhishek.j@example.com', '2000-01-01');

INSERT INTO marks (mark_id, fk_student_id, subject, score) VALUES
('mark-1', '5aea7dd1-df94-49df-9c27-ee4078127257', 'Math', 85),
('mark-2', '5aea7dd1-df94-49df-9c27-ee4078127257', 'Science', 90),
('mark-3', '5aea7dd1-df94-49df-9c27-ee4078127257', 'English', 88),

('mark-4', '75db4b32-0873-4e20-bc02-f246ffdd1f30', 'Math', 76),
('mark-5', '75db4b32-0873-4e20-bc02-f246ffdd1f30', 'Science', 82),
('mark-6', '75db4b32-0873-4e20-bc02-f246ffdd1f30', 'English', 80),

('mark-7', 'a053a547-f3a0-4363-ac45-2d59ab4a5eac', 'Math', 92),
('mark-8', 'a053a547-f3a0-4363-ac45-2d59ab4a5eac', 'Science', 87),
('mark-9', 'a053a547-f3a0-4363-ac45-2d59ab4a5eac', 'English', 90),

('mark-10', 'a6b92ecb-c86f-4b63-81cd-127802be86c7', 'Math', 80),
('mark-11', 'a6b92ecb-c86f-4b63-81cd-127802be86c7', 'Science', 75),
('mark-12', 'a6b92ecb-c86f-4b63-81cd-127802be86c7', 'English', 78);


SELECT 
	first_name, 
	last_name, 
	email, 
	date_of_birth, 
	subject, 
	score 
FROM students
LEFT JOIN marks ON students.student_id = marks.fk_student_id
where marks.fk_student_id = '766691e7-a08a-4b18-8541-74fcecad05bc';


select * from students;
select * from marks;

delete from students;