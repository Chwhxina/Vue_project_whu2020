import { baseAxios } from '@/utils/axios'

/**
 * 登陆
 */
export const login = (data) => {
	return baseAxios.post('/api/auth/login', data).then(result => {
		return result.data
	})
}

/**
 * 注册(新增)
 */
export const register = (data) => {
	return baseAxios.put('/api/auth/register', data).then(result => {
		return result.data
	})
}

/**
 * 获取水质信息列表(新增)
 */
export const getWaterMessageList = (data) => {
	return baseAxios.get('/api/sensor/messagelist', data).then(result => {
		return result.data
	})
}

/**
 * 添加政府实体(新增)
 */
export const createGovernment = (data) => {
	return baseAxios.put('/api/addgov', data).then(result => {
		return result.data
	})
}

/**
 * 添加工厂实体(新增)
 */
export const createFactory = (data) => {
	return baseAxios.put('/api/addgov', data).then(result => {
		return result.data
	})
}

/**
 * 添加传感器记录(新增)
 */
export const incCredit = (data) => {
	return baseAxios.put('/api/addgov', data).then(result => {
		return result.data
	})
}

/**
 * 查询传感器记录(新增)
 */
export const sensorQuery = (data) => {
	return baseAxios.put('/api/addgov', data).then(result => {
		return result.data
	})
}

/**
 * 查询积分(新)
 */
export const creditQuery = (data) => {
	return baseAxios.put('/api/addgov', data).then(result => {
		return result.data
	})
}

/*----------------------------------------*/

/**
 * 朔源物品统计
 */

export const getGoodsStatis = () => {
	return baseAxios.get('/api/goods/statis').then(result => {
		return result.data
	})
}

/**
 * 获取朔源物品信息
 */

export const getGoodsInfo = () => {
	return baseAxios.get('/api/goods/info').then(result => {
		return result.data
	})
}


/**
 * 获取属性列表
 */

export const getAttributeList = () => {
	return baseAxios.get('/api/goods/attributelist').then(result => {
		return result.data
	})
}


/**
 * 添加属性
 */

export const addGoodsAttribute = (data) => {
  return baseAxios.put('/api/goods/attribute/add', data).then(result => {
    return result.data
  })
}


/**
 * 获取交易环节列表
 */

export const getLogisticList = () => {
	return baseAxios.get('/api/goods/logistics').then(result => {
		return result.data
	})
}


/**
 * 添加交易环节
 */

export const addLogistic = (data) => {
  return baseAxios.put('/api/goods/logistic/add', data).then(result => {
    return result.data
  })
}


/**
 * 获取客户留言列表
 */

export const getGuestMessageList = () => {
	return baseAxios.get('/api/goods/messagelist').then(result => {
		return result.data
	})
}


/**
 * 添加留言
 */

export const addGuestMessage = (data) => {
  return baseAxios.put('/api/goods/message/add', data).then(result => {
    return result.data
  })
}




/**
 * 获取用户信息
 */

export const getAdminInfo = () => {
	return baseAxios.get('/admin/info').then(result => {
		return result.data
	})
}


/**
 * 查询积分
 */

export const queryCredit = (data) => {
	return baseAxios.get('/api/credit/query',data).then(result => {
		return result.data
	})
}


/**
 * issue credit
 */

export const issueCredit = (data) => {
  return baseAxios.post('/api/credit/issue', data).then(result => {
    return result.data
  })
}


/**
 * transfer credit
 */
export const transferCredit = (data) => {
  return baseAxios.post('/api/credit/transfer', data).then(result => {
    return result.data
  })
}
