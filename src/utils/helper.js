import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Transaction } from '../models/Transaction.model';

export const cloneJSON = (json) => {
    if (!json) return null;
    return JSON.parse(JSON.stringify(json))
}

/**
 * Generate A New ID
 * @returns {String}
 */
export const generateID = () => dateNow().getTime().toString();

/**
 * Get Date now
 * @returns {Date}
 */
export const dateNow = () => new Date(Date.now());


/**
 * Changes a date into a readable format
 * * @param {Date | String} date 
 * @returns {String}
 */
export function formatDate(date) {
    return !date ? '-' : new Date(date).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
}

/**
 * Changes a date time into a readable time
 * @param {Date | String} date 
 * @returns {String}
 */
export function formatTime(date) {
    return new Date(date ?? '').toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })
}

export function getCurrentWeekRange() {
    const today = new Date();
    const day = today.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

    // figure out how many days to subtract to get back to Monday
    const diffToMonday = (day === 0 ? -6 : 1 - day);

    // Start of week (Monday)
    const start = new Date(today);
    start.setDate(today.getDate() + diffToMonday);

    // End of week (Sunday)
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    return { start, end };
}

export function getMonthRange(month) {
    const now = new Date();
    if (month) now.setMonth(month);

    // Get the first day of the current month
    const start = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get the last day of the current month
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return { start, end };
}

/**
 * Converts any image file into a base64 String
 * @param {File} file
 * @returns {String}
 */
export function imgToString(file) {
    // Check File
    if (!file) return null

    // Check extension (less reliable)
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['png', 'jpg', 'jpeg'].includes(ext)) return null;

    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();

            reader.onload = function (e) {
                const url = e.target.result;
                resolve(url)
            };

            reader.readAsDataURL(file);
        } catch (error) {
            resolve(null)
        }
    })
}

/**
 * Creates any image placeholder link and return a url
 * @param {String} size
 * @param {String} innerText
 * @param {String} color HEX Color
 * @returns {String}
 */
export function imagePlaceholder(size = '640x420', innerText = 'PMS', color = 'e0e0e0e') {
    return `https://placehold.co/${size}/${color}/white?text=${innerText}`
}

/**
 * Format A Currency
 * @param {Number} amount 
 * @param {String} currency 
 */
export const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount);
};

/**
 * Download a json file
 * @param {*} data 
 * @param {Sring} fileName 
 */
export const downloadJSON = (data, fileName = 'transactions') => {
    // Check the json object
    if (!data) return;

    // Convert to readable JSON
    const json = JSON.stringify(data, null, 2);

    // Create Blob and save using FileSaver
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    saveAs(blob, `${fileName}_${new Date().toISOString().slice(0, 10)}.json`);
}

/**
 * Convert a JSON Object and Download it as a CSV file
 * @param {*} data 
 * @param {Sring} fileName 
 */
export const downloadCSV = (data, fileName = 'transactions') => {
    // Check the json object
    if (!data) return;

    // Convert to CSV
    const csv = Papa.unparse(data);

    // Create a blob & trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${fileName}_${new Date().toISOString().slice(0, 10)}.csv`);
}

/**
 * Calcuates Transaction Amounts Such as expense, income & wallet 
 * @param {[]} transactions 
 * @returns {{expense: String, income: String, wallet: String}}
 */
export const claculateAmounts = (transactions = []) => {
    let expense = 0;
    let income = 0;

    transactions.forEach((trans) => {
        if (trans.cashflow === 'income') {
            income += parseFloat(trans.amount)
        } else {
            expense += parseFloat(trans.amount)
        }
    });

    const values = {
        income: income.toFixed(2),
        expense: expense.toFixed(2),
        wallet: (income - expense).toFixed(2),
    }

    return values;
};

/**
 * Convert JSON File To Text
 * @param {File} file 
 * @returns {Promise<Object | null>}
 */
export const ObjectFromJSONFile = (file) => {
    if (!file) return null
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target.result);
                resolve(json);
            } catch (err) {
                reject(null);
            }
        };
        reader.readAsText(file);
    });
}

/**
 * 
 * @param {File} file 
 * @returns {Promise<Object | null>}
 */
export const ObjectFromCSVFile = (file) => {
    if (!file) return null;

    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true, // Convert first row into keys
            skipEmptyLines: true,
            complete: function (results) {
                // Convert CSV to Object
                const json = results.data.map((row) => Transaction.instance(row));
                resolve(json);
            },
            error: (err) => {
                console.error(err);
                reject(null);
            },
        });
    });

}

// Validate Transaction Object
const isValidTransaction = (obj) => {
    const transactionStructure = {
        id: 'string',
        cashflow: 'string',
        category: 'string',
        amount: 'number',
        paymentMethod: 'string',
        date: 'string',
        description: 'string',
        createdAt: 'string',
        updatedAt: 'string',
    }

    if (typeof obj !== "object" || obj === null) return false;

    for (const key in transactionStructure) {
        const expectedType = transactionStructure[key];
        const actualType = typeof obj[key];

        // if key missing or wrong type
        if (!(key in obj) || actualType !== expectedType) {
            console.warn(`Invalid key or type for "${key}": expected ${expectedType}, got ${actualType}`);
            return false;
        }
    }

    return true;
};


// ✅ Validate JSON file
export const isValidJSONObject = (data) => {
    if (!Array.isArray(data)) {
        return false;
    }

    if (data.length === 0) {
        return false;
    }

    const allValid = data.every(isValidTransaction);
    if (!allValid) {
        return false;
    }

    return true;
};
