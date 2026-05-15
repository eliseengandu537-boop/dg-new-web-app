interface MenuItem {
    id: number;
    title: string;
    class_name?:string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        link: string;
        title: string;
    }[];
    menu_column?: {
        id: number;
        mega_title: string;
        mega_menus: {
            link: string;
            title: string;
        }[];
    }[]
}[];

const menu_data: MenuItem[] = [

    {
        id: 1,
        has_dropdown: false,
        title: "Home",
        link: "/home-two",
    },

    {
        id: 2,
        has_dropdown: true,
        title: "Properties",
        link: "#",
        sub_menus: [
            { link: "/listing_07", title: "All Listings" },
            { link: "/commercial-for-lease", title: "Commercial for Lease" },
            { link: "/fuel-station", title: "Fuel Station" },
            { link: "/investment", title: "Investment" },
            { link: "/listing_09", title: "Retail Leasing" },
            { link: "/development-land", title: "Development Land" },
            { link: "/listing_03", title: "Industrial Warehouse" },
        ],
    },

    {
        id: 3,
        has_dropdown: true,
        title: "Services",
        link: "#",
        sub_menus: [
            { link: "/service_02", title: "Investment Sales" },
            { link: "/service_details", title: "Retail Leasing" },
            { link: "/service_03", title: "Development Leasing" },
        ],
    },

    {
        id: 4,
        has_dropdown: true,
        title: "About",
        link: "#",
        sub_menus: [
            { link: "/about_us_02", title: "About DG Property" },
            { link: "/agent", title: "Our Brokers" },
            { link: "/our-services", title: "Our Services" },
        ],
    },

    {
        id: 5,
        has_dropdown: true,
        title: "Insights",
        link: "#",
        sub_menus: [
            { link: "/property-news", title: "Property News" },
        ],
    },

    {
        id: 6,
        has_dropdown: false,
        title: "Courses",
        link: "/courses",
    },

    {
        id: 7,
        has_dropdown: false,
        title: "Contact",
        link: "/contact",
    },
];
export default menu_data;
