import categories from '../../data/categories.json'
import { formatDate, formatTime, formatCurrency } from '../../utils/helper';

export default function TransactionList({ transactions }) {

  return (
    // <div className="card shadow-sm flex-grow-1 of-auto"></div>
    <div className="card border-0 shadow h-40 of-auto mb-3">
      <ul className="list-group list-group-flush transactions-table">

        <li className="list-group-item transactions-table-header bg-body-tertiary">
          <div className="row fw-semibold fs-md ">
            <div className="col">Category</div>
            <div className="col text-center">Date</div>
            <div className="col text-end">amount</div>
          </div>
        </li>

        {/* Items List */}
        {transactions.map((transaction) =>
          <li
            key={transaction.id}
            className="list-group-item list-group-item-action">
            <div className="row fs-md">
              <div className="col">
                <div className="d-flex justify-content-start align-items-center">
                  <div><i
                    className={`fa-solid ${categories.find((cat) => cat.name.includes(transaction.category))?.icon}`}
                    style={{ color: categories.find((cat) => cat.name.includes(transaction.category))?.color }}></i></div>
                  <div className="ms-2">{transaction.category}</div>
                </div>
              </div>
              <div className="col text-center text-truncate">{formatDate(transaction.date)} | {formatTime(transaction.date)}</div>
              <div className={`col fw-semibold text-end text-${transaction.cashflow === 'income' ? 'success' : 'danger'}`}>{formatCurrency(transaction.amount)}</div>
            </div>
          </li>)}

      </ul>
    </div>
  );
}
