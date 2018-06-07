FROM beevelop/cordova

MAINTAINER      Dongasai "1514582970@qq.com"

# 安装常用工具
RUN apt update
RUN apt install -y vim dos2unix
WORKDIR /home/
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install -g yarn
# 安装依赖
COPY package.json /home/
WORKDIR /home/
RUN cnpm install
# 安装依赖完成
# 进行文件复制和环境变量初始化
COPY . /home/
WORKDIR /home/
ENV APP_FILE_URL=http://ykm_file_web.s237.psd1412.com
ENV APP_SCOKET_URL=ws://192.168.1.220:34504/
WORKDIR /home/
CMD npm run build
