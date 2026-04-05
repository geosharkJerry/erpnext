import { useTranslation } from 'react-i18next';
import { Filter, Download, Plus } from 'lucide-react';

export default function FilterBar({ filters = [], onAdd, addLabel, onExport }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center gap-3 mb-4 animate-fade-in">
      <div className="flex items-center gap-2 flex-1 flex-wrap">
        {filters.map((filter, idx) => (
          <select
            key={idx}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            {t('common.export')}
          </button>
        )}
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {addLabel || t('common.add')}
          </button>
        )}
      </div>
    </div>
  );
}
