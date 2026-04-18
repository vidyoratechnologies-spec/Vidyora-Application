import { UserRole } from '../types';

export interface UserData {
  id: string;
  name: string;
  role: UserRole;
  department?: string;
  email: string;
  avatar: string;
  status: 'active' | 'on_leave' | 'inactive';
  lastSeen?: string;
  parentId?: string; // For students
  studentId?: string; // For parents
}

const generateUsers = () => {
  const users: UserData[] = [];
  let idCounter = 1;

  // 1 Super Admin
  users.push({
    id: String(idCounter++),
    name: 'Vikram Seth',
    role: 'super_admin',
    department: 'Executive Management',
    email: 'vikram@vidyora.edu',
    avatar: `https://i.pravatar.cc/150?u=superadmin`,
    status: 'active'
  });

  // 2 Admins
  for (let i = 1; i <= 2; i++) {
    users.push({
      id: String(idCounter++),
      name: `Admin ${i}: ${['Dr. Amitabh', 'Rahul Dravid'][i-1]}`,
      role: 'admin',
      department: 'Administration',
      email: `admin${i}@vidyora.edu`,
      avatar: `https://i.pravatar.cc/150?u=admin${i}`,
      status: 'active'
    });
  }

  // 10 Faculty + 4 Lab Faculty = 14 Faculty
  const facultyDepts = ['Physics', 'Mathematics', 'Chemistry', 'Biology', 'History', 'Geography', 'Economics', 'Pol Science', 'Arts', 'PE'];
  for (let i = 1; i <= 10; i++) {
    users.push({
      id: String(idCounter++),
      name: `Prof. ${['Sharma', 'Verma', 'Gupta', 'Iyer', 'Chatterjee', 'Singh', 'Reddy', 'Basu', 'Nair', 'Patel'][i-1]}`,
      role: 'faculty',
      department: facultyDepts[i-1],
      email: `faculty${i}@vidyora.edu`,
      avatar: `https://i.pravatar.cc/150?u=faculty${i}`,
      status: i % 5 === 0 ? 'on_leave' : 'active'
    });
  }

  for (let i = 1; i <= 4; i++) {
    users.push({
      id: String(idCounter++),
      name: `Lab Inst. ${['Kulkarni', 'Desai', 'Joshi', 'Mishra'][i-1]}`,
      role: 'faculty',
      department: `Science Lab ${i}`,
      email: `lab${i}@vidyora.edu`,
      avatar: `https://i.pravatar.cc/150?u=lab${i}`,
      status: 'active'
    });
  }

  // 30 Students
  const firstNames = ['Aman', 'Priya', 'Raj', 'Sonal', 'Neha', 'Sunil', 'Sachin', 'Rahul', 'Sourav', 'Virat', 'Rohit', 'Jasprit', 'Hardik', 'Ravindra', 'Shikhar', 'Ishant', 'Cheteshwar', 'Ajinkya', 'Rishabh', 'Kuldeep', 'Yuzvendra', 'Bhuvi', 'Mohammed', 'Shreyas', 'Prithvi', 'Mayank', 'Hanuma', 'Axar', 'Washington', 'Shardul'];
  const lastNames = ['Kumar', 'Rai', 'Singh', 'Kakkar', 'Gavaskar', 'Tendulkar', 'Dravid', 'Ganguly', 'Kohli', 'Sharma', 'Bumrah', 'Pandya', 'Jadeja', 'Dhawan', 'Iyer', 'Shaw', 'Agarwal', 'Vihari', 'Patel', 'Sundar', 'Thakur', 'Siraj', 'Pant', 'Shami', 'Yadav', 'Chahal', 'Ashwin', 'Pujara', 'Rahane', 'Verma'];
  
  const studentIds: string[] = [];

  for (let i = 1; i <= 30; i++) {
    const studentId = String(idCounter++);
    studentIds.push(studentId);
    users.push({
      id: studentId,
      name: `${firstNames[i-1]} ${lastNames[i-1]}`,
      role: 'student',
      department: i <= 10 ? 'Science' : i <= 20 ? 'Commerce' : 'Arts',
      email: `${firstNames[i-1].toLowerCase()}@student.edu`,
      avatar: `https://i.pravatar.cc/150?u=student${i}`,
      status: 'active'
    });
  }

  // 30 Parents
  for (let i = 1; i <= 30; i++) {
    users.push({
      id: String(idCounter++),
      name: `Mr./Ms. ${lastNames[i-1]}`,
      role: 'parent',
      email: `parent${i}@gmail.com`,
      avatar: `https://i.pravatar.cc/150?u=parent${i}`,
      status: 'active',
      studentId: studentIds[i-1]
    });
    // Link parent back to student
    const studentIdx = users.findIndex(u => u.id === studentIds[i-1]);
    if (studentIdx !== -1) {
      users[studentIdx].parentId = users[users.length - 1].id;
    }
  }

  return users;
};

export const mockUsers: UserData[] = generateUsers();

export const mockDatabase = {
  users: mockUsers,
  tasks: [
    { id: 't1', title: 'Course Integration', status: 'pending', assignedTo: '2' },
    { id: 't2', title: 'Grade Moderation', status: 'completed', assignedTo: '4' },
  ],
  inventory: [
    { id: 'i1', name: 'Lab Equipment', stock: 12, cost: 50000 },
    { id: 'i2', name: 'Furniture', stock: 150, cost: 20000 },
  ],
  admissions: [
    { id: 'a1', studentName: 'Aman Verma', status: 'enrolled', date: '2026-03-15' },
    { id: 'a2', studentName: 'Priya Rai', status: 'waitlisted', date: '2026-04-10' },
  ]
};
