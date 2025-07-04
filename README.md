# 🛒 Grocery Store Management System

This is a full-stack **Grocery Store Management System** developed as part of my Software Construction & Development lab. It manages products, orders, units of measure, and user login with a MySQL database backend and Python Flask APIs.

**Features:**

- Add, view, and delete products
- Manage Units of Measure (UOM)
- Place and view orders with order details
- User login authentication
- Frontend built with HTML, CSS, JS, jQuery
- Backend built with Python Flask API
- MySQL database integration

**Project Structure:**

/python_projects_grocery_webapp  
│  
├── server.py – Flask server with all APIs (products, orders, login)  
├── sql_connection.py – MySQL connection setup file  
├── products_dao.py – Product database operations (CRUD)  
├── uom_dao.py – UOM database operations  
├── orders_dao.py – Orders database operations  
│  
├── frontend/  
│   ├── templates/  
│   │   ├── index.html – Main dashboard page  
│   │   ├── login.html – User login page  
│   └── static/  
│       ├── common.js – API calling functions and common JS  
│       └── order.js – Order management JS  
│  
└── database.sql – MySQL tables and sample data (products, uom, orders, users)

**Setup Instructions:**

1. Clone the Repository

git clone https://github.com/Jawad5480/grocery-store-management-system.git  
cd grocery-store-management

2. Install Dependencies

Ensure Python and MySQL are installed.

pip install flask flask-cors mysql-connector-python

3. Setup MySQL Database

- Open MySQL Workbench  
- Create a new schema (e.g. grocerydb)  
- Run `database.sql` to create tables (`products`, `orders`, `order_details`, `uom`, `users`) and insert sample data  
- Update your `sql_connection.py` file with your MySQL username, password, and database name

4. Run the Flask Server

python server.py

The server will run at [http://127.0.0.1:5000](http://127.0.0.1:5000).

5. Access the Frontend

Open `frontend/templates/login.html` in your browser to login, then navigate to `index.html` to manage products and orders.

**Learning Outcomes:**

- Developed RESTful APIs using Flask for product, order, and user management  
- Integrated frontend with backend APIs using jQuery AJAX  
- Managed MySQL CRUD operations via Python DAO pattern  
- Understood full-stack development workflow and database connectivity

**Author:**

Jawad  
Computer Science Student

[LinkedIn Profile](www.linkedin.com/in/jawad-arshad-81773830a)



