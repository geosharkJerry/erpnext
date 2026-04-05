import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Eye, Edit2, Trash2, FileText, CalendarDays } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import FilterBar from '../../components/common/FilterBar';
import StatusBadge from '../../components/common/StatusBadge';
import { contracts } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/format';

export default function Contracts() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'draft', label: t('contracts.statuses.draft') },
    { value: 'review', label: t('contracts.statuses.review') },
    { value: 'active', label: t('contracts.statuses.active') },
    { value: 'expiring', label: t('contracts.statuses.expiring') },
    { value: 'expired', label: t('contracts.statuses.expired') },
    { value: 'terminated', label: t('contracts.statuses.terminated') },
  ];

  const typeOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'purchase', label: t('contracts.types.purchase') },
    { value: 'service', label: t('contracts.types.service') },
    { value: 'maintenance', label: t('contracts.types.maintenance') },
    { value: 'lease', label: t('contracts.types.lease') },
    { value: 'framework', label: t('contracts.types.framework') },
  ];

  const filteredData = contracts.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (typeFilter !== 'all' && c.type !== typeFilter) return false;
    return true;
  });

  const columns = [
    {
      key: 'id',
      title: t('contracts.contractNo'),
      render: (val) => <span className="font-mono text-xs font-semibold text-primary-600">{val}</span>,
    },
    {
      key: 'name',
      title: t('contracts.contractName'),
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-purple-50">
            <FileText className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <span className="text-sm font-medium text-gray-900 max-w-[200px] truncate">
            {lang === 'vi' ? row.nameVi : val}
          </span>
        </div>
      ),
    },
    {
      key: 'type',
      title: t('contracts.contractType'),
      render: (val) => (
        <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600">
          {t(`contracts.types.${val}`)}
        </span>
      ),
    },
    {
      key: 'partyB',
      title: t('contracts.partyB'),
      render: (val, row) => <span className="text-sm">{lang === 'vi' ? row.partyBVi : val}</span>,
    },
    {
      key: 'period',
      title: `${t('contracts.startDate')} - ${t('contracts.endDate')}`,
      render: (_, row) => (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <CalendarDays className="w-3 h-3" />
          {formatDate(row.startDate, lang)} ~ {formatDate(row.endDate, lang)}
        </div>
      ),
    },
    {
      key: 'value',
      title: t('contracts.contractValue'),
      render: (val) => (
        <span className="font-semibold text-gray-900">{formatCurrency(val, lang)}</span>
      ),
    },
    {
      key: 'progress',
      title: `${t('contracts.paidAmount')} / ${t('contracts.contractValue')}`,
      render: (_, row) => {
        const pct = Math.round((row.paidAmount / row.value) * 100);
        return (
          <div className="w-28">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">{pct}%</span>
              <span className="text-gray-400">{formatCurrency(row.paidAmount, lang)}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      key: 'status',
      title: t('common.status'),
      render: (val) => <StatusBadge status={val} label={t(`contracts.statuses.${val}`)} />,
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
          <button className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title={t('contracts.title')}
        subtitle={t('contracts.subtitle')}
      />

      <FilterBar
        filters={[
          { value: statusFilter, onChange: setStatusFilter, options: statusOptions },
          { value: typeFilter, onChange: setTypeFilter, options: typeOptions },
        ]}
        onAdd={() => {}}
        addLabel={t('contracts.newContract')}
        onExport={() => {}}
      />

      <DataTable columns={columns} data={filteredData} pageSize={6} />
    </div>
  );
}
