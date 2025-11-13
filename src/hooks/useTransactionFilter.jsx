import { useMemo, useState } from "react";
import paymentMethodsList from '../data/payment_methods.json'

export const useTransactionFilter = () => {

    const [search, setSearch] = useState('');
    const [cashflow, setCashflow] = useState(['expense', 'income']);
    const [paymentMethods, setPaymentMethods] = useState(() => (paymentMethodsList.map((p) => p.key)));
    const [categories, setCategories] = useState([]);
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [amountRange, setAmountRange] = useState({ min: 0.2, max: 6000 });

    const filter = useMemo(() => {
        return {
            search: search,
            cashflow: cashflow,
            paymentMethods: paymentMethods,
            categories: categories,
            dateRange: dateRange,
            amountRange: amountRange,
        }
    }, [search, cashflow, paymentMethods, categories, dateRange, amountRange])

    const updateSearch = (text) => {
        setSearch(text);
    }

    const toggleCashflow = (type) => {
        // Clear If Null
        if (!type) {
            setCashflow([]);
            return;
        }


        let ind = cashflow.indexOf(type);
        if (ind >= 0) { setCashflow((prev) => prev.filter((x, index) => index !== ind)); }
        else { setCashflow((prev) => [...prev, type]); }
    }

    const toggleCategory = (category) => {
        let ind = categories.indexOf(category);

        if (ind >= 0) {
            setCategories((prev) => prev.filter((x, index) => index !== ind));
        } else {
            setCategories((prev) => [...prev, category]);
        }
    }

    const togglePaymentMethod = (method) => {
        // Clear If Null
        if (!method) {
            setPaymentMethods([]);
            return;
        }

        let ind = paymentMethods.indexOf(method);
        if (ind >= 0) { setPaymentMethods((prev) => prev.filter((x, index) => index !== ind)); }
        else { setPaymentMethods((prev) => [...prev, method]); }

    }

    const updateDateRange = ({ start = null, end = null }) => {
        setDateRange((prev) => ({
            start: start === '' ? null : !start ? prev.start : start,
            end: end === '' ? null : !end ? prev.end : end,
        }));
    }

    const updateAmountRange = ({ min, max }) => {
        setAmountRange((prev) => ({
            min: min === '' ? 0.2 : !min ? prev.min : min,
            max: max === '' ? 6000 : !max ? prev.max : max,
        }));
    }

    return {
        filter,

        // Functions 
        updateSearch,
        toggleCashflow,
        toggleCategory,
        togglePaymentMethod,
        updateDateRange,
        updateAmountRange,

        // Main State Setters
        setCategories,

    }
}