FROM node:22-alpine AS build
RUN npm install -g npm@11.4.2
# Thiết lập các biến build-time cho UID và GID, với giá trị mặc định là 1000
ARG UID=1000
ARG GID=1000

# Logic này sẽ kiểm tra cả group và user trước khi tạo để tránh xung đột
RUN if ! getent group ${GID} > /dev/null; then \
        addgroup -g ${GID} -S appgroup; \
    fi && \
    if ! getent passwd ${UID} > /dev/null; then \
        adduser -u ${UID} -S appuser -G $(getent group ${GID} | cut -d: -f1); \
    fi
WORKDIR /app
RUN chown ${UID}:${GID} /app

# Chuyển sang user bằng UID. Cách này cũng an toàn hơn là dùng tên.
USER ${UID}

# Step 4: Copy file package.json và chạy npm install
# Chỉ copy những file này để tận dụng cache. Nếu chúng không đổi, Docker sẽ không chạy lại npm install
COPY --link --chown=${UID}:${GID} package*.json ./
# Thêm dòng này để cài đặt riêng gói bị lỗi
# RUN npm install @oxc-parser/binding-linux-x64-musl
RUN npm install
# Dùng UID và GID (thay vì tên) để gán quyền sở hữu. 
# Đây là cách làm an toàn và chính xác nhất, không phụ thuộc vào tên user/group.
# Step 5: Copy toàn bộ source code còn lại
# .dockerignore sẽ đảm bảo node_modules và các file khác không bị copy vào
# --chown sẽ đảm bảo file được copy vào có quyền sở hữu đúng ngay lập tức
COPY --link --chown=${UID}:${GID} . .


EXPOSE 3000

CMD ["npm", "run", "dev"]