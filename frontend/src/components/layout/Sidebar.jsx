import React from 'react';

import {
  LayoutDashboard,
  FlaskConical,
  Users,
  ShieldAlert,
  FileCheck2,
  Scale,
  Blocks,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building2,
  UserPlus,
  Activity,
  FileText,
  BarChart3,
  Settings,
  ClipboardList,
  Database,
  FileBarChart2,
  ShieldCheck
} from 'lucide-react';

import { ROLES } from '../../data/mockData';
import { ROLE_NAV_ITEMS } from '../../data/roleDashboardConfig';
import { getTranslations } from '../../i18n';

export default function Sidebar({
  activeView,
  onSelectView,
  currentRole,
  currentUserName,
  isCollapsed,
  onToggleCollapse,
  onLogout,
  urgentSaeCount = 1,
  pendingIecCount = 2
  , language = 'en'
}) {
  const currentRoleObj =
    ROLES.find((r) => r.id === currentRole) || ROLES[0];
  const displayName = currentUserName || currentRoleObj.holder;
  const t = getTranslations(language);

  const allowedViews = new Set(ROLE_NAV_ITEMS[currentRole] || ROLE_NAV_ITEMS.admin);

  const itemCatalog = {
    dashboard: { label: t.dashboard, icon: LayoutDashboard },
    studies: { label: t.studies, icon: FlaskConical },
    patients: { label: t.patients, icon: Users },
    'data-queries': { label: 'Data Query Inbox', icon: Database },
    compliance: { label: 'Compliance Workspace', icon: ShieldCheck },
    ethics: { label: t.ethics, icon: FileCheck2, badge: pendingIecCount ? `${pendingIecCount} Pending` : null },
    pv: { label: 'AE/SAE Inbox', icon: ShieldAlert, badge: urgentSaeCount ? `${urgentSaeCount} Urgent` : null },
    'ae-summary': { label: 'AE Summary Dashboard', icon: FileBarChart2 },
    'dsmb-feed': { label: 'DSMB Signal Feed', icon: Activity },
    'study-create': { label: 'Study Creation', icon: FlaskConical },
    'admin-settings': { label: 'Admin Settings', icon: Settings },
    audit: { label: t.audit, icon: Blocks, badge: 'Verified' },
    fhir: { label: t.fhir, icon: Activity, badge: t.live },
    regulator: { label: t.regulator, icon: Scale },
    reports: { label: 'Reports & Downloads', icon: BarChart3 },
    documents: { label: 'Documents', icon: FileText },
  };

  const visibleNavigationSections = [
    {
      title: currentRole === 'admin' ? 'ADMINISTRATION' : 'WORKSPACE',
      items: Array.from(allowedViews)
        .filter((viewId) => itemCatalog[viewId])
        .map((viewId) => ({ id: viewId, ...itemCatalog[viewId] })),
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-30 bg-walnut-900 text-stone-300 border-r border-walnut-800 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      <div className="p-4 border-b border-walnut-800 flex items-center justify-between bg-walnut-900">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-11 h-11 rounded-lg bg-ivory-50 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
            <img
              src="/images/ministry-of-ayush-logo.png"
              alt="Ministry of Ayush"
              className="w-full h-full object-contain"
            />
          </div>

          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <h1 className="text-base font-bold tracking-tight text-white leading-tight truncate">
                AAYUR SAATHI
              </h1>
              <p className="text-stone-400 text-[10px] leading-snug">
                Clinical Trial Management System
              </p>
            </div>
          )}
        </div>

        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-walnut-800 transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {visibleNavigationSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                {section.title}
              </p>
            )}

            <div className="space-y-0.5 pt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                const isDisabled = item.disabled === true;

                return (
                  <button
                    key={item.id}
                    onClick={() => { if (!isDisabled) onSelectView(item.id); }}
                    disabled={isDisabled}
                    title={
                      isCollapsed
                        ? isDisabled ? `${item.label} — Coming Soon` : item.label
                        : isDisabled ? `${item.label} — Coming Soon` : undefined
                    }
                    className={`w-full flex items-center rounded-lg font-medium transition-colors group relative ${
                      isCollapsed ? 'p-3 justify-center' : 'px-3 py-2.5 justify-between text-xs'
                    } ${
                      isDisabled
                        ? 'text-stone-600 cursor-not-allowed opacity-60'
                        : isActive
                          ? 'bg-walnut-800 text-white font-semibold border-l-2 border-copper-400'
                          : 'text-stone-300 hover:text-white hover:bg-walnut-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isDisabled
                            ? 'text-stone-600'
                            : isActive
                              ? 'text-copper-300'
                              : 'text-stone-400 group-hover:text-copper-300'
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge && (
                      <span
                        className={`ml-2 px-1.5 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                          item.badgeColor || 'bg-walnut-800 text-stone-300 border border-walnut-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {!isCollapsed && isDisabled && (
                      <span className="ml-2 px-1.5 py-0.5 text-[8px] font-bold rounded uppercase tracking-wider bg-walnut-800 text-stone-500 border border-walnut-700">
                        Soon
                      </span>
                    )}

                    {isCollapsed && item.badge && !isDisabled && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-copper-400 ring-2 ring-walnut-900" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-walnut-800 bg-walnut-900">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between gap-3'}`}>
          <div className="flex items-center gap-2.5 min-w-0">
            {currentRole === 'pi' ? (
              <img
                src="/images/doctor_scientist_portrait.jpg"
                alt={currentRoleObj.holder}
                className="w-9 h-9 rounded-lg object-cover border border-walnut-700 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-copper-700 text-white font-bold text-xs flex items-center justify-center border border-copper-600 shrink-0">
                {currentRoleObj.avatar}
              </div>
            )}

            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-white truncate">
                    {displayName.split(' ')[0]} {displayName.split(' ')[1] || ''}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold bg-walnut-800 text-stone-300 border border-walnut-700 uppercase">
                    {currentRoleObj.badge}
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 truncate">{currentRoleObj.name}</p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={onLogout}
              title="Sign Out to Login Portal"
              className="p-1.5 text-stone-400 hover:text-crimson-300 hover:bg-walnut-800 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}