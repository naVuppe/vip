<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { TableColumnCtx } from 'element-plus'
// import useUserList from './../login/userList.jsx'
// const useUserList = require('./../login/userList.jsx')
const router = useRouter();

// const userList = useUserList()
// console.log(userList);

// 根据用户拿到商品列表
const user: any = router.currentRoute.value.query.admin ? router.currentRoute.value.query.admin : router.currentRoute.value.query.vip

const dingdanList = ref(JSON.parse((localStorage.getItem(user)) as string) || [
    {
        id: 1,
        name: '商品1',
        price: 100,
        count: 1
    },
    {
        id: 2,
        name: '商品2',
        price: 100,
        count: 2
    },
    {
        id: 3,
        name: '商品3',
        price: 50,
        count: 4
    },
    {
        id: 4,
        name: '商品4',
        price: 50,
        count: 40
    }
])
// 判断是大会员还是子会员
const needUserList: any = ref(undefined)
const list: any = ref([])
if (router.currentRoute.value.query.admin) {
    console.log('子会员登录');
    needUserList.value = [router.currentRoute.value.query.admin]
} else {
    console.log('大会员登录');
    needUserList.value = JSON.parse(localStorage.getItem('needUserList') as string)
    needUserList.value.forEach((el: string) => {
        // 循环用户列表，每个用户列表在loccalStorage里面都有一个对应的商品列表，没有就是空
        const listone = JSON.parse(localStorage.getItem(el) as string)
        console.log(listone);
        list.value.push(listone)
        list.value[0] = dingdanList.value
    });
    console.log('list', list.value);
}
console.log(needUserList.value);

const ProductLists = ref([
    {
        id: 1,
        name: '商品1',
        price: 101,
        count: 1
    },
    {
        id: 2,
        name: '商品2',
        price: 102,
        count: 1
    },
    {
        id: 3,
        name: '商品3',
        price: 50,
        count: 1
    },
    {
        id: 4,
        name: '商品4',
        price: 501,
        count: 1
    }
])
// 用户列表
// const userList = ref(JSON.)
// 1.有一个商品列表，谁登录就是谁的列表，然后点击加入购物车就是把商品加到这个列表里面，再写删除的功能，修改数量的功能
// 2.计算商品的总价
// 3.判断是不是大会员登录，是的话就展示它和他下面的子会员的列表，不是的话就展示子会员它自己的列表

const add = (id: number) => {
    console.log('加入购物车了', id);
    // //判断dingdanList有没有，没有的话直接dingdanList.value[index].count++
    // if (dingdanList.value.length === 0) {
    //     dingdanList.value.push({
    //         id: id,
    //         name: ProductLists.value[id - 1].name,
    //         price: ProductLists.value[id - 1].price,
    //         count: 0
    //     })
    // }
    // 判断list[0]有没有，没有的话直接list[0]
    if (!list.value[0]) {
        console.log('kong');
        
        dingdanList.value.push({
            id: id,
            name: ProductLists.value[id - 1].name,
            price: ProductLists.value[id - 1].price,
            count: 0
        })
    }
    console.log(dingdanList.value);
    // 判断商品列表里面有没有这个商品，有的话就把数量加1，没有的话就把这个商品加到商品列表里面
    const index = dingdanList.value.findIndex((item: any) => item.id === id)
    console.log(index)
    if (index === -1) {
        console.log('加入商品');
        // 购物车没有这个商品，需要把商品加到购物车里面，购物车就是dingdanList
        dingdanList.value.push(ProductLists.value[id - 1])
        console.log(dingdanList.value);

    } else {
        dingdanList.value[index].count++
        console.log('已经有了');
    }
}

const del = (row: any, e: any) => {
    console.log('删除了', row, e);
    dingdanList.value.splice(e, 1)
}

const handleChange = (e: any) => {
    console.log('修改了', e);
}

// 用watch存数据到localStorage,存数据的名字就用登录的用户名，通过router获取
watch(dingdanList.value, (newVal) => {
    localStorage.setItem(user as string, JSON.stringify(newVal));
    console.log('存储了', newVal);
    console.log([JSON.parse(localStorage.getItem(user as string) as string)]);
    localStorage.setItem(needUserList.value, JSON.stringify(newVal))
})

const log = (e: any) => {
    console.log(e);
}
</script>

<template>
    <div class="box">
        <h3>用户：{{ router.currentRoute.value.query.vip }}</h3>
        <hr /><br />
        <el-card>
            <el-row>
                <el-col :span="6" v-for="(item, index) in ProductLists" :key="index">
                    <el-card>
                        <el-icon>
                            <Cherry />
                        </el-icon>
                        <div slot="header" class="clearfix">
                            <span>{{ item.name }}</span>
                        </div>
                        <el-button type="primary" size="mini" style="margin-top: 10px"
                            @click="add(item.id)">加入购物车</el-button>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
        <!-- 订单表格 -->
        <div v-if="needUserList.length > 1">
            <el-card v-for="(item, index) in list">
                <template #header>
                    <span style="font-weight: 900;font-size: 20px;">{{ needUserList[index] }}</span>
                </template>
                <el-table :data="item" style="width: 100%">
                    <el-table-column prop="name" label="商品" width="160" />
                    <el-table-column prop="count" label="数量" width="180">
                        <template #default="{ $index }">
                            <el-input-number :disabled="index" v-model="item[$index].count" :min="1" :max="100"
                                @change="handleChange" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="订单操作">
                        <template #default="{row, $index }">
                            <el-button :disabled="index" type="" @click="del(row, $index)">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="单价" width="80" />
                    <el-table-column label="小计">
                        <template #default="{ $index }">
                            <span>{{ item[$index].price * item[$index].count }}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <el-table>
                    <el-table-column label=""></el-table-column>
                </el-table> -->
                <div>
                    <span>总价：￥{{ list[index] ? item.reduce((total: any, item: any) => total + item.price *
                        item.count, 0) : 0 }}</span>
                </div>
            </el-card>
        </div>
        <div v-else>
            <el-card>
                <template #header>
                    <span style="font-weight: 900;font-size: 20px;">{{ needUserList[0] }}</span>
                </template>
                <el-table :data="dingdanList" style="width: 100%" v-if="dingdanList[0]">
                    <el-table-column prop="name" label="商品" width="160" />
                    <el-table-column prop="count" label="数量" width="180">
                        <template #default="{ $index }">
                            <el-input-number v-model="dingdanList[$index].count" :min="1" :max="100"
                                @change="handleChange" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="订单操作">
                        <template #default="{row, $index }">
                            <el-button type="" @click="del(row, $index)">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="单价" width="80" />
                    <el-table-column label="小计">
                        <template #default="{ $index }">
                            <span>{{ dingdanList[$index].price * dingdanList[$index].count }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box {
    padding: 14px;
}
</style>