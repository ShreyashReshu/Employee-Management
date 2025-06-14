let token = null;
const apiBase = '/api';

document.addEventListener('DOMContentLoaded', () => {
    // Auth UI
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const employeeSection = document.getElementById('employeeSection');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    loginBtn.onclick = () => {
        loginForm.classList.remove('d-none');
        registerForm.classList.add('d-none');
    };
    registerBtn.onclick = () => {
        registerForm.classList.remove('d-none');
        loginForm.classList.add('d-none');
    };
    logoutBtn.onclick = () => {
        token = null;
        employeeSection.classList.add('d-none');
        loginForm.classList.remove('d-none');
        logoutBtn.classList.add('d-none');
        loginBtn.classList.remove('d-none');
        registerBtn.classList.remove('d-none');
    };

    // Login
    document.getElementById('loginFormElement').onsubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const res = await fetch(apiBase + '/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (res.ok) {
            const data = await res.json();
            token = data.accessToken || data.token || data.jwt;
            loginForm.classList.add('d-none');
            employeeSection.classList.remove('d-none');
            logoutBtn.classList.remove('d-none');
            loginBtn.classList.add('d-none');
            registerBtn.classList.add('d-none');
            loadEmployees();
        } else {
            alert('Login failed');
        }
    };

    // Register
    document.getElementById('registerFormElement').onsubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const res = await fetch(apiBase + '/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (res.ok) {
            alert('Registration successful! Please login.');
            registerForm.classList.add('d-none');
            loginForm.classList.remove('d-none');
        } else {
            alert('Registration failed');
        }
    };

    // Save Employee
    document.getElementById('saveEmployee').onclick = async () => {
        const id = document.getElementById('employeeId').value;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const position = document.getElementById('position').value.trim();
        const department = document.getElementById('department').value.trim();
        const salary = parseFloat(document.getElementById('salary').value);
        const phoneNumber = document.getElementById('phoneNumber') ? document.getElementById('phoneNumber').value.trim() : '';
        const hireDate = document.getElementById('hireDate') ? document.getElementById('hireDate').value : '';
        // Split name into firstName and lastName
        let firstName = '', lastName = '';
        if (name.includes(' ')) {
            firstName = name.split(' ')[0];
            lastName = name.substring(name.indexOf(' ') + 1);
        } else {
            firstName = name;
            lastName = '';
        }
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiBase}/employees/${id}` : `${apiBase}/employees`;
        const payload = { firstName, lastName, email, position, department, salary, phoneNumber, hireDate };
        await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(payload)
        });
        loadEmployees();
        document.getElementById('employeeForm').reset();
        document.getElementById('employeeId').value = '';
        var modal = bootstrap.Modal.getInstance(document.getElementById('employeeModal'));
        modal.hide();
    };
});

async function loadEmployees() {
    const res = await fetch('/api/employees', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const employees = await res.json();
    const tbody = document.getElementById('employeeList');
    tbody.innerHTML = '';
    employees.forEach(emp => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.position}</td>
            <td>${emp.department}</td>
            <td>${emp.salary}</td>
            <td>
                <button class=\"btn btn-sm btn-warning\" onclick=\"editEmployee(${emp.id}, '${emp.name}', '${emp.email}', '${emp.position}', '${emp.department}', ${emp.salary})\">Edit</button>
                <button class=\"btn btn-sm btn-danger\" onclick=\"deleteEmployee(${emp.id})\">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.editEmployee = function(id, name, email, position, department, salary) {
    document.getElementById('employeeId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('position').value = position;
    document.getElementById('department').value = department;
    document.getElementById('salary').value = salary;
    var modal = new bootstrap.Modal(document.getElementById('employeeModal'));
    modal.show();
};

window.deleteEmployee = async function(id) {
    await fetch(`${apiBase}/employees/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    loadEmployees();
};
