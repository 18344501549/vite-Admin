import request from "@/utils/request";



type Common<T> = {
    code: string;
    mesg: string;
    data: T;
    time: string;
};

export type MenuItem = {
    createdBy: string;
    createdTime: string;
    description: string;
    href: string;
    icon: string;
    id: number;
    leval: number;
    name: string;
    operatorId: number | null;
    orderNum: number;
    parentId: number;
    shown: boolean;
    updatedBy: string;
    updatedTime: string;
};


// 获取菜单所有项
export const getAll = () => {
    return request<Common<MenuItem[]>>({
        method: 'GET',
        url: '/boss/menu/getAll',
    });
};


type CreateOrEditMenu = Pick<MenuItem, 'id' | 'parentId' | 'name' | 'href' | 'icon' | 'orderNum' | 'description' | 'shown'> & { id?: number }
// type CreateOrEditMenu = Omit<MenuItem, 'createdBy' | 'createdTime' | 'leval' | 'operatorId' | 'updatedBy' | 'updatedTime'>

// 获取菜单所有项
export const saveOrUpdate = (menuInfo: CreateOrEditMenu) => {
    return request({
        method: 'POST',
        url: '/boss/menu/saveOrUpdate',
        data: menuInfo
    });
};