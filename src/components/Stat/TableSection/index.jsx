import { useOutletContext } from "react-router";
import { useMemo } from "react";

import "./tableSection.css";

const TableSection = () => {
  const { transactions, categories, t, calculateBalance } = useOutletContext();

  const lastFiveTransactions = useMemo(() => {
    if (!transactions) return [];
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  return (
    <>
      <section className="dashboard-transaction-list">
        <table className="dashboard-transaction-table">
          <caption>{t('Table.tableTitle')}</caption>
          <thead>
            <tr>
              <th title={t('Table.tooltipDate')}>{t('Table.titleDate')}</th>
              <th title={t('Table.tooltipPaiement')}>{t('Table.titlePaiemant')}</th>
              <th title={t('Table.tooltipBeneficiaire')}>{t('Table.titleBeneficiaire')}</th>
              <th title={t('Table.tooltipCat')}>{t('Table.titleCategory')}</th>
              <th title={t('Table.tooltipTypeAmount')}>{t('Table.titleTypeAmount')}</th>
              <th title={t('Table.tooltipSomme')}>{t('Table.titleSolde')}</th>
            </tr>
          </thead>
          <tbody>
            {lastFiveTransactions.map((tx) => {
              const category = categories.find(cat => cat._id === tx.categoryId);

              return (
                <tr key={tx._id}>
                  <td>{new Date(tx.date).toLocaleDateString()}</td>
                  <td>{tx.paiement}</td>
                  <td>{tx.beneficiaire}</td>
                  <td>{category?.name || "-"}</td>
                  <td>{tx.transactionType}</td>
                  <td>{tx.amount} €</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      <section className="table-card-container">
        {lastFiveTransactions.map((tx) => {
          const category = categories.find(cat => cat._id === tx.categoryId);

          return (
            <div key={tx._id} className="table-card">
              <span><strong>{t('Table.titleDate')} :</strong> {new Date(tx.date).toLocaleDateString()}</span>
              <span><strong>{t('Table.titlePaiemant')} :</strong> {tx.paiement}</span>
              <span><strong>{t('Table.titleBeneficiaire')} :</strong> {tx.beneficiaire}</span>
              <span><strong>{t('Table.titleCategory')} :</strong> {category?.name || "-"}</span>
              <span><strong>{t('Table.titleTypeAmount')} :</strong> {tx.typeAmount} €</span>
              <span><strong>{t('Table.titleSolde')} :</strong> {tx.amount} €</span>
            </div>
          )
        })}
      </section>
    </>
  );
};

export default TableSection;
