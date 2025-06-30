import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  IndianRupee, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Settings,
  Building2,
  FileText,
  CreditCard,
  UserCheck,
  ArrowLeftRight
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const getNavigationItems = (role: UserRole) => {
    // include Dashboard and Tax Master for *all* roles
    const baseItems = [
      { path: '/dashboard',       icon: LayoutDashboard, label: 'Dashboard'   }
      
    ];

    switch (role) {
      case 'SNA':
        return [
          ...baseItems,
          { path: '/fund-allocation-sna',       icon: IndianRupee,    label: 'Fund Allocation'    },
          { path: '/user-management',       icon: Users,          label: 'User Management'    },
          { path: '/department-management', icon: Building2,      label: 'District Management'},
          { path: '/tax-master',      icon: FileText,        label: 'Tax Master'  },
          { path: '/reports',               icon: BarChart3,      label: 'Reports'            },
          // { path: '/settings',              icon: Settings,       label: 'Settings'           }
        ];
      case 'DNA':
        return [
          ...baseItems,
          { path: '/fund-approval',          icon: CheckCircle,  label: 'Fund Approval'      },
          { path: '/fund-allocation',       icon: IndianRupee,    label: 'Fund Allocation'    },
          // { path: '/return-funds',           icon: ArrowLeftRight,label: 'Return Funds'       },
          { path: '/tax-master',      icon: FileText,        label: 'Tax Master'  },
          // { path: '/vendor-verification',    icon: UserCheck,    label: 'Vendor Verification' },
          { path: '/reports',                icon: BarChart3,    label: 'Reports'            }
        ];
      case 'IDA':
        return [
          ...baseItems,
          { path: '/project-approval',       icon: FileText,     label: 'Project Approval'   },
          { path: '/fund-allocation',       icon: IndianRupee,    label: 'Fund Allocation'    },
          { path: '/fund-enhancement',       icon: TrendingUp,   label: 'Fund Enhancement'   },
          { path: '/tax-master',      icon: FileText,        label: 'Tax Master'  },
          { path: '/fund-return',            icon: ArrowLeftRight,label: 'Fund Return'        },
          { path: '/reports',                icon: BarChart3,    label: 'Reports'            }
        ];
      case 'IA':
        return [
          ...baseItems,
          { path: '/fund-disbursement',      icon: CreditCard,   label: 'Fund Demand'        },
          { path: '/vendor-management',      icon: Users,        label: 'Vendor Management'  },
          { path: '/tax-master',      icon: FileText,        label: 'Tax Master'  },
          { path: '/project-progress',       icon: TrendingUp,   label: 'Project Progress'   },
          { path: '/reports',                icon: BarChart3,    label: 'Reports'            }
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems(user?.role || 'IA');

  return (
    <div className="bg-white shadow-lg h-full w-64 fixed left-0 top-0 z-50 border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">MH</span>
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-lg">FMS</h2>
            <p className="text-xs text-gray-600">{user?.role} Portal</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {navigationItems.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-600">{user?.department}</p>
          <p className="text-xs text-gray-500">{user?.district}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
