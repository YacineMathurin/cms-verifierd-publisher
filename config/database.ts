// config/database.js
module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "strapi"),
      user: env("DATABASE_USERNAME", "strapi"),
      password: env("DATABASE_PASSWORD", "strapi_password"),
      ssl: env.bool("DATABASE_SSL", false) && {
        rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", true),
      },
    },
    debug: false,
    acquireConnectionTimeout: 60000,
    pool: {
      min: 0,
      max: 10,
      acquireTimeoutMillis: 60000,
      createTimeoutMillis: 30000,
      destroyTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 200,
    },
    // Add migration configuration
    migrations: {
      tableName: "knex_migrations",
    },
  },
});
