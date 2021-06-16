const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  // 모드에 따라 웹팩에서 내장 최적화 제공
  mode: prod ? 'production' : 'development',

  // 소스 맵 생성 여부 및 방법 설정
  devtool: prod ? 'hidden-soure-map' : 'eval',

  target: 'node',
  externals: [nodeExternals()],

  // 번들링을 시작할 파일
  entry: {
    server: './src/index.ts',
    'static/js/todo': './src/static/ts/todo.ts',
  },

  resolve: {
    // ts, tsx 를 읽을 수 있는 확장자로 추가
    extensions: ['.ts', '.tsx', '.js'],

    // Alias 추가
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@controllers': path.resolve('src/controllers'),
      '@routes': path.resolve('src/routes'),
      '@utils': path.resolve('src/utils'),
      '@views': path.resolve('src/views'),
    },
  },

  // 다양한 모듈들(js, image, css 등)을 처리하는 방법 결정
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        // 처리할 모듈 형식 결정
        test: /.js$/,
        // 이 모듈에 사용할 loader
        use: 'babel-loader',
        // 제외할 파일들
        exclude: /node_modules/,
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          name: 'static/img/[hash]-[name].[ext]',
        },
      },
    ],
  },

  // 번들링 된 파일이 생성될 위치 설정
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  // 적용할 플러그인 목록
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/views/todo.html`,
      filename: './views/todo.html',
      excludeChunks: ['server'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: 'static/css/main.css' }),
    new NodemonPlugin({
      // 둘 이상의 항목을 지정할 경우 다시 시작할 출력 파일
      script: './dist/server.js',
      // nodemon으로 어떤 파일을 감시할지
      watch: path.resolve('./dist'),
      // 감시하고 있는 스크립트에 전달할 값
      args: [],
      // 노드 파라메터
      nodeArgs: [],
      // 무시할 파일 확장자
      ignore: ['*.js.map'],
      // 감시할 파일 확장자
      ext: 'js,css,json',
      // 수정된 뒤 반영되는 딜레이 시간 (밀리초 단위)
      delay: '1000',
      // 상세 로그 출력 여부
      verbose: true,
      // 재시작할 경우 스크립트에 전달될 env 내용
      env: {
        NODE_ENV: 'development',
      },
    }),
  ],
};
