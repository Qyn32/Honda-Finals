// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const fs = require('fs');

// const app = express();
// const port = 3000;

// // Enable CORS
// app.use(cors());

// // Parse JSON requests
// app.use(bodyParser.json());

// // Load products from data.json
// let products = [];
// const loadProducts = () => {
//     try {
//         const data = fs.readFileSync('data.json');
//         products = JSON.parse(data);
//     } catch (err) {
//         console.error("Error reading data.json:", err);
//     }
// };

// loadProducts();

// // API Endpoints
// app.get('/api/products', (req, res) => {
//     res.json(products);
// });

// app.post('/api/products', (req, res) => {
//     const newProduct = req.body;
//     newProduct.id = products.length + 1; // Assign a new ID
//     products.push(newProduct);
//     fs.writeFileSync('data.json', JSON.stringify(products, null, 2));
//     res.json({ message: 'Product added successfully!', product: newProduct });
// });

// app.put('/api/products/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const updatedProduct = req.body;
//     const productIndex = products.findIndex(product => product.id === id);

//     if (productIndex !== -1) {
//         products[productIndex] = { ...products[productIndex], ...updatedProduct };
//         fs.writeFileSync('data.json', JSON.stringify(products, null, 2));
//         res.json({ message: 'Product updated successfully!', product: products[productIndex] });
//     } else {
//         res.status(404).send('Product not found');
//     }
// });

// app.delete('/api/products/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     products = products.filter(product => product.id !== id);
//     fs.writeFileSync('data.json', JSON.stringify(products, null, 2));
//     res.send('Product deleted');
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
    
// });fetch('http://localhost:3000/api/products')
//     .then(response => response.json())
//     .then(products => {
//         console.log(products); // Handle the products data
//     })
//     .catch(error => console.error('Error fetching products:', error));fetch('http://localhost:3000/api/products')
//     .then(response => response.json())
//     .then(products => {
//         console.log(products); // Handle the products data
//     })
//     .catch(error => console.error('Error fetching products:', error));





// server.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Load customers from db.json
let customers = [];
const loadCustomers = () => {
    try {
        const data = fs.readFileSync('db.json');
        customers = JSON.parse(data).customers;
    } catch (err) {
        console.error("Error reading db.json:", err);
    }
};

loadCustomers();

// API Endpoints
app.get('/api/customers', (req, res) => {
    res.json(customers);
});

app.post('/api/customers', (req, res) => {
    const newCustomer = req.body;
    newCustomer.id = customers.length + 1; // Assign a new ID
    customers.push(newCustomer);
    fs.writeFileSync('db.json', JSON.stringify({ customers }, null, 2));
    res.json({ message: 'Customer added successfully!', customer: newCustomer });
});

app.put('/api/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedCustomer = req.body;
    const customerIndex = customers.findIndex(customer => customer.id === id);

    if (customerIndex !== -1) {
        customers[customerIndex] = { ...customers[customerIndex], ...updatedCustomer };
        fs.writeFileSync('db.json', JSON.stringify({ customers }, null, 2));
        res.json({ message: 'Customer updated successfully!', customer: customers[customerIndex] });
    } else {
        res.status(404).send('Customer not found');
    }
});

app.delete('/api/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    customers = customers.filter(customer => customer.id !== id);
    fs.writeFileSync('db.json', JSON.stringify({ customers }, null, 2));
    res.send('Customer deleted');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});