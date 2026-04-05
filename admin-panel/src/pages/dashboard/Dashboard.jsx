import { useTranslation } from 'react-i18next';
import {
  ShoppingCart,
  FileText,
  DollarSign,
  Clock,
  TrendingUp,
  Activity,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area,
} from 'recharts';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import {
  monthlyProcurementData,
  expenseCategories,
  recentActivities,
  budgetData,
  contracts,
} from '../../data/mockData';
import { formatCurrency } from '../../utils/format';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const chartData = monthlyProcurementData.map((d) => ({
    name: lang === 'vi' ? d.monthVi : d.month,
    amount: d.amount / 10000,
    orders: d.orders,
  }));

  const pieData = expenseCategories.map((d) => ({
    name: lang === 'vi' ? d.nameVi : d.name,
    value: d.value,
    color: d.color,
  }));

  const budgetChartData = budgetData.map((d) => ({
    name: lang === 'vi' ? d.departmentVi : d.department,
    budget: d.budget / 10000,
    actual: d.actual / 10000,
  }));

  const activeContracts = contracts.filter((c) => c.status === 'active').length;

  const activityIcons = {
    procurement: ShoppingCart,
    contract: FileText,
    finance: DollarSign,
    supplier: TrendingUp,
  };

  const activityColors = {
    procurement: 'bg-blue-100 text-blue-600',
    contract: 'bg-purple-100 text-purple-600',
    finance: 'bg-green-100 text-green-600',
    supplier: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t('dashboard.title')} subtitle={t('dashboard.subtitle')} />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('dashboard.totalProcurement')}
          value={formatCurrency(5098000, lang)}
          change={12.5}
          changeLabel={t('dashboard.vsLastMonth')}
          icon={ShoppingCart}
          color="blue"
        />
        <StatCard
          title={t('dashboard.activeContracts')}
          value={`${activeContracts}`}
          change={8.3}
          changeLabel={t('dashboard.vsLastMonth')}
          icon={FileText}
          color="purple"
        />
        <StatCard
          title={t('dashboard.monthlyExpense')}
          value={formatCurrency(1800000, lang)}
          change={-5.2}
          changeLabel={t('dashboard.vsLastMonth')}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title={t('dashboard.pendingApprovals')}
          value="7"
          change={15}
          changeLabel={t('dashboard.vsLastMonth')}
          icon={Clock}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Procurement Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('dashboard.procurementTrend')}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" unit={lang === 'vi' ? 'tr' : '万'} />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorAmount)"
                name={lang === 'vi' ? 'Số tiền (triệu)' : '金额 (万元)'}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown - Pie */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('dashboard.expenseBreakdown')}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(value, lang)}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconSize={8}
                wrapperStyle={{ fontSize: '11px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Usage */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('dashboard.budgetUsage')}</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={budgetChartData} layout="vertical" barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" unit={lang === 'vi' ? 'tr' : '万'} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" width={80} />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                }}
              />
              <Bar dataKey="budget" fill="#e2e8f0" name={t('finance.budgetAmount')} radius={[0, 4, 4, 0]} />
              <Bar dataKey="actual" fill="#3b82f6" name={t('finance.actualAmount')} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('dashboard.recentActivities')}</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => {
              const Icon = activityIcons[activity.type] || Activity;
              const colorClass = activityColors[activity.type] || 'bg-gray-100 text-gray-600';
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {lang === 'vi' ? activity.actionVi : activity.action}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {lang === 'vi' ? activity.detailVi : activity.detail}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {lang === 'vi' ? activity.timeVi : activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
