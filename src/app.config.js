export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/home/home',
    'pages/my/my',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  entryPagePath: 'pages/index/index',
  tabBar: {
    color: '#000',
    selectedColor: '#85AFCB',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: 'index',
        iconPath: 'assets/tab_bar/home.png',
        selectedIconPath: 'assets/tab_bar/home_active.png'
      },
      {
        pagePath: 'pages/home/home',
        text: 'home',
        iconPath: 'assets/tab_bar/index.png',
        selectedIconPath: 'assets/tab_bar/index_active.png'
      },
      {
        pagePath: 'pages/my/my',
        text: 'my',
        iconPath: 'assets/tab_bar/my.png',
        selectedIconPath: 'assets/tab_bar/my_active.png'
      },
    ]
  },
  subPackages: [
    {
      root: 'packages',
      pages: [
        'hello/hello',
      ]
    }
  ]
})
