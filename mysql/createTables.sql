use NELISA;

CREATE TABLE IF NOT EXISTS products (
  prod_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  cat_id INT NOT NULL
  -- FOREIGN KEY (cat_id) REFERENCES categories(cat_id)
);

CREATE TABLE IF NOT EXISTS categories (
  cat_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  cat_name VARCHAR(30) NOT NULL,
  prod_id INT NOT NULL
--   FOREIGN KEY (prod_id) REFERENCES products(prod_id)
);

CREATE TABLE IF NOT EXISTS sales (
  sales_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  prod_id INT NOT NULL,
  sales_day VARCHAR(10),
  sales_date DATE NOT NULL,
  sales_quantity INT(6) NOT NULL,
  sales_unit_price DECIMAL(6,2) NOT NULL,
  FOREIGN KEY (prod_id) REFERENCES products(prod_id)
);

CREATE TABLE IF NOT EXISTS purchases (
  purchases_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  prod_id INT,
  purchase_date DATE NOT NULL,
  purchases_quantity INT(6) NOT NULL,
  purchases_unit_price DECIMAL(6,2) NOT NULL,
  total_sales DECIMAL (8,2),
  FOREIGN KEY (prod_id) REFERENCES products(prod_id)
);

ALTER TABLE products
    ADD FOREIGN KEY (cat_id)
    REFERENCES categories(cat_id);

ALTER TABLE categories
    ADD FOREIGN KEY (prod_id)
    REFERENCES products(prod_id);
