const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    // =============================
    // DASHBOARD
    // =============================
    {
      name: 'Dashboard',
      path: '/',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: 'Dashboard' }
    },

    // =============================
    // MANAJEMEN PENGGUNA
    // =============================
    {
      name: 'Daftar Pengguna',
      path: '/managemen-pengguna/daftar-pengguna',
      component: () => import('@/views/managemen-pengguna/DaftarPengguna.vue'),
      meta: { title: 'Daftar Pengguna', parent: 'Manajemen Pengguna' }
    },
    {
      name: 'Pengajuan Kata Sandi',
      path: '/managemen-pengguna/pengajuan-kata-sandi',
      component: () => import('@/views/managemen-pengguna/PengajuanKataSandi.vue'),
      meta: { title: 'Pengajuan Kata Sandi', parent: 'Manajemen Pengguna' }
    },
    {
      name: 'Log Aktivitas',
      path: '/managemen-pengguna/log-aktivitas',
      component: () => import('@/views/managemen-pengguna/LogAktivitas.vue'),
      meta: { title: 'Log Aktivitas', parent: 'Manajemen Pengguna' }
    },

    // =============================
    // MANAJEMEN PROYEK
    // =============================
    {
      name: 'Modul Juknis',
      path: '/managemen-proyek/modul-juknis',
      component: () => import('@/views/managemen-proyek/ModulJuknis.vue'),
      meta: { title: 'Modul Juknis', parent: 'Manajemen Proyek' }
    },
    {
      name: 'Modul POC',
      path: '/managemen-proyek/modul-poc',
      component: () => import('@/views/managemen-proyek/ModulPoc.vue'),
      meta: { title: 'Modul POC', parent: 'Manajemen Proyek' }
    },
    {
      name: 'Informasi Broadcast',
      path: '/managemen-proyek/informasi-broadcast',
      component: () => import('@/views/managemen-proyek/InformasiBroadcast.vue'),
      meta: { title: 'Informasi Broadcast', parent: 'Manajemen Proyek' }
    },

    // =============================
    // FRONT PAGES (LAINNYA)
    // =============================
    {
      name: 'Laporan',
      path: '/laporan',
      component: () => import('@/views/laporan/Laporan.vue'),
      meta: { title: 'Laporan' }
    },

  ]
}

export default MainRoutes
