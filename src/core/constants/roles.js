export const ROLES = {
    ADMIN: 'admin',
    STANDARD: 'standard',
};

export const ROUTES = {
    ADMIN_VIEW: '/admin-view',
    STANDARD_VIEW: '/standard-view',
    LOGIN: '/',
};

export const ROLE_REDIRECTS = {
    [ROLES.STANDARD]: ROUTES.STANDARD_VIEW,
};