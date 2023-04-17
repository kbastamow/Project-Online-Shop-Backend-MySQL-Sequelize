# Project E-commerce 🖥️ 🛒

# Description 📜 

The aim of the project was to create a backend for an imaginary online shop using **Node Js** and **Express** together with **MySQL** and **Sequelize**. A variety of REST APIs provide access to the data.

# Objectives 🎯

The obligatory requirements for completing the exercice consist of:

- [x] At least four tables with one-to-many and many-to-many associations (Users, Products, Categories, Orders) and a diagram to visualise the relations.
- [x] User registration and password encryption with **Bcrypt**
- [x] Login with **JSON Web tokens** and the use of middleware
- [x] A variety of CRUD endpoints
- [x] Data validation
- [x] Seeders to create data

Optional:

- [x]  Admin and Superadmin roles
- [x] Email confirmation on registration using **Nodemailer**  
- [x]  An extra table of Reviews associated to Products and Users  
- [ ]  **Multer** to facilitate the uploading of images

Extras that I added:

- [x]  Extra endpoints to visualise data in different ways to consolidate the use of *inlude*, *through*, column aliases 
- [x]  An endpoint for an admin to approve of reviews before their publication
- [x] Front. A single page application as the user interface.


## Data modelling 🔄

I created a visual diagram of the database tables using MySQL Workbench: 

![Diagram](./readme_img/Diagram_ecommerce.png)

The database consists of 5 main tables: Users, Orders, Products, Categories and Reviews.

Table tokens is used for control purposes and is where session tokens are saved.  

Two junction tables define many-to-many relationships between categories and products, and products and orders. The latter has an extra column to record the quantity of each product in an order.

## Project architecture 🛠️

The organisation of folders and files becomes logical after a little practice, but for a first-timer it can look complex. Below is a breakdown of the program's file structure:


📁CONFIG 
- Defines my connection to the database in the development environment as well as password for authenticating tokens and using Nodemailer. The file is not uploaded to github; instead, an example template is uploaded.
Here we also have the file for Nodemailer.

📁CONTROLLERS 
- Code for different CRUD endpoints to interact with the database. Each table has its own file.

📁MIDDLEWARE 
- Authentication methods to check if a user is logged in (= has been issued a session token) or is an administrator. These checks are necessary to define actions that the user can perform with the database.

- Error handling: With Express, we can add a third parameter (req, res, **next**) to asynchronous functions and   "outsource" the handling of common errors to this middleware, which results in more efficient programming.

📁MIGRATIONS 
- Migrations are instructions for and a track record of changes in the database. Table columns and their properties may be defined here before performing the migration, i.e. creating or modifying a table.

📁MODELS 
- As the name says, models store the table structure,associations and constraints. As the endpoint methods make reference to these models, the table associations (one-to-many, many-to-many...), properties (datatype, required data field...) and validations must be correctly recorded here. 

📁NODE_MODULES 
- Nodemodules is an automatically created folder by Node JS and is where packages are stored. The contents are not uploaded to github.

📁ROUTES 
- Routes define the crud method and url to perform actions with the database. Here we also define which actions may need additional authentication.

📁SEEDERS 
- Seeders are used to create bulk data for the database for testing purposes.

📄index.js 
- This is the file that handles the initialisation of the program and the local server.

📄package-lock.json & package.json 
- The dependencies I am using are listed here.

📄.gitignore 
- Gitignore controls files that contain information that should not be committed or uploaded.


Furthermore, I created an infograph of the basic steps for the creation and manipulation of tables to better grasp the process before starting: 

<img src="./readme_img/sequelize_infograph.png" alt= "Infograph Sequelize" width="350px" height="auto">

***

## Controllers - observations 🚧


## 🔎 Using user-supplied info to find items
Parameters - added to URL:  **findByPk** or  **where**-clause: 

```js
const user = await User.findByPk(req.params.id);
```
```js
const foundUser = await User.findOne({
                where: {
                    id: req.params.id
                }
                });
```
Using req.body - information typically from a form:

```js
const user = await User.findOne({
                where: { email: req.body.email }
            });
```


## ⛓️ Including associated tables

Include associated table:

```js
 const product = await Product.findAll({
                include: {
                    model: Review
                }
            });
```

Include an associated table, and another table associated with it:

```js
const categories = await Category.findAll({
                include: [{ model: Product, include: [{ model: Review }] }]
            });
```


Include an associated table through a junction table.
```js
     const orders = await Order.findAll({
                include: [{ model: Product, through: { model: Order_Product, }}]
            })
```


