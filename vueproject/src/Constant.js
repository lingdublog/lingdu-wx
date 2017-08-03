let ConstantObj = {
  authName: authName(),
  authMap: authMap(),
  mallNameMap: mallNameMap()
};

function authMap () {
  return {
    login: ['company', 'mall']
  }
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