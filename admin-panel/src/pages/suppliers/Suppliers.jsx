import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  Eye, Edit2, Trash2, Star, Phone, Mail, MapPin,
  BarChart3, TrendingUp
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import FilterBar from '../../components/common/FilterBar';
import { suppliers } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';

const ratingColors = {
  excellent: 'bg-green-100 text-green-700 border-green-200',
  good: 'bg-blue-100 text-blue-700 border-blue-200',
  average: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  poor: 'bg-red-100 text-red-700 border-red-200',
};

const ratingStars = { excellent: 5, good: 4, average: 3, poor: 2 };

export default function Suppliers() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [typeFilter, setTypeFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  const typeOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'manufacturer', label: t('suppliers.types.manufacturer') },
    { value: 'distributor', label: t('suppliers.types.distributor') },
    { value: 'service', label: t('suppliers.types.service') },
    { value: 'agent', label: t('suppliers.types.agent') },
  ];

  const ratingOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'excellent', label: t('suppliers.ratings.excellent') },
    { value: 'good', label: t('suppliers.ratings.good') },
    { value: 'average', label: t('suppliers.ratings.average') },
    { value: 'poor', label: t('suppliers.ratings.poor') },
  ];

  const filteredData = suppliers.filter((s) => {
    if (typeFilter !== 'all' && s.type !== typeFilter) return false;
    if (ratingFilter !== 'all' && s.rating !== ratingFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title={t('suppliers.title')}
        subtitle={t('suppliers.subtitle')}
      />

      <FilterBar
        filters={[
          { value: typeFilter, onChange: setTypeFilter, options: typeOptions },
          { value: ratingFilter, onChange: setRatingFilter, options: ratingOptions },
        ]}
        onAdd={() => {}}
        addLabel={t('suppliers.newSupplier')}
        onExport={() => {}}
      />

      {/* Supplier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredData.map((supplier, idx) => (
          <div
            key={supplier.id}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all animate-fade-in"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {lang === 'vi' ? supplier.nameVi : supplier.name}
                </h3>
                <p className="text-xs text-gray-400 font-mono">{supplier.code}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${ratingColors[supplier.rating]}`}>
                {t(`suppliers.ratings.${supplier.rating}`)}
              </span>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < ratingStars[supplier.rating]
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
              <span className="text-sm font-semibold text-gray-700 ml-1">{supplier.score}</span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Phone className="w-3 h-3" />
                <span>{lang === 'vi' ? supplier.contactVi : supplier.contact} - {supplier.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Mail className="w-3 h-3" />
                <span>{supplier.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>{lang === 'vi' ? supplier.countryVi : supplier.country}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-2.5 rounded-lg bg-gray-50">
                <div className="flex items-center gap-1 mb-1">
                  <BarChart3 className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] text-gray-400">{t('suppliers.totalOrders')}</span>
                </div>
                <p className="text-sm font-bold text-gray-900">{supplier.totalOrders}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-gray-50">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] text-gray-400">{t('suppliers.totalAmount')}</span>
                </div>
                <p className="text-sm font-bold text-gray-900">{formatCurrency(supplier.totalAmount, lang)}</p>
              </div>
            </div>

            {/* Performance Bars */}
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">{t('suppliers.onTimeRate')}</span>
                  <span className="font-medium text-gray-700">{supplier.onTimeRate}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${supplier.onTimeRate}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">{t('suppliers.qualityRate')}</span>
                  <span className="font-medium text-gray-700">{supplier.qualityRate}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${supplier.qualityRate}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-1 mt-4 pt-3 border-t border-gray-100">
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
          </div>
        ))}
      </div>
    </div>
  );
}
