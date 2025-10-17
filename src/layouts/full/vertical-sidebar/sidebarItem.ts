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
    {
        title: 'Dashboard',
        icon: LayoutDashboardIcon,
        to: '/',
        external: false
    },
    {
        title: 'Managemen Pengguna',
        icon: AppWindowIcon,
        to: '/',
        children: [
            {
                title: 'Daftar Pengguna',
                icon: PointIcon,
                to: '/front-page/homepage',
                external: false
            },
            {
                title: 'Log Aktivitas',
                icon: PointIcon,
                to: '/front-page/about-us',
                external: false
            },
        ]
    },
    {
        title: 'Managemen Proyek',
        icon: AppWindowIcon,
        to: '/',
        children: [
            {
                title: 'Modul Juknis',
                icon: PointIcon,
                to: '/front-page/homepage',
                external: false
            },
            {
                title: 'Modul POC',
                icon: PointIcon,
                to: '/front-page/about-us',
                external: false
            },
            {
                title: 'Informasi Broadcast',
                icon: PointIcon,
                to: '/front-page/about-us',
                external: false
            },
        ]
    },
    {
        title: 'Laporan',
        icon: ApertureIcon,
        to: '/dashboards/analytical',
        external: false
    },
    // {
    //     title: 'eCommerce',
    //     icon: ShoppingCartIcon,
    //     to: '/dashboards/ecommerce',
    //     external: false
    // },
    // {
    //     title: 'Front Pages',
    //     icon: AppWindowIcon,
    //     to: '/',
    //     children: [
    //         {
    //             title: 'Homepage',
    //             icon: PointIcon,
    //             to: '/front-page/homepage',
    //             external: false
    //         },
    //         {
    //             title: 'About Us',
    //             icon: PointIcon,
    //             to: '/front-page/about-us',
    //             external: false
    //         },
    //         {
    //             title: 'Blog',
    //             icon: PointIcon,
    //             to: '/front-page/blog',
    //             external: false
    //         },
    //         {
    //             title: 'Contact Us',
    //             icon: PointIcon,
    //             to: '/front-page/contact-us',
    //             external: false
    //         },
    //         {
    //             title: 'Portfolio',
    //             icon: PointIcon,
    //             to: '/front-page/portfolio',
    //             external: false
    //         },
    //         {
    //             title: 'Pricing',
    //             icon: PointIcon,
    //             to: '/front-page/pricing',
    //             external: false
    //         }
    //     ]
    // },

    // { header: 'utilities' },
    // {
    //     title: 'Typography',
    //     icon: TypographyIcon,
    //     to: '/ui/typography',
    //     external: false
    // },
    // {
    //     title: 'Shadow',
    //     icon: CopyIcon,
    //     to: '/ui/shadow',
    //     external: false
    // }
];

// Separate logout item for fixed position
export const logoutItem: menu = {
    title: 'Logout',
    icon: LogoutIcon,
    to: '/auth/login',
    external: false
};

export default sidebarItem;
