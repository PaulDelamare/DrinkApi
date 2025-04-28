const { db } = require('../config/api-config');


// Function to create the drinks table
async function createDrinkTable() {

    try {
        console.log('Creating drinks table...');

        // MySQL uses ENUM for restricting values instead of CHECK constraints
        await db.execute(`
            CREATE TABLE IF NOT EXISTS drinks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                type ENUM('gazeux', 'plat') NOT NULL
            );
        `);

        console.log('Drinks table created successfully');
    } catch (error) {
        console.error('Error creating drinks table:', error);
        throw error;
    } finally {
        await db.end();
    }
}

// Execute the function
createDrinkTable()
    .then(() => {
        console.log('Script execution completed');
    })
    .catch((err) => {
        console.error('Script execution failed:', err);
        process.exit(1);
    });