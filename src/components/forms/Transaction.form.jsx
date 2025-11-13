import { useMemo, useState } from 'react';
import categories from '../../data/categories.json';
import paymentMethods from '../../data/payment_methods.json';
import Select from '../ui/Select';
import { Transaction } from '../../models/Transaction.model';
import ModalHeader from '../../context/dialogs/ModalHeader';
import DateGroup from '../ui/DateGroup';
import { generateID } from '../../utils/helper';

const TransactionForm = ({ transaction, title, onSubmit, onDelete, onCancel, confirmText = 'Save', deleteText = 'Delete' }) => {

    /** @type {[import('../../models/Transaction.model').Transaction]} */
    const [trans, setTrans] = useState(transaction ?? Transaction.instance());

    const categoryObject = useMemo(() => categories.find((c) => c.name.includes(trans.category)), [trans]);
    const paymentMethod = useMemo(() => paymentMethods.find((c) => c.key === trans.paymentMethod), [trans]);
    const [error, setError] = useState('');

    const handleSubmit = () => {

        let nTrans = JSON.parse(JSON.stringify(trans));

        try {
            if (!nTrans.description || nTrans.description === '') throw new Error('description required');
            if (!nTrans.cashflow) throw new Error('cashflow required') ;
            if (!nTrans.category) throw new Error( 'category required');
            if (!nTrans.amount) throw new Error( 'amount required');
            if(isNaN(parseFloat(nTrans.amount))) throw new Error( 'amount is not a number');
            if (!nTrans.date) throw new Error( 'date required');
            if (!nTrans.createdAt) nTrans.createdAt = new Date().toLocaleDateString();

            nTrans.id ??= generateID();
            nTrans.updatedAt = new Date().toLocaleDateString();
            nTrans.amount = parseFloat(nTrans.amount);

            onSubmit(nTrans);

        } catch (err) {
            setError(err.message)
        }
    }

    return (<>
        <div className='px-3 py-2'>
            <ModalHeader label={title ?? 'New Transaction'} />

            {/* Description */}
            <div className="mb-3">
                <div className="form-text fs-sm text-body-tertiary mb-1">Description</div>
                <div className="input-group custom bg-body-tertiary mb-3">
                    <div className="input-group-text text-body px-0 mx-0">
                        <i className="fa-solid fa-info fa-sm"></i>
                    </div>
                    <input
                        value={trans.description ?? ''} onChange={(e) => setTrans((prev) => ({ ...prev, description: e.target.value }))}
                        type="text" className="form-control fs-sm ps-0 ms-0" placeholder="Description" />
                </div>
            </div>

            {/* Cashflow */}
            <div className='mb-3'>
                <div className="form-text fs-sm text-body-tertiary mb-1">Cashflow</div>
                <Select
                    autoClose
                    className='w-100 bg-body-tertiary text-start'
                    icon={<i className='fa-solid fa-dollar-sign fa-lg me-2'></i>}
                    label={!trans.cashflow ? 'Cashflow' : trans.cashflow === 'expense' ? 'Expense' : 'Income'}
                    selected={[trans.cashflow]}
                    options={[{ key: 'expense', value: 'Expense' }, { key: 'income', value: 'Income' }]}
                    onClick={(key) => setTrans((prev) => ({ ...prev, cashflow: key }))}
                />
            </div>

            {/* Category */}
            <div className="mb-3">
                <div className="form-text fs-sm text-body-tertiary mb-1">Category</div>
                <Select
                    autoClose
                    className='w-100 bg-body-tertiary text-start'
                    icon={<i
                        className={`fa-solid ${categoryObject?.icon ?? 'fa-layer-group'} me-2`}
                        style={{ color: categoryObject?.color ?? 'unset' }}></i>}
                    label={<span>{categoryObject?.name ?? 'Choose Category'}</span>}
                    selected={[trans.category]}
                    options={
                        categories
                            .filter((category) => category.type === trans.cashflow)
                            .map((category) =>
                                ({ key: category.name, value: category.name, icon: 'fa-solid ' + category.icon, color: category.color }))}
                    onClick={(key) => setTrans((prev) => ({ ...prev, category: key }))}
                />
            </div>

            {/* Payment Method */}
            <div className="mb-3">
                <div className="form-text fs-sm text-body-tertiary mb-1">Payment Method</div>
                <Select
                    autoClose
                    className='w-100 bg-body-tertiary text-start'
                    icon={<i className={`${paymentMethod?.icon ?? 'fa-solid fa-comment-dollar'} me-2`}></i>}
                    label={<span>{paymentMethod?.key ?? 'Choose Payment Method'}</span>}
                    selected={[trans.paymentMethod]}
                    options={paymentMethods.map((method) => ({ key: method.key, value: method.key, icon: method.icon }))}
                    onClick={(key) => setTrans((prev) => ({ ...prev, paymentMethod: key }))}
                />
            </div>

            {/* Amount */}
            <div className="mb-3">
                <div className="form-text fs-sm text-body-tertiary mb-1">Amount</div>
                <div className="input-group custom bg-body-tertiary mb-3">
                    <div className="input-group-text px-0 mx-0">
                        <i className="fa-solid fa-tag text-body fa-sm"></i>
                    </div>
                    <input
                        value={trans.amount ?? '1'} onChange={(e) => setTrans((prev) => ({ ...prev, amount: e.target.value }))}
                        type="number" min={0.1} className="form-control fs-sm ps-0 ms-0" placeholder="Description" />
                </div>
            </div>

            {/* Date */}
            <div className="mb-3">
                <div className="form-text fs-sm text-body-tertiary mb-1">Date</div>
                <DateGroup
                    withTime
                    selected={trans.date ? new Date(trans.date) : null}
                    icon={<i className='fa-solid fa-calendar fa-lg text-body'></i>}
                    placeholder={'Choose Date'}
                    onChange={(nDate) => setTrans((prev) => ({ ...prev, date: nDate ? nDate : null }))}
                />
            </div>

            <div className="form-text fs-sm text-danger text-center mb-1">{error}</div>

            <hr />

            <div className="d-flex justify-content-end align-items-center">
                {onCancel && <div className='mx-1'>
                    <button className="btn btn-secondary btn-sm w-100 mb-2" onClick={onCancel}>
                        Cancel
                    </button>
                </div>}

                {onDelete && <div className='mx-1'>
                    {transaction?.id && <button className="btn btn-danger btn-sm w-100 mb-2" onClick={onDelete}>
                        {deleteText}
                    </button>}
                </div>}

                <div className='mx-1'>
                    <button className="btn btn-primary btn-sm w-100 mb-2" onClick={handleSubmit}>
                        {confirmText}
                    </button>
                </div>

            </div>
        </div>
    </>);
}

export default TransactionForm;