let ConstantObj = {
  category: category(),
};

function category () {
  return [
    {
      type: '0',
      name: '热门'
    }, {
      type: '1',
      name: '推荐'
    }, {
      type: '2',
      name: '段子手'
    }, {
      type: '3',
      name: '养生堂'
    }, {
      type: '4',
      name: '私房话'
    }, {
      type: '5',
      name: '八卦精'
    }, {
      type: '6',
      name: '爱生活'
    }, {
      type: '7',
      name: '财经迷'
    }, {
      type: '8',
      name: '汽车迷'
    }, {
      type: '9',
      name: '科技咖'
    }, {
      type: '10',
      name: '潮人帮'
    }, {
      type: '11',
      name: '辣妈帮'
    }, {
      type: '12',
      name: '点赞党'
    }, {
      type: '13',
      name: '旅行家'
    }, {
      type: '14',
      name: '职场人'
    }, {
      type: '15',
      name: '美食家'
    }, {
      type: '16',
      name: '古今通'
    }, {
      type: '17',
      name: '学霸族'
    }, {
      type: '18',
      name: '星座控'
    }, {
      type: '19',
      name: '体育迷'
    }
  ]
}

function authName () {
  return {
    company: {
      title: '集团管理',
      icon: 'tachometer',
      routeName: 'company'
    }
  };
}

function mallNameMap () {
  // let mallNameMap = common.getMallNameMap()
  // return common.getMallList();
}
export default ConstantObj;