const userLoginBinderConfig= {
    url: '/user/login',
    method: 'post',
    data: {
        username:'',
        password:''
    },
    defaultBindingData: {
        // 配置接口返回数据的字段的初次默认值
        error:1001,
        msg:'接口请求失败'
    }
}

const userCheckBinderConfig= {
    url: '/user/check',
    method: 'get',
    defaultBindingData: {
        // 配置接口返回数据的字段的初次默认值
        error:1001,
        msg:'接口请求失败'
    }
}

const userLogoutBinderConfig= {
    url: '/user/logout',
    method: 'get',
    defaultBindingData: {
        // 配置接口返回数据的字段的初次默认值
        error:1001,
        msg:'接口请求失败'
    }
}

export {userLoginBinderConfig,userCheckBinderConfig,userLogoutBinderConfig}