import dj_database_url
from decouple import config
from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

ALLOWED_HOSTS = [
    'localhost',
    'www.infinity-dungeon.com.br',
    'infinity-dungeon.com.br',
    'rpg-game-fullstack-production.up.railway.app'
]

CSRF_TRUSTED_ORIGINS = [
    'https://www.infinity-dungeon.com.br',
    'https://infinity-dungeon.com.br',
    "https://rpg-game-fullstack-production.up.railway.app"
]

SECRET_KEY = "django-insecure-pd^kexiu#6#p@t+vvs&-s-18^9f=f0&l$=n&nu%xi(@-pb&xd1"

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'api',
    'game',
    'main',
    'authentication',
    'battle',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ["templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

IS_PRODUCTION = config('IS_PRODUCTION', default=False, cast=bool)

DATABASE_URL = config('DATABASE_URL')
if IS_PRODUCTION:
    DATABASES = {
        'default': dj_database_url.config(
        default=DATABASE_URL,
        conn_max_age=600,
        ssl_require=True
    )
    }
    DEBUG = False
    STATIC_URL = '/static/'
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = True  # força redirecionamento HTTP -> HTTPS
    SESSION_COOKIE_SECURE = True  # cookies só via HTTPS
    CSRF_COOKIE_SECURE = True     # cookie CSRF só via HTTPS

else:
    # DATABASES = {
    #     'default': {
    #         'ENGINE': 'django.db.backends.sqlite3',
    #         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    #     }
    # }
    DATABASES = {
        'default': dj_database_url.config(
        default=DATABASE_URL,
        conn_max_age=600,
        ssl_require=True
    )
    }
    DEBUG = True
    STATIC_URL = 'static/'
  
# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_ROOT = BASE_DIR / 'staticfiles'  # Esse é mais usado em produção

# Diretórios adicionais onde seus arquivos static podem estar
STATICFILES_DIRS = [
    BASE_DIR / 'static',  # Crie essa pasta na raiz do projeto
]

# URL base pra acessar as mídias via navegador
MEDIA_URL = '/media/'

# Caminho onde os arquivos vão ser salvos
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
    ]
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True

EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL')
