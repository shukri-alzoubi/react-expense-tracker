export class Transaction {

    /** @type {String} */ id
    /** @type {'expense' | 'income'} */ cashflow
    /** @type {String} */ category
    /** @type {Number} */ amount
    /** @type {String} */ date
    /** @type {String} */ description
    /** @type {String} */ paymentMethod
    /** @type {String} */ createdAt
    /** @type {String} */ updatedAt

    /** 
     * Create A New Instance Of Json 
     * @param {Transaction} data
     * @returns {Transaction}
     */
    static instance(data = {}){
        return JSON.parse(JSON.stringify({
            id: data.id ?? new Date().getTime().toString(),
            cashflow: data.cashflow ?? 'expense',
            paymentMethod: data.paymentMethod,
            category: data.category,
            amount: data.amount ?? 1,
            date: data.date ?? new Date(),
            description: data.description,
            createdAt: data.createdAt ?? new Date().toLocaleString(),
            updatedAt: data.updatedAt ?? new Date().toLocaleString(),
        }));
    }
}