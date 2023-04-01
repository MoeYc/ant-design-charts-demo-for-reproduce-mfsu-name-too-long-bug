import type { Request, Response } from 'express';

// import Mock from 'mockjs';

const menu: API.SystemPermissionTypeParam[] = [
  {
    id: 1,
    path: '/dashboard/analysis',
    component: 'Dashboard/Analysis',
    name: '首页',
    icon: 'dashboard',
  },
];

function getMenuUrls(menuTree: API.SystemPermissionTypeParam[]): string[] {
  return menuTree
    .reduce(
      (acc, item) => acc.concat([item.path, ...getMenuUrls(item.children || [])]),
      [] as (string | undefined)[],
    )
    .filter((t) => t) as string[];
}

function delayed(num = 200) {
  return new Promise<void>((r) =>
    setTimeout(() => {
      r();
    }, num),
  );
}

async function getUserPermissionByToken(req: Request, res: Response) {
  await delayed();
  if (req.headers.authorization !== 'Bearer token')
    return res.json({
      code: 401,
      msg: 'token error',
    });
  return res.json({
    code: 200,
    data: {
      menu,
      menuUrls: getMenuUrls(menu),
    },
    msg: 'ok',
  } as API.Response<{ menu: API.SystemPermissionTypeParam[]; menuUrls: string[] }>);
}

export default {
  'GET /admin/user/permission/getUserPermissionByToken': getUserPermissionByToken,
};
