#!/bin/sh

# Substitui $PORT no arquivo nginx.conf
sed -i "s/\${PORT}/${PORT}/g" /app/nginx.conf

# Inicia PHP-FPM em background com configuração customizada
php-fpm -D -y /app/php-fpm.conf

# Inicia Nginx em foreground
nginx -c /app/nginx.conf -g "daemon off;"

