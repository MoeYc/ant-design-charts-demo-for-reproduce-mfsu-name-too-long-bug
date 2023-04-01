import type { Request, Response } from 'express';
import Mock from 'mockjs';

const userInfo: API.User = Mock.mock({
  createdAt: '@datetime',
  updatedAt: '@datetime',
  id: 0,
  name: '模拟用户',
  tel: /^1[3456789]d{9}$/,
  role: 'useradmin',
});

/** 发送验证码 GET /mock/user/verifyCode */
export async function getCaptcha(req: Request, res: Response) {
  return res.json({
    code: 200,
  } as API.ResponseTokenAndUserInfoRes_);
}

/** 用户名密码登录接口 POST /mock/user/login */
export async function loginByPassword(req: Request, res: Response) {
  return res.json({
    code: 200,
    data: {
      token: 'token',
      userInfo,
    },
  } as API.ResponseTokenAndUserInfoRes_);
}

/* 手机号与验证码登录接口 */
export async function loginByCode(req: Request, res: Response) {
  return res.json({
    code: 200,
    data: {
      token: 'token',
      userInfo,
    },
  } as API.ResponseTokenAndUserInfoRes_);
}


export default {
  'GET /admin/user/verifyCode': getCaptcha,
  'POST /admin/user/login': loginByPassword,
  'POST /admin/user/loginByCode': loginByCode,
};
