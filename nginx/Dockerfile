# FROM nginx
# COPY default.conf /etc/nginx/conf.d/default.conf

FROM nginx

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*


EXPOSE 80
# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY default.conf /etc/nginx/conf.d/default.conf

