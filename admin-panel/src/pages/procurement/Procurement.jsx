import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Eye, Edit2, Trash2, Package } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import FilterBar from '../../components/common/FilterBar';
import StatusBadge from '../../components/common/StatusBadge';
import { procurementOrders } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/format';

export default function Procurement() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'draft', label: t('procurement.statuses.draft') },
    { value: 'submitted', label: t('procurement.statuses.submitted') },
    { value: 'approved', label: t('procurement.statuses.approved') },
    { value: 'ordered', label: t('procurement.statuses.ordered') },
    { value: 'received', label: t('procurement.statuses.received') },
    { value: 'cancelled', label: t('procurement.statuses.cancelled') },
  ];

  const categoryOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'mechanical', label: t('procurement.categories.mechanical') },
    { value: 'electrical', label: t('procurement.categories.electrical') },
    { value: 'it', label: t('procurement.categories.it') },
    { value: 'safety', label: t('procurement.categories.safety') },
    { value: 'office', label: t('procurement.categories.office') },
    { value: 'production', label: t('procurement.categories.production') },
  ];

  const filteredData = procurementOrders.filter((order) => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && order.category !== categoryFilter) return false;
    return true;
  });

  const getStatusLabel = (status) => {
    return t(`procurement.statuses.${status}`) || status;
  };

  const columns = [
    {
      key: 'id',
      title: t('procurement.orderNo'),
      render: (val) => <span className="font-mono text-xs font-semibold text-primary-600">{val}</span>,
    },
    {
      key: 'equipment',
      title: t('procurement.equipment'),
      render: (val, row) => (
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-gray-100">
            <Package className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{val.split(' / ')[lang === 'vi' ? 1 : 0] || val}</p>
            <p className="text-xs text-gray-400">{row.brand} {row.model}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'supplier',
      title: t('procurement.supplier'),
      render: (val, row) => (
        <span className="text-sm">{lang === 'vi' ? row.supplierVi : val}</span>
      ),
    },
    {
      key: 'category',
      title: t('procurement.category'),
      render: (val) => (
        <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600">
          {t(`procurement.categories.${val}`)}
        </span>
      ),
    },
    {
      key: 'quantity',
      title: t('procurement.quantity'),
    },
    {
      key: 'totalAmount',
      title: t('procurement.totalAmount'),
      render: (val) => (
        <span className="font-semibold text-gray-900">{formatCurrency(val, lang)}</span>
      ),
    },
    {
      key: 'deliveryDate',
      title: t('procurement.expectedDelivery'),
      render: (val) => formatDate(val, lang),
    },
    {
      key: 'status',
      title: t('common.status'),
      render: (val) => <StatusBadge status={val} label={getStatusLabel(val)} />,
    },
    {
      key: 'action',
      title: t('common.action'),
      render: (_, row) => (
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
        title={t('procurement.title')}
        subtitle={t('procurement.subtitle')}
      />

      <FilterBar
        filters={[
          { value: statusFilter, onChange: setStatusFilter, options: statusOptions },
          { value: categoryFilter, onChange: setCategoryFilter, options: categoryOptions },
        ]}
        onAdd={() => {}}
        addLabel={t('procurement.newOrder')}
        onExport={() => {}}
      />

      <DataTable columns={columns} data={filteredData} pageSize={6} />
    </div>
  );
}