Including **Attributes** (array) allows us to specify which information to include and which to exclude: 
```js
const reviews = await Review.findAll({
                include: [{ 
                    model: Product, 
                    attributes: ["id", "name"]
                }, {
                    model: User,
                    attributes: ["id", "name", "surname", "email"]
                 }] 
            })
```

Specify the **attributes** array but leave it empty - we can exclude the data. In this case, junction table is necessary to access the category related to the product, but we don't want to see any data from the through-table:

```js
const foundProduct = await Product.findByPk(req.params.id, {
                include:  { 
                    model: Category, 
                    attributes:["name"], 
                    through: { attributes: [] } //Excludes data from the junction table
                 }
            }) 
```

By adding another item in the attributes array, we can specify an **alias** for the data:

```js
attributes: [["id", "Order ID"]], //second value is alias
```


## 🔣 Using Sequelize operators:
Import **Op** and add to model object:
```js
const { Op } = Sequelize; 
const { Category, Product, Category_Product, Review, Sequelize } = require("../models/index.js");
```

```js
...
    const category = await Category.findAll({
        where: {
            name: { [Op.like]: `%${req.params.name}%` }
        }
    })
```

```js
    const products = await Product.findAll({
        where: {
            price: { [Op.between]: [(+req.params.price - 50), (+req.params.price + 50)] } //RANGE +- hundred  
                }
            });
```

## ↕️ Ordering results
```js
 const products = await Product.findAll({
                order: [   
                    ["price", "DESC"], //Array inside array
                ], 
            })
```

## ⛓️ Updating junction/associated tables:

Sequelize provides an easy way to modify associations while modifying the main table.
With **add-** and **set-** methods, it is possible to pass an **array** to pass more than one value

```js
const product = await Product.create(req.body);
product.addCategories(req.body.CategoryId); //addCategories creates entry to junction table
```

Postman:

![Postman](./readme_img/associations_add.png)

```js
await foundProduct.update(req.body);
foundProduct.setCategories(req.body.CategoryId); //setCategories updates junction table
```


In theory, Sequelize provides a way to delete associations by adding the following line to the Model:

```js
Product.hasMany(models.Review, { onDelete: "cascade" }),
```
However, in practice, **this does not appear to work**. It seems other programmers have faced similar issues. Therefore, the deletion of associations must be defined in the controller.

```js
await Product.destroy({where: {id: req.params.id}})           
await Review.destroy({where: {ProductId: req.params.id}});  //Delete from junction table
```

Currently, deletions of associated tables still need to be reviewed in the project.



***

## Seeders - observations 🚜

All the tables have a number of seeder files to populate the tables. User passwords have been encrypted in seeders too.

The seeders should be used together on an empty database to make sure foreign keys (ids) coincide logically.

It would be useful to seed junction tables with parent table seeder, but this is not possible with Sequelize **bulkInsert**.

```js
 async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( "Users", [
      {
      email: "testadmin@example.co",
      name: "Andy",
      surname: "Administrator",
      password: bcrypt.hashSync("1234", 10), 
      role:"admin",
      confirmed: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ...
```

***
## Front

I added a frontend with limited functionality:
* It displays products and responds to the different category/name search functions, showing the product, price, description and reviews, as well as calculating an average rating on the client side.
* It allows for login and logout, and displays the shopping cart that has been saved in the user's local storage. Products can be added or deleted from the cart.

Products are displayed as bootstrap cards. Details and reviews are collapsibles that can be seen on click.

![Computer](./readme_img/computerview.png)

![dropdown-collapsible](./readme_img/details1.png)

Login, registration and cart (for logged in users) are displayed on an offcanvas sidebar that can be opened by clicking the blue profile button.

![offcanvas](./readme_img/offcanvas.png)

On mobile devices, the cards occupy more horizontal space and the navbar stacks vertically.

![mobile](./readme_img/mobile.png)


On hover over product image, this lovely little css styling causes a zoom effect on the image: 

```css
.image-zoom {
    overflow: hidden;
  }
  
  .image-zoom img {
    transition: transform .5s ease;
    max-width: 100;
  }
  
  .image-zoom:hover img {
    transform: scale(1.5);
  }

  .show-details:hover, .read-more:hover {
    font-weight: bold;
    cursor: pointer;
  }

  .click:hover {
    cursor: pointer;
  }
```

## Tech 💻

Back:
* MySQL and MySQL Workbench
* Postman for endpoint testing
* Node.JS
* Dependencies: 
  * express
  * mysql2
  * sequelize
  * jsonwebtoken
  * bcryptjs
  * nodemailer
  * nodemon
  * cors

Front:
* HTML, JS - no frameworks
* CSS, Bootstrap 5
* AXIOS

## Author ♣️

* Kbastamow
 