import { useEffect, useMemo, useState } from "react";
import { useFirestore } from "../context/Firestore.context"
import { Transaction } from "../models/Transaction.model";
import { TransactionFilterModel } from "../models/TransactionFilter.model";
import { useAuth } from "../context/Auth.context";

export const useTransaction = () => {

    const {user} = useAuth();
    const { data, updateField } = useFirestore();
    const allTransactions = useMemo(() => data?.transactions ?? [], [data]);

    useEffect(() => {
        updateFilter(filter);

        // eslint-disable-next-line
    }, [allTransactions])

    const setTransactions = async (list = []) => {
        if(user.email === 'demo@demo.com'){
            return new Promise((resolve)=>{setTimeout(()=>{resolve()}, 700)});
        }
        return updateField({ field: 'transactions', data: list });
    }

    /**
     * @param {Transaction} transaction 
     * @returns {Promise<boolean>}
     */
    const insertTransaction = async (transaction) => {
        let nTrans = Transaction.instance(transaction);
        return setTransactions([...allTransactions, nTrans]);
    }

    /**
    * @param {Transaction} transaction 
    * @returns {Promise<boolean>}
    */
    const updateTransaction = async (transaction) => {
        const nTrans = Transaction.instance(transaction);
        return setTransactions(allTransactions.map((trans) => trans.id === nTrans.id ? nTrans : trans));
    }

    /**
     * @param {Transaction} transaction 
     * @returns {Promise<boolean>}
     */
    const removeTransaction = async (transaction) => {
        return setTransactions(allTransactions.filter((trans) => trans.id !== transaction.id));
    }

    // Filter
    const [isFiltering, setIsFiltering] = useState();
    const [transactions, setFilteredTransactions] = useState([]);
    const [filter, setFilter] = useState(TransactionFilterModel.instance());

    const updateFilter = async (newFilter) => {
        newFilter = TransactionFilterModel.instance(newFilter);

        const promise = new Promise((resolve, reject) => {
            let nList = allTransactions.filter((trans) => {
                // Search
                const equalsSearch = trans.description.toLowerCase().includes(newFilter.search.toLowerCase());

                // Lists
                const equalsCashflow = newFilter.cashflow.length > 0 ? newFilter.cashflow.includes(trans.cashflow) : true;
                const equalsCategory = newFilter.categories.length > 0 ? newFilter.categories.includes(trans.category) : true;
                const equalsPaymentMethod = newFilter.paymentMethods.length > 0 ? newFilter.paymentMethods.includes(trans.paymentMethod) : true;

                const inAmountRange = newFilter.amountRange.min <= trans.amount && newFilter.amountRange.max >= trans.amount;

                // Check Date Range
                const date = new Date(trans.date).getTime();
                const equalsStartDate = !newFilter.dateRange.start ? true : new Date(newFilter.dateRange.start).getTime() <= date;
                const equalsEndDate = !newFilter.dateRange.end ? true : new Date(newFilter.dateRange.end).getTime() >= date;

                return equalsSearch && equalsCashflow && equalsCategory && equalsPaymentMethod && inAmountRange && equalsStartDate && equalsEndDate;
            });

            // Sort Transaction By Date
            nList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setTimeout(() => {
                resolve(nList);
            }, 200)
        });

        setIsFiltering(true);
        setFilter(newFilter);
        let nList = await promise;
        setFilteredTransactions(nList);
        setIsFiltering(false);
    }

    return {
        allTransactions,
        setTransactions,
        insertTransaction,
        updateTransaction,
        removeTransaction,

        // Filter
        isFiltering,
        filter,
        transactions,
        updateFilter,
    }
}