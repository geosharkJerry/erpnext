import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  Building2, Users, Shield, Globe, Calendar, GitBranch,
  Bell, Database, ClipboardList, Save, ChevronRight
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activeSection, setActiveSection] = useState('company');

  const sections = [
    { key: 'company', icon: Building2, label: t('settings.companyInfo') },
    { key: 'users', icon: Users, label: t('settings.users') },
    { key: 'roles', icon: Shield, label: t('settings.roles') },
    { key: 'approval', icon: GitBranch, label: t('settings.approvalFlow') },
    { key: 'notification', icon: Bell, label: t('settings.notification') },
    { key: 'backup', icon: Database, label: t('settings.backup') },
    { key: 'audit', icon: ClipboardList, label: t('settings.auditLog') },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={t('settings.title')} subtitle={t('settings.subtitle')} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Menu */}
        <div className="bg-white rounded-xl border border-gray-200 p-2 h-fit">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                activeSection === section.key
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <section.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{section.label}</span>
              <ChevronRight className={`w-3 h-3 ${activeSection === section.key ? 'text-primary-500' : 'text-gray-300'}`} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeSection === 'company' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('settings.companyInfo')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t('settings.companyName')}
                  </label>
                  <input
                    type="text"
                    defaultValue={lang === 'vi' ? 'Tập đoàn Công nghệ ABC' : 'ABC科技集团有限公司'}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t('settings.taxId')}
                  </label>
                  <input
                    type="text"
                    defaultValue="91110000MA01ABCDEF"
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t('settings.legalRep')}
                  </label>
                  <input
                    type="text"
                    defaultValue={lang === 'vi' ? 'Nguyễn Văn A' : '张三'}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t('settings.currency')}
                  </label>
                  <select className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="CNY">CNY - {lang === 'vi' ? 'Nhân dân tệ' : '人民币'}</option>
                    <option value="VND">VND - {lang === 'vi' ? 'Đồng Việt Nam' : '越南盾'}</option>
                    <option value="USD">USD - {lang === 'vi' ? 'Đô la Mỹ' : '美元'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t('settings.fiscalYear')}
                  </label>
                  <select className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>2026-01-01 ~ 2026-12-31</option>
                    <option>2025-04-01 ~ 2026-03-31</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {t('common.language')}
                  </label>
                  <select
                    value={lang}
                    onChange={(e) => {
                      i18n.changeLanguage(e.target.value);
                      localStorage.setItem('lang', e.target.value);
                    }}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="zh">中文</option>
                    <option value="vi">Tiếng Việt</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
                  <Save className="w-4 h-4" />
                  {t('common.save')}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('settings.users')}</h3>
              <div className="space-y-3">
                {[
                  { name: 'Admin', email: 'admin@erp.com', role: lang === 'vi' ? 'Quản trị viên' : '系统管理员', active: true },
                  { name: lang === 'vi' ? 'Nguyễn Minh' : '李明', email: 'liming@erp.com', role: lang === 'vi' ? 'Quản lý mua sắm' : '采购经理', active: true },
                  { name: lang === 'vi' ? 'Trần Hoa' : '王华', email: 'wanghua@erp.com', role: lang === 'vi' ? 'Quản lý tài chính' : '财务主管', active: true },
                  { name: lang === 'vi' ? 'Lê Cường' : '赵强', email: 'zhaoqiang@erp.com', role: lang === 'vi' ? 'Quản lý hợp đồng' : '合同管理员', active: false },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{user.role}</span>
                      <span className={`w-2 h-2 rounded-full ${user.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'roles' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('settings.roles')}</h3>
              <div className="space-y-4">
                {[
                  {
                    role: lang === 'vi' ? 'Quản trị viên' : '系统管理员',
                    desc: lang === 'vi' ? 'Toàn quyền truy cập hệ thống' : '拥有系统全部权限',
                    perms: ['dashboard', 'procurement', 'contracts', 'finance', 'suppliers', 'settings'],
                  },
                  {
                    role: lang === 'vi' ? 'Quản lý mua sắm' : '采购经理',
                    desc: lang === 'vi' ? 'Quản lý mua sắm và nhà cung cấp' : '管理设备采购和供应商',
                    perms: ['dashboard', 'procurement', 'suppliers'],
                  },
                  {
                    role: lang === 'vi' ? 'Quản lý tài chính' : '财务主管',
                    desc: lang === 'vi' ? 'Quản lý tài chính và hợp đồng' : '管理财务和合同',
                    perms: ['dashboard', 'contracts', 'finance'],
                  },
                ].map((r, i) => (
                  <div key={i} className="p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-primary-500" />
                      <span className="text-sm font-semibold text-gray-900">{r.role}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{r.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {r.perms.map((p) => (
                        <span key={p} className="text-[10px] px-2 py-1 rounded-md bg-primary-50 text-primary-600 font-medium">
                          {t(`nav.${p}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {['approval', 'notification', 'backup', 'audit'].includes(activeSection) && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                {activeSection === 'approval' && <GitBranch className="w-8 h-8 text-gray-400" />}
                {activeSection === 'notification' && <Bell className="w-8 h-8 text-gray-400" />}
                {activeSection === 'backup' && <Database className="w-8 h-8 text-gray-400" />}
                {activeSection === 'audit' && <ClipboardList className="w-8 h-8 text-gray-400" />}
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {sections.find((s) => s.key === activeSection)?.label}
              </h3>
              <p className="text-sm text-gray-400">
                {lang === 'vi' ? 'Tính năng này đang được phát triển...' : '此功能正在开发中...'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
