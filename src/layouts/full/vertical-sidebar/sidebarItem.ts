import {
    ApertureIcon,
    AppWindowIcon,
    CopyIcon,
    LayoutDashboardIcon,
    LogoutIcon,
    PointIcon,
    ShoppingCartIcon,
    TypographyIcon
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipColor?: string;
    chipBgColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
    external?: boolean;
}

const sidebarItem: menu[] = [
  { header: 'Home' },

  // =============================
  // DASHBOARD
  // =============================
  {
    title: 'Dashboard',
    icon: LayoutDashboardIcon,
    to: '/',
    external: false,
  },

  // =============================
  // MANAJEMEN PENGGUNA
  // =============================
  {
    title: 'Manajemen Pengguna',
    icon: AppWindowIcon,
    to: '/managemen-pengguna',
    external: false,
    children: [
      {
        title: 'Daftar Pengguna',
        icon: PointIcon,
        to: '/managemen-pengguna/daftar-pengguna',
        external: false,
      },
      {
        title: 'Pengajuan Kata Sandi',
        icon: PointIcon,
        to: '/managemen-pengguna/pengajuan-kata-sandi',
        external: false,
      },
      {
        title: 'Log Aktivitas',
        icon: PointIcon,
        to: '/managemen-pengguna/log-aktivitas',
        external: false,
      },
    ],
  },

  // =============================
  // MANAJEMEN PROYEK
  // =============================
  {
    title: 'Manajemen Proyek',
    icon: CopyIcon,
    to: '/managemen-proyek',
    external: false,
    children: [
      {
        title: 'Modul Juknis',
        icon: PointIcon,
        to: '/managemen-proyek/modul-juknis',
        external: false,
      },
      {
        title: 'Modul POC',
        icon: PointIcon,
        to: '/managemen-proyek/modul-poc',
        external: false,
      },
      {
        title: 'Informasi Broadcast',
        icon: PointIcon,
        to: '/managemen-proyek/informasi-broadcast',
        external: false,
      },
    ],
  },

  // =============================
  // LAPORAN
  // =============================
  {
    title: 'Laporan',
    icon: ApertureIcon,
    to: '/laporan',
    external: false,
  },
]

// Separate logout item for fixed position
export const logoutItem: menu = {
    title: 'Logout',
    icon: LogoutIcon,
    to: '/auth/login',
    external: false
};

export default sidebarItem;
