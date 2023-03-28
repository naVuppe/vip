// 创建list的类型，里面是一个数组，数组里面是一个对象，对象里面有两个属性，一个是id，一个是name
export interface List {
    id: number;
    name: string;
    price: number;
    count: number
}