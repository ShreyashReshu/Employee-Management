let token = null;
const apiBase = '/api';

document.addEventListener('DOMContentLoaded', () => {
    // Auth UI
    const loginForm = document.getElementById('loginForm');
    const employeeSection = document.getElementById('employeeSection');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    loginBtn.onclick = () => {
        loginForm.classList.remove('d-none');
    };
    logoutBtn.onclick = () => {
        token = null;
        employeeSection.classList.add('d-none');
        loginForm.classList.remove('d-none');
        logoutBtn.classList.add('d-none');
        loginBtn.classList.remove('d-none');
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
            loadEmployees();
        } else {
            alert('Login failed');
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
        const name = (emp.firstName || '') + (emp.lastName ? ' ' + emp.lastName : '');
        tr.innerHTML = `
            <td>${name}</td>
            <td>${emp.email}</td>
            <td>${emp.position}</td>
            <td>${emp.department}</td>
            <td>${emp.salary}</td>
            <td>
                <button class=\"btn btn-sm btn-warning\" onclick=\"editEmployee(${emp.id}, '${emp.firstName}', '${emp.lastName}', '${emp.email}', '${emp.position}', '${emp.department}', ${emp.salary}, '${emp.phoneNumber}', '${emp.hireDate}')\">Edit</button>
                <button class=\"btn btn-sm btn-danger d-none\" onclick=\"deleteEmployee(${emp.id})\">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.editEmployee = function(id, firstName, lastName, email, position, department, salary, phoneNumber, hireDate) {
    document.getElementById('employeeId').value = id;
    document.getElementById('name').value = (firstName || '') + (lastName ? ' ' + lastName : '');
    document.getElementById('email').value = email;
    document.getElementById('position').value = position;
    document.getElementById('department').value = department;
    document.getElementById('salary').value = salary;
    if(document.getElementById('phoneNumber')) document.getElementById('phoneNumber').value = phoneNumber || '';
    if(document.getElementById('hireDate')) document.getElementById('hireDate').value = hireDate || '';
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
