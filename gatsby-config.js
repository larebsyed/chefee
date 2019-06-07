const config = require('./data/SiteConfig');

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix;

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    rssMetadata: {
      site_url: config.siteUrl + pathPrefix,
      feed_url: config.siteUrl + pathPrefix + config.siteRss,
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${config.siteUrl + pathPrefix}/logos/logo-512.png`,
      author: config.userName,
      copyright: config.copyright,
    },
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site.
        baseUrl: 'chefportal.wordpress.com',
        // baseUrl: 'wpgatsby.wtf',
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: true,
        // The protocol. This can be http or https.
        protocol: 'https',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: false,
        auth: {
          // If auth.user and auth.pass are filled, then the source plugin will be allowed
          // to access endpoints that are protected with .htaccess.
          // htaccess_user: "your-htaccess-username",
          // htaccess_pass: "your-htaccess-password",
          // htaccess_sendImmediately: false,

          // If hostingWPCOM is true then you will need to communicate with wordpress.com API
          // in order to do that you need to create an app (of type Web) at https://developer.wordpress.com/apps/
          // then add your clientId, clientSecret, username, and password here
          // Learn about environment variables: https://www.gatsbyjs.org/docs/environment-variables
          // If two-factor authentication is enabled then you need to create an Application-Specific Password,
          // see https://en.support.wordpress.com/security/two-step-authentication/#application-specific-passwords
          wpcom_app_clientSecret:
            'rOfYYmrd58Cq8pQb92qOHmWoAzPdO2oKhX7q0uFVrlAogwyP4eu705thlHo9Ng4k',
          wpcom_app_clientId: '65922',
          wpcom_user: 'sultenate',
          wpcom_pass: 'deadoralive',
          // If you use "JWT Authentication for WP REST API" (https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)
          // or (https://github.com/jonathan-dejong/simple-jwt-authentication) requires jwt_base_path, path can be found in wordpress wp-api.
          // plugin, you can specify user and password to obtain access token and use authenticated requests against wordpress REST API.
          jwt_user: process.env.JWT_USER,
          jwt_pass: process.env.JWT_PASSWORD,
          jwt_base_path: '/jwt-auth/v1/token', // Default - can skip if you are using https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/
        }, // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: true,
        excludedRoutes: [
          '/*/*/comments',
          '/yoast/**',
          '/*/*/users',
          '/*/users/me',
          '/oembed/*',
        ],
      },
    },
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId: config.googleAnalyticsID,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-twitter',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitle,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icons: [
          {
            src: '/logos/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logos/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-offline',
  ],
};
