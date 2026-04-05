export const formatCurrency = (amount, lang = 'zh') => {
  if (lang === 'vi') {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(amount * 1000); // Convert for VND scale
  }
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  }).format(amount);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

export const formatDate = (dateStr, lang = 'zh') => {
  const date = new Date(dateStr);
  if (lang === 'vi') {
    return date.toLocaleDateString('vi-VN');
  }
  return date.toLocaleDateString('zh-CN');
};

export const getStatusColor = (status) => {
  const colors = {
    draft: 'bg-gray-100 text-gray-700',
    submitted: 'bg-blue-100 text-blue-700',
    review: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    ordered: 'bg-purple-100 text-purple-700',
    received: 'bg-emerald-100 text-emerald-700',
    active: 'bg-green-100 text-green-700',
    expiring: 'bg-orange-100 text-orange-700',
    expired: 'bg-red-100 text-red-700',
    terminated: 'bg-gray-100 text-gray-700',
    paid: 'bg-green-100 text-green-700',
    overdue: 'bg-red-100 text-red-700',
    cancelled: 'bg-gray-100 text-gray-700',
    pending: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

export const getCategoryIcon = (category) => {
  const icons = {
    mechanical: 'Wrench',
    electrical: 'Zap',
    it: 'Monitor',
    safety: 'Shield',
    office: 'Briefcase',
    production: 'Factory',
  };
  return icons[category] || 'Package';
};
