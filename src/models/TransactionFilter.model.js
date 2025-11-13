import { getMonthRange } from "../utils/helper";

export class TransactionFilterModel {
    /** @type {Array<String>} */ cashflow
    /** @type {Array<String>} */ categories
    /** @type {Array<String>} */ paymentMethods
    /** @type {{min: Number, max: Number}} */ amountRange
    /** @type {{start: String, end: String}} */ dateRange
    /** @type {String} */ search

    /**
     * 
     * @param {TransactionFilterModel} data 
     * @returns {TransactionFilterModel}
     */
    static instance(data = {}){
        return JSON.parse(JSON.stringify({
            cashflow: data?.cashflow ?? [],
            categories: data?.categories ?? [],
            paymentMethods: data?.paymentMethods ?? [],
            amountRange: data?.amountRange ?? {min: 0.2, max: 6000 },
            dateRange: data?.dateRange ?? getMonthRange(),
            search: data?.search ?? ''
        }))
    }
}