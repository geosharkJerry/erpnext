import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  Eye, Edit2, CreditCard, TrendingUp, TrendingDown,
  Wallet, AlertTriangle, CheckCircle2, Clock
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import FilterBar from '../../components/common/FilterBar';
import StatusBadge from '../../components/common/StatusBadge';
import StatCard from '../../components/common/StatCard';
import { financialRecords, budgetData } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/format';

export default function Finance() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [statusFilter, setStatusFilter] = useState('all');
  const [tab, setTab] = useState('payments');

  const totalPaid = financialRecords
    .filter((r) => r.status === 'paid')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalPending = financialRecords
    .filter((r) => r.status === 'approved')
    .reduce((sum, r) => sum + r.amount, 0);

  const totalOverdue = financialRecords
    .filter((r) => r.status === 'overdue')
    .reduce((sum, r) => sum + r.amount, 0);

  const statusOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'paid', label: t('finance.statuses.paid') },
    { value: 'approved', label: t('finance.statuses.approved') },
    { value: 'overdue', label: t('finance.statuses.overdue') },
    { value: 'draft', label: t('finance.statuses.draft') },
  ];

  const filteredData = financialRecords.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    return true;
  });

  const tabs = [
    { key: 'payments', label: t('finance.payments'), icon: CreditCard },
    { key: 'budget', label: t('finance.budget'), icon: Wallet },
    { key: 'reports', label: t('finance.reports'), icon: TrendingUp },
  ];

  const columns = [
    {
      key: 'id',
      title: t('finance.paymentNo'),
      render: (val) => <span className="font-mono text-xs font-semibold text-primary-600">{val}</span>,
    },
    {
      key: 'invoiceNo',
      title: t('finance.invoiceNo'),
      render: (val) => <span className="font-mono text-xs text-gray-500">{val}</span>,
    },
    {
      key: 'relatedContract',
      title: t('contracts.contractNo'),
      render: (val) => <span className="font-mono text-xs text-purple-600">{val}</span>,
    },
    {
      key: 'supplier',
      title: t('procurement.supplier'),
    },
    {
      key: 'amount',
      title: t('common.amount'),
      render: (val) => (
        <span className="font-semibold text-gray-900">{formatCurrency(val, lang)}</span>
      ),
    },
    {
      key: 'paymentDate',
      title: t('finance.paymentDate'),
      render: (val) => formatDate(val, lang),
    },
    {
      key: 'method',
      title: t('finance.paymentMethod'),
      render: (val) => (
        <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600">
          {t(`finance.${val}`)}
        </span>
      ),
    },
    {
      key: 'status',
      title: t('common.status'),
      render: (val) => <StatusBadge status={val} label={t(`finance.statuses.${val}`)} />,
    },
    {
      key: 'action',
      title: t('common.action'),
      render: () => (
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-md hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-yellow-50 text-gray-400 hover:text-yellow-600 transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const budgetChartData = budgetData.map((d) => ({
    name: lang === 'vi' ? d.departmentVi : d.department,
    [t('finance.budgetAmount')]: d.budget / 10000,
    [t('finance.actualAmount')]: d.actual / 10000,
  }));

  return (
    <div className="space-y-6">
      <PageHeader title={t('finance.title')} subtitle={t('finance.subtitle')} />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title={t('finance.paid')}
          value={formatCurrency(totalPaid, lang)}
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title={t('common.pending')}
          value={formatCurrency(totalPending, lang)}
          icon={Clock}
          color="blue"
        />
        <StatCard
          title={t('finance.overdue')}
          value={formatCurrency(totalOverdue, lang)}
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-gray-200 w-fit">
        {tabs.map((tabItem) => (
          <button
            key={tabItem.key}
            onClick={() => setTab(tabItem.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              tab === tabItem.key
                ? 'bg-primary-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <tabItem.icon className="w-4 h-4" />
            {tabItem.label}
          </button>
        ))}
      </div>

      {tab === 'payments' && (
        <>
          <FilterBar
            filters={[
              { value: statusFilter, onChange: setStatusFilter, options: statusOptions },
            ]}
            onExport={() => {}}
          />
          <DataTable columns={columns} data={filteredData} pageSize={6} />
        </>
      )}

      {tab === 'budget' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('dashboard.budgetUsage')}</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={budgetChartData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" unit={lang === 'vi' ? 'tr' : '万'} />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                }}
              />
              <Legend />
              <Bar dataKey={t('finance.budgetAmount')} fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              <Bar dataKey={t('finance.actualAmount')} fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === 'reports' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Summary cards */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">{t('finance.reports')}</h3>
              {[
                { label: t('finance.receivable'), value: formatCurrency(2500000, lang), icon: TrendingUp, color: 'text-green-600' },
                { label: t('finance.payable'), value: formatCurrency(3200000, lang), icon: TrendingDown, color: 'text-red-600' },
                { label: t('finance.balance'), value: formatCurrency(-700000, lang), icon: Wallet, color: 'text-gray-600' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">
                {lang === 'vi' ? 'Phân tích chi phí theo quý' : '季度费用分析'}
              </h3>
              {['Q1', 'Q2', 'Q3', 'Q4'].map((q, i) => {
                const amounts = [3200000, 1800000, 0, 0];
                const budgets = [4000000, 4000000, 4000000, 4000000];
                const pct = Math.round((amounts[i] / budgets[i]) * 100);
                return (
                  <div key={q} className="p-3 rounded-lg bg-gray-50">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-700">{q} 2026</span>
                      <span className="text-xs text-gray-500">
                        {formatCurrency(amounts[i], lang)} / {formatCurrency(budgets[i], lang)}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${pct > 80 ? 'bg-red-500' : pct > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
