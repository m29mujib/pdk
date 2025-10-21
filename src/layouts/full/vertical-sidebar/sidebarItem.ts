import {
  ApertureIcon,
  AppWindowIcon,
  CopyIcon,
  LayoutDashboardIcon,
  LogoutIcon,
  ShieldLockIcon,
} from 'vue-tabler-icons'

export interface menu {
  header?: string
  title?: string
  icon?: any
  to?: string
  children?: menu[]
  external?: boolean
  disabled?: boolean
  type?: string
}

// =============================
// SIDEBAR ITEMS (bagian utama)
// =============================
const sidebarItem: menu[] = [
  { header: 'M E N U' },
  {
    title: 'Dashboard',
    icon: LayoutDashboardIcon,
    to: '/',
    external: false,
  },
  {
    title: 'Manajemen Pengguna',
    icon: AppWindowIcon,
    to: '/managemen-pengguna',
    external: false,
    children: [
      { title: 'Daftar Pengguna', to: '/managemen-pengguna/daftar-pengguna', external: false },
      { title: 'Pengajuan Kata Sandi', to: '/managemen-pengguna/pengajuan-kata-sandi', external: false },
      { title: 'Log Aktivitas', to: '/managemen-pengguna/log-aktivitas', external: false },
      { title: 'Levelisasi Pengguna', to: '/managemen-pengguna/levelisasi-pengguna', external: false },
    ],
  },
  {
    title: 'Manajemen Proyek',
    icon: CopyIcon,
    to: '/managemen-proyek',
    external: false,
    children: [
      { title: 'Modul Juknis', to: '/managemen-proyek/modul-juknis', external: false },
      { title: 'Modul POC', to: '/managemen-proyek/modul-poc', external: false },
      { title: 'Blasting Informasi', to: '/managemen-proyek/informasi-broadcast', external: false },
    ],
  },
  {
    title: 'Laporan',
    icon: ApertureIcon,
    to: '/laporan',
    external: false,
  },
]

// =============================
// FOOTER ITEMS (GENERAL section)
// =============================
export const footerItems: menu[] = [
  { header: 'G E N E R A L'},
  {
    title: 'Pengaturan & Keamanan',
    icon: ShieldLockIcon,
    to: '/pengaturan-keamanan',
    external: false,
  },
  {
    title: 'Logout',
    icon: LogoutIcon,
    to: '/login',
    external: false,
  },
]

export default sidebarItem
