FROM caddy:php73

COPY . /srv/app
COPY docker/Caddyfile /etc/Caddyfile

WORKDIR /srv/app/
RUN chown -R www-data:www-data /srv/app

CMD ["/usr/bin/caddy", "--conf", "/etc/Caddyfile", "--log", "stdout"]