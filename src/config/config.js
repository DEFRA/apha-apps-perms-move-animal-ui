import convict from 'convict'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const fourHoursMs = 14400000
const oneWeekMs = 604800000

const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'
const isDevelopment = process.env.NODE_ENV === 'development'

export const config = convict({
  appBaseUrl: {
    doc: 'Application base URL for after we login',
    format: String,
    default: 'http://localhost:3000',
    env: 'APP_BASE_URL'
  },
  serviceVersion: {
    doc: 'The service version, this variable is injected into your docker container in CDP environments',
    format: String,
    nullable: true,
    default: null,
    env: 'SERVICE_VERSION'
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  staticCacheTimeout: {
    doc: 'Static cache timeout in milliseconds',
    format: Number,
    default: oneWeekMs,
    env: 'STATIC_CACHE_TIMEOUT'
  },
  serviceName: {
    doc: 'Applications Service Name',
    format: String,
    default: 'Get permission to move animals under disease controls'
  },
  root: {
    doc: 'Project root',
    format: String,
    default: path.resolve(dirname, '../..')
  },
  assetPath: {
    doc: 'Asset path',
    format: String,
    default: '/public',
    env: 'ASSET_PATH'
  },
  isProduction: {
    doc: 'If this application running in the production environment',
    format: Boolean,
    default: isProduction
  },
  isDevelopment: {
    doc: 'If this application running in the development environment',
    format: Boolean,
    default: isDevelopment
  },
  isTest: {
    doc: 'If this application running in the test environment',
    format: Boolean,
    default: isTest
  },
  log: {
    enabled: {
      doc: 'Is logging enabled',
      format: Boolean,
      default: process.env.NODE_ENV !== 'test',
      env: 'LOG_ENABLED'
    },
    level: {
      doc: 'Logging level',
      format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
      default: 'info',
      env: 'LOG_LEVEL'
    },
    format: {
      doc: 'Format to output logs in.',
      format: ['ecs', 'pino-pretty'],
      default: isProduction ? 'ecs' : 'pino-pretty',
      env: 'LOG_FORMAT'
    },
    redact: {
      doc: 'Log paths to redact',
      format: Array,
      default: isProduction
        ? ['req.headers.authorization', 'req.headers.cookie', 'res.headers']
        : ['req', 'res', 'responseTime']
    }
  },
  httpProxy: /** @type {SchemaObj<string | null>} */ ({
    doc: 'HTTP Proxy',
    format: String,
    nullable: true,
    default: null,
    env: 'CDP_HTTP_PROXY'
  }),
  httpsProxy: /** @type {SchemaObj<string | null>} */ ({
    doc: 'HTTPS Proxy',
    format: String,
    nullable: true,
    default: null,
    env: 'CDP_HTTPS_PROXY'
  }),
  isSecureContextEnabled: {
    doc: 'Enable Secure Context',
    format: Boolean,
    default: isProduction,
    env: 'ENABLE_SECURE_CONTEXT'
  },
  isMetricsEnabled: {
    doc: 'Enable metrics reporting',
    format: Boolean,
    default: isProduction,
    env: 'ENABLE_METRICS'
  },
  session: {
    cache: {
      engine: {
        doc: 'backend cache is written to',
        format: ['redis', 'memory'],
        default: isProduction ? 'redis' : 'memory',
        env: 'SESSION_CACHE_ENGINE'
      },
      name: {
        doc: 'server side session cache name',
        format: String,
        default: 'session',
        env: 'SESSION_CACHE_NAME'
      },
      ttl: {
        doc: 'server side session cache ttl',
        format: Number,
        default: fourHoursMs,
        env: 'SESSION_CACHE_TTL'
      }
    },
    cookie: {
      ttl: {
        doc: 'Session cookie ttl',
        format: Number,
        default: fourHoursMs,
        env: 'SESSION_COOKIE_TTL'
      },
      password: {
        doc: 'session cookie password',
        format: String,
        default: 'the-password-must-be-at-least-32-characters-long',
        env: 'SESSION_COOKIE_PASSWORD',
        sensitive: true
      },
      secure: {
        doc: 'set secure flag on cookie',
        format: Boolean,
        default: isProduction,
        env: 'SESSION_COOKIE_SECURE'
      }
    }
  },
  fileUpload: {
    uploaderUrl: {
      format: String,
      default: null,
      nullable: true,
      env: 'UPLOADER_URL'
    },
    bucket: {
      format: String,
      default: null,
      nullable: true,
      env: 'FILE_S3_BUCKET'
    },
    path: {
      format: String,
      default: null,
      nullable: true,
      env: 'FILE_S3_PATH'
    }
  },
  redis: /** @type {Schema<RedisConfig>} */ ({
    host: {
      doc: 'Redis cache host',
      format: String,
      default: '127.0.0.1',
      env: 'REDIS_HOST'
    },
    username: {
      doc: 'Redis cache username',
      format: String,
      default: '',
      env: 'REDIS_USERNAME'
    },
    password: {
      doc: 'Redis cache password',
      format: '*',
      default: '',
      sensitive: true,
      env: 'REDIS_PASSWORD'
    },
    keyPrefix: {
      doc: 'Redis cache key prefix name used to isolate the cached results across multiple clients',
      format: String,
      default: 'apha-apps-perms-move-animal-ui:',
      env: 'REDIS_KEY_PREFIX'
    },
    useSingleInstanceCache: {
      doc: 'Connect to a single instance of redis instead of a cluster.',
      format: Boolean,
      default: !isProduction,
      env: 'USE_SINGLE_INSTANCE_CACHE'
    },
    useTLS: {
      doc: 'Connect to redis using TLS',
      format: Boolean,
      default: isProduction,
      env: 'REDIS_TLS'
    }
  }),
  nunjucks: {
    watch: {
      doc: 'Reload templates when they are changed.',
      format: Boolean,
      default: isDevelopment
    },
    noCache: {
      doc: 'Use a cache and recompile templates each time',
      format: Boolean,
      default: isDevelopment
    }
  },
  notify: {
    templateId: /** @type {SchemaObj<string | null>} */ {
      format: String,
      default: null,
      nullable: true,
      env: 'NOTIFY_TEMPLATE_ID'
    },
    apiKey: /** @type {SchemaObj<string | null>} */ {
      format: String,
      default: null,
      nullable: true,
      env: 'NOTIFY_API_KEY'
    },
    caseDeliveryEmailAddress: /** @type {SchemaObj<string | null>} */ {
      format: String,
      default: null,
      nullable: true,
      env: 'NOTIFY_CASE_DELIVERY_EMAIL_ADDRESS'
    },
    timeout: {
      doc: 'Timeout for notify requests in milliseconds',
      format: Number,
      default: 10_000,
      env: 'NOTIFY_TIMEOUT'
    },
    fileRetention: {
      doc: 'How long to retain files for in GOV Notify',
      format: String,
      default: '1 week',
      env: 'NOTIFY_FILE_RETENTION'
    },
    confirmDownloadConfirmation: {
      doc: 'Does the user have to type destination email address before download starts?',
      format: Boolean,
      default: false,
      env: 'NOTIFY_EMAIL_DOWNLOAD_CONFIRMATION'
    }
  },
  aws: {
    region: {
      doc: 'AWS region to use',
      format: String,
      default: 'eu-west-2',
      env: 'AWS_REGION'
    },
    s3Endpoint: {
      doc: 'AWS S3 endpoint',
      format: String,
      default: 'http://127.0.0.1:4566',
      env: 'S3_ENDPOINT'
    }
  },
  featureFlags: {
    pdfUpload: {
      doc: 'Feature flag to enable PDF upload',
      format: Boolean,
      default: !isProduction,
      env: 'PDF_UPLOAD_FEATURE_ENABLED'
    },
    authEnabled: {
      doc: 'DEFRA ID Auth enabled',
      format: Boolean,
      env: 'DEFRA_ID_ENABLED',
      default: false
    }
  },
  gsPath: {
    doc: 'Path of the Ghostscript binary',
    format: String,
    default: '/usr/bin/gs',
    env: 'GS_BINARY'
  },
  auth: {
    defraIdOidcConfigurationUrl: {
      doc: 'DEFRA ID OIDC Configuration URL',
      format: String,
      env: 'DEFRA_ID_OIDC_CONFIGURATION_URL',
      default: ''
    },
    defraIdServiceId: {
      doc: 'DEFRA ID Service ID',
      format: String,
      env: 'DEFRA_ID_SERVICE_ID',
      default: ''
    },
    defraIdClientId: {
      doc: 'DEFRA ID Client ID',
      format: String,
      env: 'DEFRA_ID_CLIENT_ID',
      default: ''
    },
    defraIdClientSecret: {
      doc: 'DEFRA ID Client Secret',
      format: String,
      sensitive: true,
      env: 'DEFRA_ID_CLIENT_SECRET',
      default: ''
    },
    cookiePassword: {
      doc: 'auth session cookie password',
      format: String,
      default: 'the-password-must-be-at-least-32-characters-long-and-unique',
      env: 'AUTH_COOKIE_PASSWORD',
      sensitive: true
    }
  }
})

config.validate({ allowed: 'strict' })

/**
 * @import { Schema, SchemaObj } from 'convict'
 * @import { RedisConfig } from '~/src/server/common/helpers/redis-client.js'
 */
