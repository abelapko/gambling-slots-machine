FROM php:7.4-apache

RUN apt-get update && apt-get install -y \
    unzip \
    wget \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd mysqli pdo pdo_mysql

RUN pecl install xdebug-2.9.8 \
    && docker-php-ext-enable xdebug

COPY xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN mkdir /app && chown -R www-data:www-data /app \
    && chmod -R 755 /app

COPY apache.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 80

RUN a2enmod rewrite && a2enmod headers

WORKDIR /app

CMD ["apache2-foreground"]
